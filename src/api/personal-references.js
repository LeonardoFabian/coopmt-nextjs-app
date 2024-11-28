import { ENV, authFetch } from "@/utils";

export class PersonalReferences {
  /**
   * Retrieves a list of personal references associated with a user from the API.
   *
   * @param {string} userId - The ID of the user to retrieve personal references for.
   * @return {object} The JSON response containing the list of personal references.
   */
  async getAll(userId) {
    try {
      const populate = "populate=*";
      const filters = `filters[user][id][$eq]=${userId}`;
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS.PERSONAL_REFERENCES}?${filters}&${populate}`;

      const response = await authFetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Updates a personal reference entry in the database.
   *
   * @param {string} personalReferenceId - The ID of the personal reference to update.
   * @param {string} userId - The ID of the user associated with the personal reference.
   * @param {object} data - The personal reference data to be updated.
   * @returns {object} The response containing the updated personal reference data.
   */
  async update(personalReferenceId, userId, data) {
    console.log(data);
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS.PERSONAL_REFERENCES}/${personalReferenceId}`;
      const params = {
        method: "PUT",
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

  /**
   * Creates a new personal reference entry in the database.
   *
   * @param {string} userId - The ID of the user associated with the personal reference.
   * @param {object} data - The personal reference data to be created.
   * @returns {object} The response containing the newly created personal reference data.
   */
  async create(userId, data) {
    console.log(data);
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS.PERSONAL_REFERENCES}`;
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

  /**
   * Deletes a personal reference entry from the database.
   *
   * @param {string} personalReferenceId - The ID of the personal reference to delete.
   * @returns {object} The response containing the deleted personal reference data.
   */
  async delete(personalReferenceId) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS.PERSONAL_REFERENCES}/${personalReferenceId}`;
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
}
