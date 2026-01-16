import { useFavoritesStore } from "@/shared/store/favorites.store";

function FavoriteToggleButton({ district }: { district: string }) {
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();

  const handleFavoriteClick = (district: string) => {
    if (favorites.some((favorite) => favorite.district === district)) {
      removeFavorite(district);
    } else {
      addFavorite({ district });
    }
  };
  return (
    <button
      className="text-gray-300 ml-auto bg-transparent text-2xl z-10"
      onClick={() => handleFavoriteClick(district)}
    >
      {favorites.some((favorite) => favorite.district === district) ? "★" : "☆"}
    </button>
  );
}

export default FavoriteToggleButton;
