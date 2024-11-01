import { Link } from "react-router-dom";
import SearchQuery from "../features/Order/SearchQuery";

function Header() {
  return (
    <header>
      <Link to="/">Fast rEACT coMPANY</Link>
      <SearchQuery />
      <p>Mezi</p>
    </header>
  );
}

export default Header;
