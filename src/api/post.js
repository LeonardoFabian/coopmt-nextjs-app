import { ENV } from "@/utils";

export class Post {

    /**
     * Retrieve latest posts
     */
    async getLatestPublished(limit) {
        try {
            const sort = "sort=publishedAt:desc";
            const pagination = `pagination[limit]=${limit || 1}`;
            const populate = 'populate=*';

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.POSTS}?${sort}&${pagination}&${populate}`;
            
            const response = await fetch(url);
            const result = await response.json();

            if(response.status !== 200) throw result;

            return result;

        } catch (error) {
            throw error;
        }
    }
}