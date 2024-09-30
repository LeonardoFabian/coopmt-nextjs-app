import { ENV } from "@/utils";
import { jwtDecode } from "jwt-decode";

export class Token {
  /**
   * Sets the token in local storage.
   *
   * @param {string} token - The token to be stored.
   * @return {void}
   */
  setToken(token) {
    localStorage.setItem(ENV.TOKEN, token);
  }

  /**
   * Retrieves the token from local storage.
   *
   * @return {string} The stored token or null if not found.
   */
  getToken() {
    return localStorage.getItem(ENV.TOKEN);
  }

  /**
   * Removes the token from local storage.
   *
   * @return {void} No return value.
   */
  removeToken() {
    localStorage.removeItem(ENV.TOKEN);
  }

  /**
   * Checks if a token has expired.
   *
   * @param {string} token - The token to check.
   * @return {boolean} Returns true if the token has expired, false otherwise.
   */
  hasExpired(token) {
    const tokenDecode = jwtDecode(token);
    // console.log(tokenDecode);

    const expireDate = tokenDecode.exp * 1000;
    const currentDate = new Date().getTime();

    if (currentDate > expireDate) {
      return true;
    }

    return false;
  }
}
