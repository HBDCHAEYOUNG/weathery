import FavoriteItem from "@/features/favorite/ui/favorite-item";
import { useDropdownStore } from "@/shared/store/dropdown.store";
import { useFavoritesStore } from "@/shared/store/favorites.store";

function FavoritesPage() {
  const { favorites } = useFavoritesStore();
  const { toggle } = useDropdownStore();

  return (
    <div className=" grid grid-cols-1 gap-4 w-full common-padding-x common-padding-bottom">
      {favorites.map((favorite) => (
        <FavoriteItem key={favorite.district} district={favorite.district} />
      ))}
      <button onClick={toggle} className="cursor-pointer">🔍 도시 추가하기</button>
    </div>
  );
}

export default FavoritesPage;