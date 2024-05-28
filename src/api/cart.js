import { forEach } from "lodash";
import { ENV, authFetch } from "@/utils";

export class Cart {
  /**
   * Añade un producto al carrito y lo almacena en el local Storage
   * @param {integer} productId ID del producto
   */
  add(productId) {
    const products = this.getAll();
    const objIndex = products.findIndex((product) => product.id === productId);

    // Añadir producto al array de productos si no existe
    if (objIndex < 0) {
      products.push({
        id: productId,
        quantity: 1,
      });
    } else {
      const product = products[objIndex];
      products[objIndex].quantity = product.quantity + 1;
    }

    localStorage.setItem(ENV.CART, JSON.stringify(products));
  }

  /**
   * Obtiene el ID de todos los productos almacenados en el localStorage
   */
  getAll() {
    const response = localStorage.getItem(ENV.CART);

    if (!response) {
      return [];
    } else {
      return JSON.parse(response);
    }
  }

  /**
   * Obtiene la cantidad de articulos en el carrito.
   * @returns Total de articulos en el carrito
   */
  count() {
    const response = this.getAll();
    let count = 0;

    forEach(response, (item) => {
      count += item.quantity;
    });

    return count;
  }

  /**
   * Cambia la cantidad de items de un producto en el local storage
   * @param {number} productId ID del producto
   * @param {number} quantity Cantidad de items
   */
  changeQuantity(productId, quantity) {
    const products = this.getAll();
    const objIndex = products.findIndex((product) => product.id === productId);

    products[objIndex].quantity = quantity;

    localStorage.setItem(ENV.CART, JSON.stringify(products));
  }

  /**
   * Elimina un producto del local storage
   * @param {number} productId ID del producto
   */
  delete(productId) {
    const products = this.getAll();

    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );

    localStorage.setItem(ENV.CART, JSON.stringify(updatedProducts));
  }
}
