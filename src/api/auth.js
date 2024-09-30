import { ENV } from "@/utils";

export class Auth {
  /**
   * Registers a new user with the provided data.
   *
   * @param {object} data - The user registration data.
   * @return {object} The registration result.
   */
  async register(data) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.REGISTER}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
   * Authenticates a user with the provided data.
   *
   * @param {object} data - The user authentication data.
   * @return {object} The authentication result.
   */
  async login(data) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.LOGIN}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(url, params);
      const result = await response.json();
      //   console.log("LOGIN RESULT: ", result);

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
