import { ENV } from "@/utils";

export class Supplier {
  async find() {
    try {
      const sort = "sort=name:asc";
      const populate =
        "populate[0]=logo&populate[1]=featuredImage&populate[2]=information&populate[3]=socialNetworks";
      const populateInformation =
        "populate[4]=information.location&populate[5]=information.opening_hours";
      const populateLocation =
        "populate[6]=information.location.contactAddress&populate[7]=information.location.contactPhones&populate[8]=information.location.contactEmail&populate[9]=information.location.website";

      const params = `${sort}&${populate}&${populateInformation}&${populateLocation}`;

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.SUPPLIERS}?${params}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getBySlug(slug) {
    const filters = `filters[slug][$eq]=${slug}`;
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.SUPPLIERS}?${filters}`;

    try {
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data[0];
    } catch (error) {
      throw error;
    }
  }
}
