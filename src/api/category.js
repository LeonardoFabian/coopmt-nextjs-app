import { ENV } from "@/utils";

export class Category {
    async find() {
        try {
            const sort = "sort=order:asc";
            const populate = "populate=featuredImage";
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CATEGORIES.FIND}?${populate}&${sort}`;

            const response = await fetch(url);
            const result = await response.json();
            
            if(response.status !== 200) throw result;

            return result;

        } catch (error) {
            throw error;
        }
    }
}