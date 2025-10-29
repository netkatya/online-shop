import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types/products';

interface ShopStore {
  // State
  favorites: Product[];
  cart: Product[];
  
  // Favorites
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
  
  // Cart
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  isInCart: (productId: string) => boolean;
  updateCartQuantity: (productId: string, quantity: number) => void;
  getCartQuantity: (productId: string) => number;
  getCartTotal: () => number;
  clearCart: () => void;
}

export const useShopStore = create<ShopStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      cart: [],

      // ====== FAVORITES ======
      addToFavorites: (product) =>
        set((state) => {
          if (state.favorites.some((p) => p._id === product._id)) {
            return state;
          }
          return { favorites: [...state.favorites, product] };
        }),

      removeFromFavorites: (productId) =>
        set((state) => ({
          favorites: state.favorites.filter((p) => p._id !== productId),
        })),

      isFavorite: (productId) =>
        get().favorites.some((p) => p._id === productId),

      clearFavorites: () => set({ favorites: [] }),

      // ====== CART ======
      addToCart: (product) =>
        set((state) => {
          const existing = state.cart.find((p) => p._id === product._id);
          if (existing) {
            return {
              cart: state.cart.map((p) =>
                p._id === product._id
                  ? { ...p, quantity: (p.quantity || 1) + 1 }
                  : p
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),

      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((p) => p._id !== productId),
        })),

      isInCart: (productId) => get().cart.some((p) => p._id === productId),

      updateCartQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { cart: state.cart.filter((p) => p._id !== productId) };
          }
          return {
            cart: state.cart.map((p) =>
              p._id === productId ? { ...p, quantity } : p
            ),
          };
        }),

      getCartQuantity: (productId) =>
        get().cart.find((p) => p._id === productId)?.quantity || 0,

      getCartTotal: () =>
        get().cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'shop-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);