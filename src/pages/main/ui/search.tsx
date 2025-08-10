import {
  Search as SearchIcon,
  CalendarArrowDown,
  CalendarArrowUp,
} from "lucide-react";

import { useSearch } from "../state/memos";

export const Search = () => {
  const { handleSearchChange, handleSortOrderChange, searchValue, sortOrder } =
    useSearch();
  return (
    <div className="flex mb-4 space-x-4">
      <label className="input flex grow">
        <SearchIcon />
        <input
          name="search"
          className="search"
          type="text"
          placeholder="Search memos..."
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </label>
      <button
        className="btn btn-square btn-neutral"
        onClick={() =>
          handleSortOrderChange(sortOrder === "asc" ? "desc" : "asc")
        }
      >
        {sortOrder === "asc" ? <CalendarArrowUp /> : <CalendarArrowDown />}
      </button>
    </div>
  );
};
