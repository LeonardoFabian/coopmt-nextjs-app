import { ENV } from "@/utils";

export class Country {
    async find() {
        try {
            const sort = "sort=name:asc";
            const pagination = `pagination[pageSize]=500`;

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.COUNTRIES.FIND}?${sort}&${pagination}`;

            const response = await fetch(url);
            const result = await response.json();
            console.log(result);

            if(response.status !== 200) throw result;

            return result;
        
        } catch (error) {
            throw error;
        }
    }
}