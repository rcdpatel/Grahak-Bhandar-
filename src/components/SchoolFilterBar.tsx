import React from 'react';
import { Search, X, Shirt, Backpack, Layers, Sparkles, ArrowUpDown } from 'lucide-react';
import { ProductCategory, SchoolDepartment } from '../types/store';
import { SCHOOLS } from '../data/products';

interface SchoolFilterBarProps {
  selectedSchool: SchoolDepartment | 'all';
  onSelectSchool: (school: SchoolDepartment | 'all') => void;
  selectedCategory: ProductCategory | 'all';
  onSelectCategory: (category: ProductCategory | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onlyInStock: boolean;
  onToggleInStock: () => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onOpenCustomizer: () => void;
  totalFilteredCount: number;
}

export const SchoolFilterBar: React.FC<SchoolFilterBarProps> = ({
  selectedSchool,
  onSelectSchool,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onlyInStock,
  onToggleInStock,
  sortBy,
  onSortChange,
  onOpenCustomizer,
  totalFilteredCount,
}) => {
  // Required categories: 't-shirts', 'accessories', 'college components'
  const categoryTabs: { id: ProductCategory | 'all'; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Products', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 't-shirts', label: 'T-Shirts', icon: <Shirt className="w-3.5 h-3.5" /> },
    { id: 'accessories', label: 'Accessories', icon: <Backpack className="w-3.5 h-3.5" /> },
    { id: 'college-components', label: 'College Components', icon: <Layers className="w-3.5 h-3.5 text-amber-600" /> },
  ];

  return (
    <div className="bg-white border-b border-slate-200 sticky top-18 z-20 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
        
        {/* Row 1: Search by Name & Price Sort Controls (Highlighting search and price low-to-high, high-to-low) */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search by Product Name Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search products by name (e.g. fx-991EX, Engineering Tee, Compass Set, Lab Coat...)"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:bg-white placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Controls: Price Sort & In-Store Filter */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Price Sort Dropdown (Price Low to High, High to Low) */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <label htmlFor="price-sort-select" className="text-slate-500 font-medium hidden sm:inline">
                Sort:
              </label>
              <select
                id="price-sort-select"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="bg-transparent text-slate-900 font-medium cursor-pointer focus:outline-hidden"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High (₹ → ₹₹₹)</option>
                <option value="price-high">Price: High to Low (₹₹₹ → ₹)</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* In-Stock Filter Checkbox */}
            <label className="flex items-center gap-1.5 text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 cursor-pointer select-none hover:bg-slate-100 transition-colors shrink-0">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={onToggleInStock}
                className="rounded border-slate-300 text-slate-900 focus:ring-0 cursor-pointer"
              />
              <span className="font-medium">In-Store Now</span>
            </label>
          </div>

        </div>

        {/* Row 2: Categories: T-Shirts, Accessories, College Components */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-1 border-t border-slate-100">
          
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            <span className="text-[11px] uppercase font-semibold text-slate-400 mr-1 shrink-0">
              Categories:
            </span>
            {categoryTabs.map((tab) => {
              const isSelected = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectCategory(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Tee Customizer Shortcut */}
          <div className="flex items-center justify-between lg:justify-end gap-3 text-xs">
            <span className="font-mono tabular-nums text-slate-500 text-[11px]">
              {totalFilteredCount} products available
            </span>
            <button
              onClick={onOpenCustomizer}
              className="text-amber-800 hover:text-amber-900 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Personalize Tee</span>
            </button>
          </div>

        </div>

        {/* Row 3: College / Department Faculty Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1 border-t border-slate-100">
          <span className="text-[11px] uppercase font-semibold text-slate-400 mr-1 shrink-0">
            Faculties:
          </span>
          <button
            onClick={() => onSelectSchool('all')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              selectedSchool === 'all'
                ? 'bg-slate-200 text-slate-900 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            All Faculties
          </button>
          {SCHOOLS.map((school) => {
            const isSelected = selectedSchool === school.id;
            return (
              <button
                key={school.id}
                onClick={() => onSelectSchool(school.id)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-slate-200 text-slate-900 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ backgroundColor: school.accentHex }}
                />
                <span>{school.shortName}</span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
