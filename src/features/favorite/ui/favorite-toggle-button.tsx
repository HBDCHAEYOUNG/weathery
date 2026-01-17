import { useFavoritesStore } from "@/shared/store/favorites.store";
import { toast } from "sonner";

function FavoriteToggleButton({ district }: { district: string }) {
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();

  const handleFavoriteClick = (district: string) => {
    if (favorites.some((favorite) => favorite.district === district)) {
      removeFavorite(district);
      toast.error(`"${district.split("-").slice(-2).join(" ")}"이(가) 관심지역에서 삭제되었습니다.`);
    } else {
      addFavorite({ district });
      toast.success(`"${district.split("-").slice(-2).join(" ")}"이(가) 관심지역으로 추가되었습니다.`);
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
