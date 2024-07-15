import { ENV } from "@/utils";

export class Post {
  /**
   * Retrieve latest posts
   */
  async getLatestPublished(limit, taxonomyId = null) {
    try {
      const sort = "sort=publishedAt:desc";
      const pagination = `pagination[limit]=${limit || 1}`;
      const populate = "populate=*";
      const filters = `filters[taxonomy][id][$eq]=${taxonomyId}`;

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.POSTS}?${sort}&${pagination}&${populate}&${filters}`;

      const response = await fetch(url);
      const result = await response.json();

      console.log("Post API getLatestPublished: ", result);

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getBySlug(slug) {
    const filters = `filters[slug][$eq]=${slug}`;
    const populatePost =
      "populate[0]=featuredImage&populate[1]=post_type&populate[2]=taxonomy";
    const populatePostType = "";
    const populateTaxonomy = "";
    const populates = `${populatePost}&${populatePostType}&${populateTaxonomy}`;
    const params = `${filters}&${populates}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.POSTS}?${params}`;

    try {
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data[0];
    } catch (error) {
      throw error;
    }
  }

  async getByPostType(slug, page) {
    const filters = `filters[post_type][slug][$eq]=${slug}`;
    const pagination = `pagination[page]=${page}&pagination[pageSize]=30`;
    const populate = "populate=*";
    const params = `${filters}&${pagination}&${populate}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.POSTS}?${params}`;

    try {
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getByTaxonomy(slug, page) {
    const filters = `filters[taxonomy][slug][$eq]=${slug}`;
    const pagination = `pagination[page]=${page}&pagination[pageSize]=30`;
    const populate = "populate=*";
    const params = `${filters}&${pagination}&${populate}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.POSTS}?${params}`;

    try {
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async search(text, page) {
    const filters = `filters[title][$contains]=${text}`;
    const pagination = `pagination[page]=${page}&pagination[pageSize]=6`;
    const populate = "populate=*";
    const params = `${filters}&${pagination}&${populate}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.POSTS}?${params}`;

    try {
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
