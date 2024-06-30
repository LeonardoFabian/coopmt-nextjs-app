import { ENV } from "@/utils";
// import logger from "../../clientLogger";

export class Affiliation {
  async create(data) {
    // logger.info("Handling /api/affiliation create request");

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

      // logger.info("Affiliation create successfully");
      return result;
    } catch (error) {
      // logger.error(`Error ocurred: ${error.message}`);
      throw error;
    }
  }
}
