"use client";

import { LuSearch, LuX, LuFilter, LuSlidersHorizontal } from "react-icons/lu";

interface EventFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedDistrict: string;
  setSelectedDistrict: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  categories: string[];
  districts: string[];
  totalResults: number;
}

export default function EventFilters({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  selectedDistrict,
  setSelectedDistrict,
  sortBy,
  setSortBy,
  categories,
  districts,
  totalResults,
}: EventFiltersProps) {
  const hasActiveFilters = search || selectedCategory !== "All" || selectedDistrict !== "All";

  const handleReset = () => {
    setSearch("");
    setSelectedCategory("All");
    setSelectedDistrict("All");
    setSortBy("soonest");
  };

  return (
    <div className="bg-base-100 rounded-2xl border border-base-300 p-6 shadow-xs space-y-6">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/50">
            <LuSearch className="text-lg" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by event title, location, or district (e.g. Panchagarh, Mirpur, Turag)..."
            className="input input-bordered w-full pl-10 pr-10 text-sm bg-base-200/40 focus:bg-base-100 rounded-xl"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/50 hover:text-base-content"
              aria-label="Clear search"
            >
              <LuX className="text-base" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <LuFilter className="text-base-content/50 text-sm hidden sm:block" />
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="select select-bordered select-sm w-full sm:w-44 text-xs rounded-xl bg-base-100 border-base-300 font-medium text-base-content focus:border-primary shadow-xs cursor-pointer"
              aria-label="Filter by district"
            >
              <option value="All" className="bg-base-100 text-base-content">All Districts (64)</option>
              {districts.map((district) => (
                <option key={district} value={district} className="bg-base-100 text-base-content">
                  {district}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <LuSlidersHorizontal className="text-base-content/50 text-sm hidden sm:block" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="select select-bordered select-sm w-full sm:w-44 text-xs rounded-xl bg-base-100 border-base-300 font-medium text-base-content focus:border-primary shadow-xs cursor-pointer"
              aria-label="Sort events"
            >
              <option value="soonest" className="bg-base-100 text-base-content">Earliest</option>
              <option value="latest" className="bg-base-100 text-base-content">Latest</option>
              <option value="urgency" className="bg-base-100 text-base-content">Most Spots Available</option>
              <option value="popularity" className="bg-base-100 text-base-content">Almost Full</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="btn btn-ghost btn-sm text-xs font-semibold text-error hover:bg-error/10 rounded-xl"
            >
              Reset
            </button>
          )}
        </div>

      </div>

      <div className="border-t border-base-200 pt-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-base-content/60">
            Action Sectors
          </span>
          <span className="text-xs text-base-content/60 font-medium">
            Showing <strong className="text-base-content">{totalResults}</strong> upcoming drives
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-primary text-primary-content shadow-xs"
                    : "bg-base-200/70 hover:bg-base-200 text-base-content/80 border border-base-300"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
