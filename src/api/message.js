import { ENV, authFetch } from "@/utils";

export class Message {
  /**
   * Retrieves a list of messages from the API.
   *
   * @return {object} The JSON response containing the list of messages.
   * @throws Will throw an error if the network request fails or the response status is not 200.
   */
  async fetchMessages() {
    try {
      const populate = "populate=*";
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.MESSAGES.FIND}?${populate}`;
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves a list of message types from the API.
   *
   * @return {object} The JSON response containing the list of message types.
   * @throws Will throw an error if the network request fails or the response status is not 200.
   */
  async fetchMessageTypes() {
    try {
      const populate = "populate=*";
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.MESSAGES.TYPES}?${populate}`;
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
