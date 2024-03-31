import { ENV, authFetch } from "@/utils";

export class User {

    /**
     * Get User data
     * @returns 
     */
    async getMe() {
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS.ME}`;
            // const params = {
            //     headers: {
            //         Authorization: `Bearer rqrqrqwerqwrqwer`,
            //     },
            // };
            const response = await authFetch(url);
            const result = await response.json();
    
            if(response.status !== 200) throw result;
    
            return result;
        } catch(error) {
            throw error;
        }
    }

    /**
     * Update authenticated User
     * @param {*} userId 
     * @param {*} data 
     * @returns 
     */
    async updateMe(userId, data) {
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS.UPDATE}/${userId}`;
            const params = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }

            const response = await authFetch(url, params);
            const result = await response.json();

            if(response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }
}