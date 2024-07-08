import { ENV } from "@/utils";
// import logger from "../../clientLogger";

export class Affiliation {
  async submit(data) {
    try {
      console.log("Affiliation create: ", data);
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AFFILIATION.SUBMIT_FORM}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData: data,
        }),
      };
      const response = await fetch(url, params);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async findByDocumentId(documentId) {
    console.log("findByDocumentId: ", documentId);
    const filters = `filters[documentId][$eq]=${documentId}`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AFFILIATION.REQUEST}?${filters}`;

    try {
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      console.error("Error checking document ID: ", error);
      return false;
    }
  }
}
