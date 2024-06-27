import { ENV } from "@/utils";
import qs from "qs";
import { flattenAttributes } from "@/utils";

const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      populate: {
        image: {
          fields: ["url", "alternativeText"],
        },
        link: {
          populate: true,
        },
        slides: {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            blocks: {
              populate: {
                icon: {
                  fields: ["url", "alternativeText"],
                },
                page: {
                  populate: {
                    featuredImage: {
                      fields: ["url", "alternativeText"],
                    },
                  },
                },
              },
            },
          },
        },
        feature: {
          populate: true,
        },
        banners: {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
          },
        },
        suppliers: {
          populate: {
            logo: {
              fields: ["url", "alternativeText"],
            },
          },
        },
        ad: {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            supplier: {
              populate: true,
            },
          },
        },
        title: {
          fields: ["tagName", "align", "text"],
        },
        text: {
          fields: ["align", "transform", "fontStyle", "text"],
        },
        buttons: {
          populate: {
            link: {
              populate: true,
            },
          },
        },
      },
    },
  },
});

export class HomePageAPI {
  async find() {
    const baseUrl = `${ENV.API_URL}/`;
    const path = `${ENV.ENDPOINTS.HOMEPAGE}`;
    // console.log("baseUrl: ", baseUrl);
    // console.log("path: ", path);

    const url = new URL(path, baseUrl);
    url.search = homePageQuery;

    console.log(url.href);

    try {
      const response = await fetch(url.href, { cache: "no-store" });
      const result = await response.json();

      const flattenedData = flattenAttributes(result);

      // console.dir(result, { depth: null });
      // console.dir(flattenedData, { depth: null });
      // console.log(result);

      if (response.status !== 200) throw flattenedData;

      return flattenedData;
    } catch (error) {
      throw error;
    }
  }
}
