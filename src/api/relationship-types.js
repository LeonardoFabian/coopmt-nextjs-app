import { ENV, authFetch } from "@/utils";

export class RelationshipTypes {
  /**
   * Retrieves a list of relationship types from the API.
   *
   * @return {object} The JSON response containing the list of relationship types.
   * @throws Will throw an error if the network request fails or the response status is not 200.
   */
  async getAll() {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.RELATIONSHIP_TYPES}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
