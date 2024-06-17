import { ENV } from "@/utils";
import { flattenAttributes } from "@/utils";
import qs from "qs";

export class Ad {
  async getBySupplier(supplierId) {
    const filters = `filters[supplier][id][$eq]=${supplierId}`;
    const params = `${filters}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADS}?${params}`;

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
