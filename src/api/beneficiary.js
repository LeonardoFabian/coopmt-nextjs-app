import { ENV, authFetch } from "@/utils";

export class Beneficiary {
  /**
   * Retrieves a list of beneficiaries associated with a user from the API.
   *
   * @param {string} userId - The ID of the user to retrieve beneficiaries for.
   * @return {object} The JSON response containing the list of beneficiaries.
   * @throws Will throw an error if the network request fails or the response status is not 200.
   */
  async getAll(userId) {
    const populate = `populate=*`;
    const filters = `filters[user][id][$eq]=${userId}`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS.BENEFICIARIES}?${filters}&${populate}`;
    try {
      const response = await authFetch(url);
      const result = await response.json();
      // console.log(result);
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates a new beneficiary entry in the database.
   *
   * @param {string} userId - The ID of the user associated with the beneficiary.
   * @param {object} data - The beneficiary data to be created.
   * @returns {object} The response containing the newly created beneficiary data.
   * @throws Will throw an error if the network request fails or the response status is not 200.
   */
  async create(userId, data) {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS.BENEFICIARIES}`;
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
    try {
      const response = await authFetch(url, params);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Updates an existing beneficiary entry in the database.
   *
   * @param {string} beneficiaryId - The ID of the beneficiary to update.
   * @param {object} data - The beneficiary data to be updated.
   * @returns {object} The response containing the updated beneficiary data.
   * @throws Will throw an error if the network request fails or the response status is not 200.
   */
  async update(beneficiaryId, userId, data) {
    // console.log(data);
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS.BENEFICIARIES}/${beneficiaryId}`;
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
    try {
      const response = await authFetch(url, params);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Deletes an existing beneficiary entry from the database.
   *
   * @param {string} beneficiaryId - The ID of the beneficiary to delete.
   * @returns {object} The response containing the deleted beneficiary data.
   * @throws Will throw an error if the network request fails or the response status is not 200.
   */
  async delete(beneficiaryId) {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS.BENEFICIARIES}/${beneficiaryId}`;
    const params = {
      method: "DELETE",
    };
    try {
      const response = await authFetch(url, params);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }
}
