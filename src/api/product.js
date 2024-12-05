import { ENV, authFetch } from "@/utils";
import qs from "qs";

export class Product {
  /**
   * Retrieves a list of user quotation requests from the API.
   *
   * @param {string} userId - The ID of the user to retrieve quotation requests for.
   * @return {object} The JSON response containing the list of user quotation requests.
   * @throws Will throw an error if the network request fails or the response status is not 200.
   */
  async getUserQuotationRequests(userId) {
    try {
      const populate = "populate=*";
      const filters = `filters[user][id][$eq]=${userId}`;
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.QUOTATION_REQUEST}?${filters}&${populate}`;

      const response = await authFetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    const populate = "populate=*";
    const params = `${populate}`;

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

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  async getRandom(limit) {
    const products = this.getAll();
    const firstID = this.getRandomInt(products.length);
    const secondID = this.getRandomInt(limit);
    const random = qs.stringify({ id_in: [firstID, secondID] });
    const pagination = `pagination[limit]=${limit}`;
    const populate = "populate=*";
    const sort = "sort=id:desc";
    const params = `${random}&${pagination}&${populate}&${sort}`;

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

  async find(limit) {
    const pagination = `pagination[limit]=${limit}`;
    const populate = "populate=*";
    const params = `${pagination}&${populate}`;

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
