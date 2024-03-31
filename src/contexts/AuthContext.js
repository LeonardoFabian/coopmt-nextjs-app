import { createContext, useState, useEffect } from "react";
import { Token, User } from "@/api";

const tokenController = new Token();
const userController = new User();

// context
export const AuthContext = createContext();

// provider
export function AuthProvider(props) {

    const {children} = props;

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // setLoading(false);
        (async () => {
            const token = tokenController.getToken();

            if(!token) {
                logout();
                setLoading(false);
                return;
            }

            if(tokenController.hasExpired(token)) {
                logout();
            } else {
                await login(token);
            }
        })()
    }, []);

    const login = async (token) => {
        // console.log("TOKEN: ", token);
        try {
            // store the token in local storage
            tokenController.setToken(token);
            // get user data
            const response = await userController.getMe();
            console.log("AUTHCONTEXT GET ME: ", response);
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
    }

    const logout = () => {
        tokenController.removeToken();
        setToken(null);
        setUser(null);
    }

    /**
     * Update local user data
     * @param string key 
     * @param {*} value 
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
    };

    if(loading) return null;

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}