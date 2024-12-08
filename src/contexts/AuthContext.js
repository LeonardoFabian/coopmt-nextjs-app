import { createContext, useState, useEffect } from "react";
import { Token, User } from "@/api";

const tokenController = new Token();
const userController = new User();

// context
export const AuthContext = createContext();

/**
 * Provides authentication context to the application, managing user login, logout, and data updates.
 *
 * @param {object} props - The component props, including children to be wrapped with the AuthContext.
 * @return {JSX.Element|null} The AuthContext Provider component, or null if the authentication is still loading.
 */
export function AuthProvider(props) {
  const { children } = props;

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // keep user logged in
  useEffect(() => {
    // setLoading(false);
    (async () => {
      const token = tokenController.getToken();

      if (!token) {
        logout();
        setLoading(false);
        return;
      }

      if (tokenController.hasExpired(token)) {
        logout();
      } else {
        await login(token);
      }
    })();
  }, []);

  /**
   * Logs a user in using the provided token.
   *
   * @param {string} token - The authentication token to use for login.
   * @return {Promise<void>} A promise that resolves when the login process is complete.
   */
  const login = async (token) => {
    // console.log("TOKEN: ", token);
    try {
      // store the token in local storage
      tokenController.setToken(token);
      // get user data
      const response = await userController.getMe();
      // console.log("AUTHCONTEXT GET ME: ", response);
      // set the user data in the user state
      setUser(response);
      // set the token in the token state
      setToken(token);
      // set loading to false
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  /**
   * Logs the user out by removing the token from local storage and resetting the user state.
   *
   * @return {void} No return value.
   */
  const logout = () => {
    tokenController.removeToken();
    setToken(null);
    setUser(null);
  };

  /**
   * Updates the local user data by setting the value of a specific key.
   *
   * @param {string} key - The key to update in the user data.
   * @param {*} value - The new value for the specified key.
   * @return {void} No return value.
   */
  const updateUser = (key, value) => {
    setUser({
      ...user,
      [key]: value,
    });
  };

  const data = {
    accessToken: token,
    user,
    login,
    logout,
    updateUser,
    loading,
    setLoading,
  };

  if (loading) return null;

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
