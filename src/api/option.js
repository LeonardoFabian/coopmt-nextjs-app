import { ENV } from "@/utils";

/*
  For Interactive Query builder:

  {
  populate: {
    logo: {
      fields: ['url', 'alternativeText']
    },
    logoDark: {
      fields: ['url', 'alternativeText']
    },
    favicon: {
      fields: ['url', 'alternativeText']
    },
    socialLinks: {
      populate: '*'
    },
    FAQ: {
      populate: {
        question: {
          populate: '*'
        },
        answer: {
          populate: '*'
        }
      }
    }
  },
}
*/

export class Option {
  async getAll() {
    const populate = `populate[logo][fields][0]=url&populate[logo][fields][1]=alternativeText&populate[logoDark][fields][0]=url&populate[logoDark][fields][1]=alternativeText&populate[favicon][fields][0]=url&populate[favicon][fields][1]=alternativeText&populate[socialLinks][populate]=*&populate[FAQ][populate][question][populate]=*&populate[FAQ][populate][answer][populate]=*`;
    const params = `${populate}`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.OPTIONS}?${params}`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log("OPTIONS: ", result);

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
