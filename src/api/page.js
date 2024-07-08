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
    // const filters = `filters[slug][$eq]=${slug}`;
    // const populate = "populate=*";
    // const params = `${filters}`;

    const pageQuery = qs.stringify({
      filters: {
        slug: `${slug}`,
      },
      populate: {
        blocks: {
          on: {
            "layout.container": {
              fields: [
                "display",
                "theme",
                "alignItems",
                "flexDirection",
                "justifyContent",
                "gap",
                "isContainer",
              ],
              populate: {
                backgroundImage: {
                  populate: {
                    image: {
                      fields: ["url", "alternativeText"],
                    },
                  },
                },
                blocks: {
                  fields: [
                    "display",
                    "theme",
                    "alignItems",
                    "flexDirection",
                    "justifyContent",
                    "gap",
                    "isContainer",
                  ],
                  populate: {
                    title: {
                      fields: ["tagName", "text", "align"],
                    },
                    paragraph: {
                      fields: ["text", "align", "transform", "fontStyle"],
                    },
                    image: {
                      fields: ["link", "caption", "description"],
                      component: "_shared.image",
                      populate: {
                        media: {
                          fields: ["url", "alternativeText"],
                        },
                      },
                    },
                    button: {
                      fields: ["theme"],
                      populate: {
                        link: {
                          fields: [
                            "url",
                            "label",
                            "target",
                            "description",
                            "isExternal",
                          ],
                          populate: {
                            icon: {
                              fields: ["url", "alternativeText"],
                            },
                          },
                        },
                      },
                    },
                    list: {
                      fields: ["listStyle"],
                      populate: {
                        item: {
                          fields: ["text", "align", "transform", "fontStyle"],
                        },
                      },
                    },
                    icon: {
                      fields: ["name"],
                    },
                    link: {
                      fields: [
                        "url",
                        "label",
                        "target",
                        "description",
                        "isExternal",
                      ],
                      populate: {
                        icon: {
                          fields: ["url", "alternativeText"],
                        },
                      },
                    },
                  },
                },
              },
            },
            "blocks.faqs": {
              fields: ["theme"],
              populate: {
                title: {
                  fields: ["tagName", "text", "align"],
                },
                faqs: {
                  populate: {
                    question: {
                      fields: ["tagName", "text", "align"],
                    },
                    answers: {
                      fields: ["text", "align", "transform", "fontStyle"],
                    },
                  },
                },
              },
            },
          },
        },
      },
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

      return flattenedData.results[0]; // flattenData.data[0];
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
