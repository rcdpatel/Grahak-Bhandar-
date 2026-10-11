import React from 'react';
import { ShoppingBag, Sparkles, Shield, UserCheck } from 'lucide-react';
import { ProductCategory, SchoolDepartment } from '../types/store';
import { StoreLogo } from './StoreLogo';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onSelectCategory: (category: ProductCategory | 'all') => void;
  onSelectSchool: (school: SchoolDepartment | 'all') => void;
  onOpenCustomizer: () => void;
  onOpenCalcChecker: () => void;
  onOpenAdminPanel: () => void;
  activeCategory: ProductCategory | 'all';
  ordersCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onSelectCategory,
  onSelectSchool,
  onOpenCustomizer,
  onOpenCalcChecker,
  onOpenAdminPanel,
  activeCategory,
  ordersCount,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          
          {/* Zone 1: Wordmark with Official SES Logo in Web Corner */}
          <button
            onClick={() => {
              onSelectCategory('all');
              onSelectSchool('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 shrink-0 cursor-pointer text-left group"
          >
            <StoreLogo size={48} />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 font-display whitespace-nowrap group-hover:text-amber-800 transition-colors leading-tight">
                  Grahak Bhandar
                </span>
                <span className="text-[10px] font-mono uppercase bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-bold border border-amber-200 hidden xs:inline">
                  SES Campus
                </span>
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider hidden sm:inline">
                Shirpur Education Society · ॥ सा विद्या या विमुक्तये ॥
              </span>
            </div>
          </button>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => {
                onSelectCategory('all');
                onSelectSchool('all');
              }}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === 'all' ? 'text-slate-950 font-semibold border-b-2 border-slate-900 pb-0.5' : ''
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => {
                onSelectCategory('t-shirts');
                onSelectSchool('all');
              }}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === 't-shirts' ? 'text-slate-950 font-semibold border-b-2 border-slate-900 pb-0.5' : ''
              }`}
            >
              T-Shirts
            </button>
            <button
              onClick={() => onSelectCategory('accessories')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === 'accessories' ? 'text-slate-950 font-semibold border-b-2 border-slate-900 pb-0.5' : ''
              }`}
            >
              Accessories
            </button>
            <button
              onClick={() => onSelectCategory('college-components')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === 'college-components' ? 'text-slate-950 font-semibold border-b-2 border-slate-900 pb-0.5' : ''
              }`}
            >
              College Components
            </button>
            <button
              onClick={onOpenCalcChecker}
              className="text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Exam Approval
            </button>
          </nav>

          {/* Zone 3: 1 primary action (+ Admin Portal shortcut) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Admin Desk Button */}
            <button
              onClick={onOpenAdminPanel}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              title="Store Manager Admin Dashboard"
            >
              <Shield className="w-3.5 h-3.5 text-amber-700" />
              <span>Admin Panel</span>
              {ordersCount > 0 && (
                <span className="font-mono text-[10px] bg-amber-200 text-amber-900 px-1 rounded-sm">
                  {ordersCount}
                </span>
              )}
            </button>

            {/* Shopping / Pickup Bag */}
            <button
              onClick={onOpenCart}
              aria-label="Pickup bag"
              className="relative flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Pickup Bag</span>
              <span className="font-mono tabular-nums text-xs bg-slate-800 text-slate-100 px-1.5 py-0.5 rounded">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
