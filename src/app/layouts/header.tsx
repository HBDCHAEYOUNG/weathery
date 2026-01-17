import NavLink from "@/entities/navigation/ui/nav-link";
import SearchDropdown from "@/widgets/header/ui/search-dropdown";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between common-padding-y">
        <Link to="/" className="common-padding-left text-2xl font-bold">
          오늘 날씨
        </Link>
        <SearchDropdown />
      </div>
      <div className="flex common-padding-bottom">
        <NavLink to="/">홈</NavLink>
        <NavLink to="/favorites">즐겨찾기</NavLink>
      </div>
    </div>
  );
}

export default Header;
