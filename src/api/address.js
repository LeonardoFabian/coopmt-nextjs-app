import { ENV, authFetch } from "@/utils";

export class Address {
  /**
   * Create an user address
   * @param {*} userId
   * @param {*} data
   * @returns
   */
  async create(userId, data) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESSES.CREATE}`;
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

      // console.log({
      //     data: {
      //         ...data,
      //         user: userId,
      //     },
      // });

      const response = await authFetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all user addresses
   * @param {*} userId
   * @returns
   */
  async getAll(userId) {
    try {
      const populate = `populate=*`;
      const filters = `filters[user][id][$eq]=${userId}`;
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESSES.FIND}?${filters}&${populate}`;

      const response = await authFetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update auth user address
   * @param {*} addressId
   * @param {*} data
   * @returns
   */
  async update(addressId, data) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESSES.UPDATE}/${addressId}`;
      const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
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
   * Delete auth user address
   * @param {*} addressId
   */
  async delete(addressId) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESSES.DELETE}/${addressId}`;
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
