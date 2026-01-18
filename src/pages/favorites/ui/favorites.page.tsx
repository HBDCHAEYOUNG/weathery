import FavoriteItem from "@/features/favorite/ui/favorite-item";
import { useDropdownStore } from "@/shared/store/dropdown.store";
import { useFavoritesStore } from "@/shared/store/favorites.store";

function FavoritesPage() {
  const { favorites } = useFavoritesStore();
  const { toggle } = useDropdownStore();

  return (
    <div className=" grid grid-cols-1 gap-4 w-full common-padding-x common-padding-bottom max-w">
      {favorites.map((favorite) => (
        <FavoriteItem key={favorite.district} district={favorite.district} />
      ))}
      {favorites.length < 6 && <button onClick={toggle} className="cursor-pointer mb-10">🔍 도시 추가하기</button>}
    </div>
  );
}

export default FavoritesPage;