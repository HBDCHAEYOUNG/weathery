import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex flex-col  w-full ">
      <div className="flex justify-between common-padding">
        <Link to="/">오늘 날씨</Link>
        <button>🔍</button>
      </div>
      <div className="flex justify-around">
        <Link to="/">홈</Link>
        <Link to="/favorites">즐겨찾기</Link>
      </div>
    </div>
  );
}

export default Header;
