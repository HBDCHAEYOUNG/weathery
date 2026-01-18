import FavoriteItem from "@/features/favorite/ui/favorite-item";
import { useDropdownStore } from "@/shared/store/dropdown.store";
import { useFavoritesStore } from "@/shared/store/favorites.store";
import { useState } from "react";

function FavoritesPage() {
  const { favorites } = useFavoritesStore();
  const { toggle } = useDropdownStore();

  const [editMode, setEditMode] = useState(false);

  return (
    <div className=" grid grid-cols-1 gap-4 w-full common-padding-x common-padding-bottom max-w">
      <button onClick={() => setEditMode(!editMode)} className="cursor-pointer ml-auto">
        {editMode ? "완료" : "편집하기"}
      </button>
      {favorites.map((favorite) => (
        <FavoriteItem key={favorite.district} district={favorite.district} nickname={favorite.nickname} editMode={editMode} />
      ))}
      {favorites.length < 6 && <button onClick={toggle} className="cursor-pointer mb-10">🔍 도시 추가하기</button>}
    </div>
  );
}

export default FavoritesPage;