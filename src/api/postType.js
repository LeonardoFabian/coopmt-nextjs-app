import { ENV } from "@/utils";

export class PostType {
  async find() {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.POST_TYPES}`;

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
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.POST_TYPES}?${filters}`;

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
