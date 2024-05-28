import { ENV, authFetch } from "@/utils";

export class Wishlist {
  async getAll(userId) {
    const filters = `filters[user][id][$eq]=${userId}`;
    const populate = `populate[0]=product&populate[1]=product.image`;
    const pagination = ``;
    const params = `${filters}&${populate}&${pagination}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}?${params}`;

    try {
      const response = await authFetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Función que revisa si un usuario tiene un producto añadido a su lista de deseos
   * @param {number} userId ID del usuario autenticado
   * @param {number} productId ID del producto
   * @returns
   */
  async check(userId, productId) {
    const filterUser = `filters[user][id][$eq][0]=${userId}`;
    const filterProduct = `filters[product][id][$eq][1]=${productId}`;
    const params = `${filterUser}&${filterProduct}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}?${params}`;

    try {
      const response = await authFetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      if (result.data.length === 0) {
        return false;
      }

      return result.data[0];
    } catch (error) {
      throw error;
    }
  }

  /**
   * Función para añadir un producto a la lista de deseos "wishlist" del usuario
   * @param {number} userId ID del usuario autenticado
   * @param {number} productId ID del producto
   * @returns Data si existe un registro con el ID del usuario y del producto
   */
  async add(userId, productId) {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          user: userId,
          product: productId,
        },
      }),
    };

    try {
      const response = await authFetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Función para eliminar un producto de la lista de deseos "wishlist" del usuario
   * @param {number} id ID del registro en la wishlist
   */
  async delete(id) {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}/${id}`;
    const params = {
      method: "DELETE",
    };

    try {
      const response = await authFetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
