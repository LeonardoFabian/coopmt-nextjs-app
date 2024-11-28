import { ENV, authFetch } from "@/utils";

export class BankAccount {
  /**
   * Retrieves a list of bank accounts associated with a user from the API.
   *
   * @param {string} userId - The ID of the user to retrieve bank accounts for.
   * @return {object} The JSON response containing the list of bank accounts.
   * @throws Will throw an error if the network request fails or the response status is not 200.
   */
  async getAll(userId) {
    const populate = `populate=*`;
    const filters = `filters[user][id][$eq]=${userId}`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS.BANK_ACCOUNTS}?${filters}&${populate}`;
    try {
      const response = await authFetch(url);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates a new bank account entry in the database.
   *
   * @param {string} userId - The ID of the user associated with the bank account.
   * @param {object} data - The bank account data to be created.
   * @returns {object} The response containing the newly created bank account data.
   * @throws Will throw an error if the network request fails or the response status is not 200.
   */
  async create(userId, data) {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS.BANK_ACCOUNTS}`;
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
   * Updates an existing bank account entry in the database.
   *
   * @param {string} bankAccountId - The ID of the bank account to update.
   * @param {string} userId - The ID of the user associated with the bank account.
   * @param {object} data - The bank account data to be updated.
   * @returns {object} The response containing the updated bank account data.
   * @throws Will throw an error if the network request fails or the response status is not 200.
   */
  async update(bankAccountId, userId, data) {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS.BANK_ACCOUNTS}/${bankAccountId}`;
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
   * Deletes an existing bank account entry from the database.
   *
   * @param {string} bankAccountId - The ID of the bank account to delete.
   * @returns {object} The response containing the deleted bank account data.
   * @throws Will throw an error if the network request fails or the response status is not 200.
   */
  async delete(bankAccountId) {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS.BANK_ACCOUNTS}/${bankAccountId}`;
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
