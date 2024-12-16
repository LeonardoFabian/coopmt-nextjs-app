import { ENV } from "@/utils";
import { flattenAttributes } from "@/utils";
import qs from "qs";
import _, { merge } from "lodash";
// import logger from "../../logger";
import https from "https";

export class Page {
  async getAll() {
    const agent = new https.Agent({
      rejectUnauthorized: false, // ignorar errores de certificado
    });

    const populate = "populate=*";
    const params = `${populate}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PAGES}?${params}`;

    try {
      const response = await fetch(url, { agent });
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getBySlug(slug) {
    // const pageQuery = qs.stringify({
    //   filters: {
    //     slug: {
    //       $eq: `${slug}`,
    //     },
    //   },
    //   populate: {
    //     featuredImage: {
    //       fields: ["url", "alternativeText"],
    //     },
    //     blocks: {
    //       populate: {
    //         multimedia: {
    //           fields: ["url", "alternativeText"],
    //         },
    //         title: {
    //           populate: "*",
    //         },
    //         text: {
    //           populate: "*",
    //         },
    //         buttons: {
    //           populate: {
    //             link: {
    //               populate: {
    //                 icon: {
    //                   fields: ["name"],
    //                 },
    //               },
    //             },
    //           },
    //         },
    //         paragraph: {
    //           populate: "*",
    //         },
    //         image: {
    //           populate: {
    //             media: {
    //               fields: ["url", "alternativeText"],
    //             },
    //           },
    //         },
    //         button: {
    //           populate: {
    //             link: {
    //               populate: {
    //                 icon: {
    //                   fields: ["name"],
    //                 },
    //               },
    //             },
    //           },
    //         },
    //         list: {
    //           populate: {
    //             item: {
    //               populate: "*",
    //             },
    //           },
    //         },
    //         icon: {
    //           fields: ["name"],
    //         },
    //         link: {
    //           populate: {
    //             icon: {
    //               fields: ["name"],
    //             },
    //           },
    //         },
    //         backgroundImage: {
    //           populate: {
    //             image: {
    //               fields: ["url", "alternativeText"],
    //             },
    //           },
    //         },
    //         blocks: {
    //           populate: {
    //             title: {
    //               populate: "*",
    //             },
    //             paragraph: {
    //               populate: "*",
    //             },
    //             image: {
    //               populate: {
    //                 media: {
    //                   fields: ["url", "alternativeText"],
    //                 },
    //               },
    //             },
    //             button: {
    //               populate: {
    //                 link: {
    //                   populate: {
    //                     icon: {
    //                       fields: ["name"],
    //                     },
    //                   },
    //                 },
    //               },
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    //   pagination: {
    //     pageSize: 10,
    //     page: 1,
    //   },
    //   publicationState: "live",
    // });

    // const baseUrl = `${ENV.API_URL}/`;
    // const path = `${ENV.ENDPOINTS.PAGES}`;

    // const url = new URL(path, baseUrl);
    // url.search = pageQuery;

    // try {
    //   const response = await fetch(url.href, { cache: "no-store" });
    //   const result = await response.json();

    //   const flattenedData = flattenAttributes(result);

    //   if (response.status !== 200) throw flattenedData;

    //   return flattenedData.data[0];
    // } catch (error) {

    //   throw error;
    // }

    const agent = new https.Agent({
      rejectUnauthorized: false, // ignorar errores de certificado
    });

    const filters = `filters[slug][$eq]=${slug}`;
    const populateFeaturedImage = "populate[0]=featuredImage";
    const populateBlocks = "populate[1]=blocks";
    const populateContactInformation = "populate[2]=blocks.contactInformation";
    const populateHero = "populate[3]=blocks.hero";
    const populateCTA = "populate[4]=blocks.cta";
    const populateGroup = "populate[5]=blocks.group";
    const populateContainer = "populate[6]=blocks.container";
    const populateBoardSection =
      "populate[7]=blocks.board-section&populate[8]=blocks.board_groups&populate[9]=blocks.board_groups.board_positions&populate[10]=blocks.board_groups.board_positions.user&populate[11]=blocks.board_groups.board_positions.user.profile_photo";

    // const populateFaqs = "populate[7]=blocks.faqs";

    const populate = `${populateFeaturedImage}&${populateBlocks}&${populateContactInformation}&${populateHero}&${populateCTA}&${populateGroup}&${populateContainer}&${populateBoardSection}`;

    // const populate = "populate=*";

    const params = `${filters}&${populate}`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PAGES}?${params}`;

    try {
      const response = await fetch(url, { agent });
      const result = await response.json();

      // console.log("result: ", result);

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
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
