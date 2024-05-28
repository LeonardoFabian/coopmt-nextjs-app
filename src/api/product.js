import { ENV, authFetch } from "@/utils";

export class Product {
  async getBySupplier(slug, page) {
    const filters = `filters[supplier][slug][$eq]=${slug}`;
    const pagination = `pagination[page]=${page}&pagination[pageSize]=30`;
    const populate = "populate=*";
    const params = `${filters}&${pagination}&${populate}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PRODUCTS}?${params}`;

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
    const filters = `filters[slug][$eq]=${slug}`;
    const populateProduct =
      "populate[0]=image&populate[1]=gallery&populate[2]=supplier";
    const populateSupplier = "populate[3]=supplier.logo";
    const populates = `${populateProduct}&${populateSupplier}`;
    const params = `${filters}&${populates}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PRODUCTS}?${params}`;

    try {
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data[0];
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    const populate = `populate[0]=image&populate[1]=supplier`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PRODUCTS}/${id}?${populate}`;
    try {
      const response = await fetch(url);
      const result = response.json();

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

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PRODUCTS}?${params}`;

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
