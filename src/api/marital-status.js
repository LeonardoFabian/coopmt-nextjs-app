import { ENV } from "@/utils";

export class MaritalStatus {
  /**
   * Retrieves the list of marital statuses from the API.
   *
   * @returns {object[]} The list of marital statuses.
   */
  async find() {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS.MARITAL_STATUSES}`;

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
