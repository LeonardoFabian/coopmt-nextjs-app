import { ENV, authFetch } from "@/utils";

export class User {
  async getByDocumentId(documentId) {
    const filters = `filters[documentId][$eq]=${documentId}`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS.UPDATE}?${filters}`;

    try {
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves the currently authenticated user's information.
   *
   * @return {object} The user's data.
   */
  async getMe() {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS.ME}`;

      const response = await authFetch(url); // authFetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Updates the authenticated user's information.
   *
   * @param {string} userId - The ID of the user to update.
   * @param {object} data - The updated user data.
   * @return {object} The updated user's data.
   */
  async updateMe(userId, data) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS.UPDATE}/${userId}`;
      const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const response = await authFetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
