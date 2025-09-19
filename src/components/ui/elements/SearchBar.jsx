import { FiSearch } from "react-icons/fi";

export default function SearchBar({
  className,
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange,
}) {
  return (
    <div className={className}>
      {/* Search box */}
      <div className="flex items-center flex-1 min-w-[200px] bg-gray-50 border rounded-lg px-4 py-1">
        <FiSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          className="bg-transparent outline-none w-full"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={onSearchChange}
        />
      </div>
    </div>
  );
}