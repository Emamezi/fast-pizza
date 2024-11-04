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
        placeholder="Seach order #"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="block rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-200 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 sm:w-64 sm:focus:w-72"
      ></input>
    </form>
  );
}

export default SearchQuery;
