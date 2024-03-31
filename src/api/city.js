import { ENV } from "@/utils";

export class City {

    /**
     * Get all state cities
     * @param {*} stateId 
     * @returns 
     */
    async findByState(stateId) {
        try {
            const filters = `filters[state][id][$eq]=${stateId}`;
            const pagination = `pagination[limit]=1000`;
            const sort = `order=name:asc`;

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CITIES.FIND}?${filters}&${sort}&${pagination}`;

            const response = await fetch(url);
            const result = await response.json();

            if(response.status !== 200) throw result;

            return result;

        } catch (error) {
            throw error;
        }
    }
}