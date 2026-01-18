import FavoriteToggleButton from "@/features/favorite/ui/favorite-toggle-button";
import { useDebounce } from "@/shared/hook/useDebounce";
import useDistrictFilter from "@/shared/hook/useDistrictFilter";
import { encodeDistrict } from "@/shared/lib/url-utils";
import { useDropdownStore } from "@/shared/store/dropdown.store";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/shared/ui/_shadcn/dropdown-menu";
import { Input } from "@/shared/ui/_shadcn/input";
import CircleButton from "@/shared/ui/button/circle-button";

import { Link } from "react-router-dom";

function SearchDropdown() {
  const {
    isOpen,
    toggle,
    searchText,
    setSearchText,
  } = useDropdownStore();
  
  const debouncedSearchText = useDebounce(searchText, 300);
  const filteredDistricts = useDistrictFilter(debouncedSearchText);

  return (
    <DropdownMenu open={isOpen} onOpenChange={toggle}>
      <DropdownMenuTrigger className="common-padding-right text-2xl">
        {isOpen ? "✕" : "🔍"}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-background w-screen h-screen z-50 border-none">
        <div className="common-padding relative">
          <Input
            placeholder="국내 도시를 검색해 보세요"
            className="focus-visible:ring-0 focus-visible:ring-offset-0 h-14 text-xl!"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <CircleButton
            className="absolute right-8 top-1/2 -translate-y-1/2 text-white"
            onClick={() => setSearchText("")}
          >
            ✕
          </CircleButton>
        </div>

        <ul className="overflow-y-auto max-h-[calc(100%-100px)] border-t border-gray-200">
          {filteredDistricts.map((district) => 
         (
            <li
              key={district}
              className="flex items-center common-padding-y gap-2 cursor-pointer hover:bg-gray-100 common-padding-x "
            >
              <CircleButton>🔍</CircleButton>
              <Link to={`/${encodeDistrict(district)}`} onClick={toggle} className="w-full">
                {district.split("-").join(" ")}
              </Link>
              <FavoriteToggleButton district={district} />
            </li>
          ))}
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SearchDropdown;
