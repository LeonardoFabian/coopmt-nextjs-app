import { ENV, authFetch } from "@/utils";

export class Event {
  /**
   * Retrieves a list of published events from the API.
   *
   * The events are sorted by their published date in descending order.
   * Includes populated fields for featured images, galleries, and prices.
   *
   * @return {Promise<object>} The JSON response containing the list of published events.
   * @throws Will throw an error if the API response status is not 200.
   */
  async getPublishedEvents() {
    try {
      const sort = "sort=publishedAt:desc";
      const populateImg = "populate[0]=featuredImage";
      const populateGallery = "populate[1]=gallery";
      const populatePrices = "populate[2]=prices";

      const params = `${sort}&${populateImg}&${populateGallery}&${populatePrices}`;

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.EVENTS.FIND}?${params}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
