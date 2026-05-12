import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../data/products";

export type BrewMethod =
  | "Çekirdek"
  | "Espresso"
  | "V60"
  | "French Press"
  | "Chemex"
  | "Aeropress"
  | "Moka Pot"
  | "Kağıt Filtre"
  | "Metal Filtre"
  | "Soğuk Demleme";

const grindSizeMap: Record<BrewMethod, string> = {
  "Çekirdek": "Öğütülmemiş",
  "Espresso": "Çok İnce",
  "V60": "Orta-İnce",
  "French Press": "Kaba",
  "Chemex": "Orta-Kaba",
  "Aeropress": "İnce-Orta",
  "Moka Pot": "İnce",
  "Kağıt Filtre": "Orta",
  "Metal Filtre": "Orta",
  "Soğuk Demleme": "Kaba"
};

interface CartItem {
  product: Product;
  quantity: number;
  brewMethod: BrewMethod;
  grindSize: string;
  weight: "250g" | "500g" | "1kg";
  price: number; // Price for selected weight
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, brewMethod: BrewMethod, weight: "250g" | "500g" | "1kg") => void;
  removeFromCart: (productId: string, brewMethod: BrewMethod, weight: "250g" | "500g" | "1kg") => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, brewMethod: BrewMethod, weight: "250g" | "500g" | "1kg") => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) =>
          item.product.id === product.id &&
          item.brewMethod === brewMethod &&
          item.weight === weight
      );

      // Find the price for the selected weight variant
      const selectedVariant = product.variants.find(v => v.weight === weight);
      const price = selectedVariant?.price || product.price;

      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id &&
          item.brewMethod === brewMethod &&
          item.weight === weight
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prevCart,
        {
          product,
          quantity: 1,
          brewMethod,
          grindSize: grindSizeMap[brewMethod],
          weight,
          price
        }
      ];
    });
  };

  const removeFromCart = (productId: string, brewMethod: BrewMethod, weight: "250g" | "500g" | "1kg") => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(
          item.product.id === productId &&
          item.brewMethod === brewMethod &&
          item.weight === weight
        )
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
