import { ENV } from "@/utils";
import { flattenAttributes } from "@/utils";
import qs from "qs";

export class Supplier {
  async find() {
    try {
      const sort = "sort=name:asc";
      const populate =
        "populate[0]=logo&populate[1]=featuredImage&populate[2]=information&populate[3]=socialNetworks";
      const populateInformation =
        "populate[4]=information.location&populate[5]=information.opening_hours";
      const populateLocation =
        "populate[6]=information.location.contactAddress&populate[7]=information.location.contactPhones&populate[8]=information.location.contactEmail&populate[9]=information.location.website";

      const params = `${sort}&${populate}&${populateInformation}&${populateLocation}`;

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.SUPPLIERS}?${params}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getBySlug(slug) {
    const supplierBySlugQuery = qs.stringify({
      filters: {
        slug: `${slug}`,
      },
      populate: {
        logo: {
          fields: ["url", "alternativeText"],
        },
        featuredImage: {
          fields: ["url", "alternativeText"],
        },
        information: {
          fields: ["description"],
          populate: {
            location: {
              populate: {
                contactAddress: {
                  fields: [
                    "title",
                    "address",
                    "city",
                    "state",
                    "postalCode",
                    "icon",
                  ],
                },
                contactPhones: {
                  fields: ["number", "icon"],
                },
                contactEmail: {
                  fields: ["email", "title", "icon"],
                },
                website: {
                  fields: ["url"],
                },
              },
            },
            opening_hours: {
              fields: ["day_interval", "opening_hour", "closing_hour"],
            },
          },
        },
        socialNetworks: {
          fields: ["url", "icon"],
        },
        blocks: {
          on: {
            "components.banner": {
              fields: ["url", "target", "title", "text", "display"],
              populate: {
                ad: {
                  fields: [
                    "title",
                    "type",
                    "status",
                    "clicks",
                    "planned_start_time",
                    "planned_end_time",
                    "start_time",
                    "end_time",
                  ],
                  populate: {
                    image: {
                      fields: ["url", "alternativeText"],
                    },
                  },
                },
              },
            },
            "supplier.hero": {
              populate: {
                banner: {
                  fields: ["url", "target", "title", "text", "display"],
                  populate: {
                    ad: {
                      fields: [
                        "title",
                        "type",
                        "status",
                        "clicks",
                        "planned_start_time",
                        "planned_end_time",
                        "start_time",
                        "end_time",
                      ],
                      populate: {
                        image: {
                          fields: ["url", "alternativeText"],
                        },
                      },
                    },
                  }
                }
              }
            }
          },
        },
      },
    });

    const baseUrl = `${ENV.API_URL}/`;
    const path = `${ENV.ENDPOINTS.SUPPLIERS}`;

    const url = new URL(path, baseUrl);
    url.search = supplierBySlugQuery;

    try {
      const response = await fetch(url.href, { cache: "no-store" });
      const result = await response.json();

      const flattenedData = flattenAttributes(result);

      if (response.status !== 200) throw flattenedData;

      return flattenedData.data[0];
    } catch (error) {
      throw error;
    }
  }
}
