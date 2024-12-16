import { ENV } from "@/utils";
import { flattenAttributes } from "@/utils";
import qs from "qs";

// {
//   sort: ['title:asc'],
//   filters: {
//     title: {
//       $eq: 'hello',
//     },
//   },
//   populate: {
//     author: {
//       fields: ['firstName', 'lastName']
//     }
//   },
//   fields: ['title'],
//   pagination: {
//     pageSize: 10,
//     page: 1,
//   },
//   publicationState: 'live',
//   locale: ['en'],
// }

const mainMenuQuery = qs.stringify({
  populate: {
    menuItems: {
      populate: {
        page: {
          populate: {
            featuredImage: {
              fields: ["url", "alternativeText"],
            },
          },
        },
        post_type: {
          populate: true,
        },
        icon: {
          fields: ["name"],
        },
        sections: {
          populate: {
            links: {
              populate: {
                icon: {
                  fields: ["name"],
                },
              },
            },
            components: {
              populate: {
                page: {
                  populate: {
                    featuredImage: {
                      fields: ["url", "alternativeText"],
                    },
                  },
                },
                icon: {
                  fields: ["name"],
                },
                pages: {
                  populate: {
                    featuredImage: {
                      fields: ["url", "alternativeText"],
                    },
                  },
                },
                post_type: {
                  populate: true,
                },
                service: {
                  populate: {
                    featuredImage: {
                      fields: ["url", "alternativeText"],
                    },
                    category: {
                      populate: {
                        featuredImage: {
                          fields: ["url", "alternativeText"],
                        },
                      },
                    },
                    targets: {
                      fields: ["name", "description", "slug"],
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
});

export class MainMenu {
  async find() {
    const baseUrl = `${ENV.API_URL}/`;
    const path = `${ENV.ENDPOINTS.MENU.MAIN}`;

    const url = new URL(path, baseUrl);
    url.search = mainMenuQuery;
    // console.log(url.href);

    try {
      const response = await fetch(url.href, { cache: "no-store" });
      const result = await response.json();
      // console.log("MainMenu find result: ", result);

      const flattenedData = flattenAttributes(result);

      if (response.status !== 200) throw flattenedData;

      return flattenedData;
    } catch (error) {
      throw error;
    }
  }
}
