import { ENV } from "@/utils";

export class Membership {
  async create(data) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.MEMBERSHIP}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
