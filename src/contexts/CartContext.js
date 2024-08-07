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
  const [total, setTotal] = useState(null);
  const [quantity, setQuantity] = useState(cartController.count());

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

  /**
   * Elimina todos los productos del carrito
   */
  const deleteAllItems = () => {
    cartController.deleteAll();
    refreshCount();
  };

  const refreshCount = () => {
    setTotal(cartController.count());
    setQuantity(cartController.count());
    setCart(cartController.getAll());
  };

  const data = {
    cart,
    addToCart,
    quantity,
    total,
    deleteItem,
    deleteAllItems,
    changeItemQuantity,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
}
