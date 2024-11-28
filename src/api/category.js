import { ENV } from "@/utils";
import https from "https";

export class Category {
  async find() {
    const agent = new https.Agent({
      rejectUnauthorized: false, // ignorar errores de certificado
    });

    try {
      const sort = "sort=order:asc";
      const populate = "populate=featuredImage";
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CATEGORIES.FIND}?${populate}&${sort}`;

      const response = await fetch(url, { agent });
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getBySlug(slug) {
    const agent = new https.Agent({
      rejectUnauthorized: false, // ignorar errores de certificado
    });

    const filters = `filters[slug][$eq]=${slug}`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CATEGORIES.FIND}?${filters}`;

    try {
      const response = await fetch(url, { agent });
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
