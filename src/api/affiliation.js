import { ENV } from "@/utils";

export class Affiliation {
  async create(data) {
    console.log("Affiliation create: ", data);
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AFFILIATION}`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          ...data,
        },
      }),
    };

    try {
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
