import { Token } from "@/api";

export async function authFetch(url, params) {
  const tokenController = new Token();
  const token = tokenController.getToken();
  // console.log(token);

  /**
   * Logs out the user by removing the token and redirecting to the homepage.
   *
   * @return {void} No return value, redirects to the homepage.
   */
  const logout = () => {
    tokenController.removeToken();
    window.location.replace("/");
  };

  if (!token) {
    logout();
  } else {
    const result = tokenController.hasExpired(token); // check if the token has expired
    // console.log("TOKEN EXPIRED: ", result);

    if (result) {
      logout();
    } else {
      const tempParams = {
        ...params,
        headers: {
          ...params?.headers,
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        return await fetch(url, tempParams);
      } catch (error) {
        return error;
      }
    }
  }
}
