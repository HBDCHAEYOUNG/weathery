import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Favorite {
  district: string;
}

interface FavoritesState {
  favorites: Favorite[];
}

interface FavoriteProps extends FavoritesState {
  addFavorite: (favorite: Favorite) => boolean;
  removeFavorite: (id: string) => void;
}

const INIT = {
  favorites: [],
};


export const useFavoritesStore = create<FavoriteProps>()(
  persist(
    (set) => ({
      ...INIT,
      addFavorite: (favorite: Favorite) => {
        let added = false;
        set((state) => {
          if (state.favorites.length >= 6) return state; 
          added = true;
          return { favorites: [...state.favorites, favorite] };
        });
        return added;
      },
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
