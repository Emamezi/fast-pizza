import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchQuery() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!searchQuery) return;
    //dynamically navigate to the order id
    navigate(`/order/${searchQuery}`);
    setSearchQuery("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="seach order #"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      ></input>
    </form>
  );
}

export default SearchQuery;
