import { ENV } from "@/utils";

export class Footer {
  async find() {
    const populate = `populate[footerMenus][populate][menuItems][populate][icon][fields][0]=name&populate[blocks][populate]=*`;
    const params = `${populate}`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.FOOTER}?${params}`;

    try {
      const response = await fetch(url);
      const result = await response.json();

      console.log(result);

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
