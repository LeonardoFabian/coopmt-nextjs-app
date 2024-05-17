import { ENV } from "@/utils";

export class Service {
  /**
   * get all services
   * @returns
   */
  async find() {
    try {
      const populate = `populate=*`;
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.SERVICES}?${populate}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getBySlug(slug) {
    const filters = `filters[slug][$eq]=${slug}`;
    const populateService = "populate[0]=featuredImage&populate[1]=category";
    const populateCategory = "populate[2]=category.featuredImage";
    const populateTarget = "populate[3]=targets";
    const populates = `${populateService}&${populateCategory}&${populateTarget}`;
    const params = `${filters}&${populates}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.SERVICES}?${params}`;

    try {
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data[0];
    } catch (error) {
      throw error;
    }
  }

  async getByCategory(slug, page) {
    const filters = `filters[category][slug][$eq]=${slug}`;
    const pagination = `pagination[page]=${page}&pagination[pageSize]=6`;
    const populate = "populate=*";
    const params = `${filters}&${pagination}&${populate}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.SERVICES}?${params}`;

    try {
      const response = await fetch(url);
      const result = await response.json();

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

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.SERVICES}?${params}`;

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
