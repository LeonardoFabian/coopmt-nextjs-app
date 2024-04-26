import { ENV } from "@/utils";
import { flattenAttributes } from "@/utils";
import qs from "qs";

const globalQuery = qs.stringify({
  populate: {
    header: {
      populate: {
        logo: {
          fields: ["url", "alternativeText"],
        },
        siteTitle: {
          populate: {
            icon: {
              fields: ["url", "alternativeText"],
            },
          },
        },
        ctaButtons: {
          populate: true,
        },
        buttons: {
          populate: true,
        },
      },
    },
    footer: {
      populate: {
        logo: {
          fields: ["url", "alternativeText"],
        },
        siteTitle: {
          populate: {
            icon: {
              fields: ["url", "alternativeText"],
            },
          },
        },
      },
    },
  },
});

export class Global {
  async find() {
    const baseUrl = `${ENV.API_URL}/`;
    const path = `${ENV.ENDPOINTS.GLOBAL}`;

    const url = new URL(path, baseUrl);
    url.search = globalQuery;
    console.log(url.href);

    try {
      const response = await fetch(url.href, { cache: "no-store" });
      const result = await response.json();

      const flattenedData = flattenAttributes(result);

      if (response.status !== 200) throw flattenedData;

      return flattenedData;
    } catch (error) {
      throw error;
    }
  }
}
