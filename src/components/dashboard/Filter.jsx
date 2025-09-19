import React from "react";
import SearchBar from "../ui/elements/SearchBar";
import FilterButton from "../ui/elements/FilterButton";

function Filter({
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange,
  selectedFilter = "",
  onFilterChange,
  counts = {}
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 w-full justify-between px-8">
      {/* Search container takes full width on small screens, fixed max width on md+ */}
      <div className="flex-grow min-w-full md:min-w-[300px]">
        <SearchBar
          className="w-full"
          searchPlaceholder={searchPlaceholder}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          selectedFilter={selectedFilter}
          onFilterChange={onFilterChange}
        />
      </div>

      {/* Filter buttons container - wrap if needed */}
      <div className="flex flex-wrap gap-2 flex-grow min-w-[250px] max-w-full md:max-w-auto justify-center lg:justify-end">
        <FilterButton
          label="All Stages"
          count={counts.all || 0}
          selected={selectedFilter === "all"}
          onClick={() => onFilterChange("all")}
        />
        <FilterButton
          label="Applied"
          count={counts.Applied || 0}
          selected={selectedFilter === "Applied"}
          onClick={() => onFilterChange("Applied")}
        />
        <FilterButton
          label="Screening"
          count={counts.Screening || 0}
          selected={selectedFilter === "Screening"}
          onClick={() => onFilterChange("Screening")}
        />
        <FilterButton
          label="Rejected"
          count={counts.Rejected || 0}
          selected={selectedFilter === "Rejected"}
          onClick={() => onFilterChange("Rejected")}
        />
        {/* Add more FilterButtons as needed */}
      </div>
    </div>
  );
}

export default Filter;
