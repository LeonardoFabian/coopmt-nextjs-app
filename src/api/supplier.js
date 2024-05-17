import { ENV } from "@/utils";

export class Supplier {
  async find() {
    try {
      const sort = "sort=order:asc";
      const populate = "populate=logo";
      const params = `${sort}&${populate}`;

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.SUPPLIERS}?${params}`;

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
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.SUPPLIERS}?${filters}`;

    try {
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data[0];
    } catch (error) {
      throw error;
    }
  }
}
