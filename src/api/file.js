import { ENV } from "@/utils";

export class File {
  async upload(formData) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.UPLOAD}`;
      const params = {
        method: "POST",
        body: formData,
      };

      const response = await fetch(url, params);
      const result = await response.json();

      console.log("File upload result: ", result);

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
