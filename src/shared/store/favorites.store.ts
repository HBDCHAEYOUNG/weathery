import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Favorite {
  district: string;
}

interface FavoritesState {
  favorites: Favorite[];
}

interface FavoriteProps extends FavoritesState {
  addFavorite: (favorite: Favorite) => void;
  removeFavorite: (id: string) => void;
}

const INIT = {
  favorites: [],
};

export const useFavoritesStore = create<FavoriteProps>()(
  persist(
    (set) => ({
      ...INIT,
      addFavorite: (favorite: Favorite) =>
        set((state) => ({ favorites: [...state.favorites, favorite] })),
      removeFavorite: (district: string) =>
        set((state) => ({
          favorites: state.favorites.filter(
            (favorite) => favorite.district !== district
          ),
        })),
    }),
    {
      name: "favorites-storage",
    }
  )
);
