import { ENV } from "@/utils";

export class State {
    async findByCountry(countryId) {
        try {
            const filters = `filters[country][id][$eq]=${countryId}`;
            const pagination = `pagination[limit]=1000`;
            const order = `order=name:asc`;
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.STATES.FIND}?${filters}&${pagination}&${order}`;

            const response = await fetch(url);
            const result = await response.json();

            if(response.status !== 200) throw result;

            return result;

        } catch (error) {
            throw error;
        }
    }
}