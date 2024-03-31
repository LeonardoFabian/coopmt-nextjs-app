import { Token } from "@/api";

export async function authFetch(url, params) {
    const tokenController = new Token();
    const token = tokenController.getToken();
    console.log(token);

    const logout = () => {
        tokenController.removeToken();
        window.location.replace("/");
    }

    if(!token) {
        logout();
    } else {
        const result = tokenController.hasExpired(token);
        console.log("TOKEN EXPIRED: ", result);

        if(result) {
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