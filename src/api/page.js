import { ENV } from "@/utils";
import { flattenAttributes } from "@/utils";
import qs from "qs";
import _, { merge } from "lodash";
// import logger from "../../logger";

export class Page {
  async getAll() {
    const populate = "populate=*";
    const params = `${populate}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PAGES}?${params}`;

    try {
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getBySlug(slug) {
    const pageQuery = qs.stringify({
      filters: {
        slug: {
          $eq: `${slug}`,
        },
      },
      populate: {
        featuredImage: {
          fields: ["url", "alternativeText"],
        },
        blocks: {
          populate: {
            multimedia: {
              fields: ["url", "alternativeText"],
            },
            title: {
              populate: "*",
            },
            text: {
              populate: "*",
            },
            buttons: {
              populate: {
                link: {
                  populate: {
                    icon: {
                      fields: ["name"],
                    },
                  },
                },
              },
            },
            paragraph: {
              populate: "*",
            },
            image: {
              populate: {
                media: {
                  fields: ["url", "alternativeText"],
                },
              },
            },
            button: {
              populate: {
                link: {
                  populate: {
                    icon: {
                      fields: ["name"],
                    },
                  },
                },
              },
            },
            list: {
              populate: {
                item: {
                  populate: "*",
                },
              },
            },
            icon: {
              fields: ["name"],
            },
            link: {
              populate: {
                icon: {
                  fields: ["name"],
                },
              },
            },
            backgroundImage: {
              populate: {
                image: {
                  fields: ["url", "alternativeText"],
                },
              },
            },
            blocks: {
              populate: {
                title: {
                  populate: "*",
                },
                paragraph: {
                  populate: "*",
                },
                image: {
                  populate: {
                    media: {
                      fields: ["url", "alternativeText"],
                    },
                  },
                },
                button: {
                  populate: {
                    link: {
                      populate: {
                        icon: {
                          fields: ["name"],
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      pagination: {
        pageSize: 10,
        page: 1,
      },
      publicationState: "live",
    });

    const baseUrl = `${ENV.API_URL}/`;
    const path = `${ENV.ENDPOINTS.PAGES}`;

    const url = new URL(path, baseUrl);
    url.search = pageQuery;

    console.log(url.href);

    try {
      const response = await fetch(url.href, { cache: "no-store" });
      const result = await response.json();

      console.log("Page getBySlug result: ", result);

      const flattenedData = flattenAttributes(result);

      if (response.status !== 200) throw flattenedData;

      // logger.info("Page loaded successfully");

      console.log(flattenedData);

      return flattenedData.data[0]; // flattenData.data[0];
    } catch (error) {
      // logger.error(`Error ocurred: ${error.message}`);
      throw error;
    }
  }

  async search(text, page) {
    const filters = `filters[title][$contains]=${text}`;
    const pagination = `pagination[page]=${page}&pagination[pageSize]=6`;
    const populate = "populate=*";
    const params = `${filters}&${pagination}&${populate}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PAGES}?${params}`;

    try {
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
