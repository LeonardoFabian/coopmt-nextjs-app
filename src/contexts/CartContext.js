import { useState, useEffect, createContext } from "react";
import { Cart } from "@/api";

const cartController = new Cart();

export const CartContext = createContext();

/**
 * CartContext provider
 * @param {*} props
 */
export function CartProvider(props) {
  const { children } = props;
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(cartController.count());

  useEffect(() => {
    // TODO: obtener carrito
    const response = cartController.getAll();
    console.log("Local Storage products: ", response);
    setCart(response);
  }, []);

  /**
   * Añade un producto al carrito
   * @param {integer} productId
   */
  const addToCart = (productId) => {
    cartController.add(productId);
    // console.log("addToCart gameId: ", productId);
    refreshCount();
  };

  /**
   * Cambia la cantidad de items de un producto en el carrito
   * @param {number} productId ID del producto
   * @param {number} quantity Cantidad de items
   */
  const changeItemQuantity = (productId, quantity) => {
    // console.log("changeItemQuantity product: ", productId);
    // console.log("changeItemQuantity quantity: ", quantity);
    cartController.changeQuantity(productId, quantity);
    refreshCount();
  };

  /**
   * Elimina un producto del carrito
   * @param {number} productId ID del producto
   */
  const deleteItem = (productId) => {
    cartController.delete(productId);
    refreshCount();
  };

  const refreshCount = () => {
    setTotal(cartController.count());
    setCart(cartController.getAll());
  };

  const data = {
    cart,
    addToCart,
    total,
    deleteItem,
    deleteAllItems: () => {}, // TODO: create function
    changeItemQuantity,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
}
