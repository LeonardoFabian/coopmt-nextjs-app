import { ENV } from "@/utils";

export class Gender {
  async getAll() {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS.GENDERS}`;
    try {
      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async findOne(genderId) {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS.GENDERS}/${genderId}`;
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
