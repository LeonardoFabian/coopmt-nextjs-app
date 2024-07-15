import { ENV } from "@/utils";

export class Option {
  async getAll() {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.OPTIONS}`;

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
