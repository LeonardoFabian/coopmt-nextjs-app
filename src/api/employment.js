import { ENV, authFetch } from "@/utils";

export class EmploymentInformation {
  async getEmployeeDataFromTheSameInstitution(documentId) {
    try {
      const params = `documentId='${documentId}'`;
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS.EMPLOYEE_DATA}?${params}`;

      console.log("URL: ", url);

      const response = await authFetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getEmploymentInformation(userId) {
    try {
      const populate = "populate[0]=employment_type&populate[1]=sector";
      const filters = `filters[user][id][$eq]=${userId}`;
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS.EMPLOYMENT_INFORMATION}?${filters}&${populate}`;

      const response = await authFetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves a list of employment types from the API.
   *
   * @return {Promise<object[]>} The JSON response containing the list of employment types.
   * @throws Will throw an error if the network request fails or the response status is not 200.
   */
  async getEmploymentTypes() {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.EMPLOYMENT_TYPES}`;
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves a list of employment sectors from the API.
   *
   * @return {Promise<object[]>} The JSON response containing the list of employment sectors.
   * @throws Will throw an error if the network request fails or the response status is not 200.
   */
  async getEmploymentSectors() {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.EMPLOYMENT_SECTORS}`;
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async update(employmentInformationId, userId, data) {
    // console.log("EmploymentInformationId: ", employmentInformationId);
    // console.log("Data: ", data);
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS.EMPLOYMENT_INFORMATION}/${employmentInformationId}`;
      const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            ...data,
            endDate: data.endDate === "" ? null : data.endDate,
            user: userId,
          },
        }),
      };

      console.log("PARAMS: ", params.body);
      const response = await authFetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async create(userId, data) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS.EMPLOYMENT_INFORMATION}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            ...data,
            user: userId,
          },
        }),
      };

      const response = await authFetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async delete(employmentInformationId) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS.EMPLOYMENT_INFORMATION}/${employmentInformationId}`;
      const params = {
        method: "DELETE",
      };

      const response = await authFetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
