import { Link } from "react-router-dom";
import SearchQuery from "../features/Order/SearchQuery";
import UserName from "../features/User/UserName";

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-500 bg-orange-300 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-widest">
        Fast rEACT coMPANY
      </Link>
      <SearchQuery />
      <UserName />
    </header>
  );
}

export default Header;
