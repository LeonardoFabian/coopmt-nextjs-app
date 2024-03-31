import { ENV } from "@/utils";

export class Service {

    /**
     * get all services
     * @returns 
     */
    async find() {
        try {
            const populate = `populate=*`;
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.SERVICES}?${populate}`;

            const response = await fetch(url);
            const result = await response.json();

            if(response.status !== 200) throw result;

            return result;
            
        } catch (error) {
            throw error;
        }
    }
}