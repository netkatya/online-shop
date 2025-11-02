import { create } from "zustand";

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

interface ShopStore {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const useShopStore = create<ShopStore>((set) => ({
  cartItems: [],
  addToCart: (item) =>
    set((state) => ({ cartItems: [...state.cartItems, item] })),
  removeFromCart: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((i) => i.productId !== productId),
    })),
  clearCart: () => set({ cartItems: [] }),
}));
