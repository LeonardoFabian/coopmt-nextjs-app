import { ENV, authFetch } from "@/utils";

export class Notification {
  /**
   * Retrieves a list of public notifications from the API.
   *
   * @return {object} The JSON response containing the list of public notifications.
   */
  async getPublicNotifications() {
    const filter = `filters[isPublic][$eq]=true`;
    const params = `${filter}`;
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.NOTIFICATIONS.PUBLIC_NOTIFICATIONS}?${params}`;
      const response = await fetch(url);
      const result = await response.json();

      console.log("result: ", result);

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves a list of user notifications from the API.
   *
   * @param {string} userId - The ID of the user to retrieve notifications for.
   * @return {object} The JSON response containing the list of user notifications.
   */
  async getUserNotifications(userId) {
    const filters = `filters[user][id][$eq]=${userId}`;
    const params = `${filters}`;

    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.NOTIFICATIONS.USER_NOTIFICATIONS}?${params}`;

      const response = await authFetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
