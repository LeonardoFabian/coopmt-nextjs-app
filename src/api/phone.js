import { ENV, authFetch } from "@/utils";

export class Phone {
  /**
   * Deletes a phone entry from the database.
   *
   * @param {string} phoneId - The ID of the phone to delete.
   * @returns {object} The response containing the deleted phone data.
   */
  async delete(phoneId) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PHONES}/${phoneId}`;
      const params = {
        method: "DELETE",
      };
      const response = await authFetch(url, params);
      const result = await response.json();
      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Updates a phone entry in the database.
   *
   * @param {string} phoneId - The ID of the phone to update.
   * @param {object} data - The phone data to be updated.
   * @returns {object} The response containing the newly created phone data.
   */
  async update(phoneId, data) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PHONES}/${phoneId}`;
      const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data,
        }),
      };
      const response = await authFetch(url, params);
      const result = await response.json();
      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create a new phone entry in the database.
   *
   * @param {string} userId - The ID of the user associated with the phone.
   * @param {object} data - The phone data to be created.
   * @returns {object} The response containing the newly created phone data.
   */
  async create(userId, data) {
    try {
      if (!userId || !data) {
        throw new Error("Missing parameters: userId or data");
      }

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PHONES}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            ...data,
            user: userId,
          },
        }),
      };

      const response = await authFetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async createFromRegistration(data) {
    try {
      if (!data) {
        throw new Error("Missing parameters: data");
      }

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PHONES}`;
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

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves a list of all phones associated with a user from the API.
   *
   * @param {string} userId - The ID of the user to retrieve phones for.
   * @return {object} The JSON response containing the list of phones.
   */
  async getAll(userId) {
    try {
      const populate = `populate=*`;
      const filters = `filters[user][id][$eq]=${userId}`;

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PHONES}?${filters}&${populate}`;

      const response = await authFetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
