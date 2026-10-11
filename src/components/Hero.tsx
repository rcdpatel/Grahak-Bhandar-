import React from 'react';
import { ArrowRight, ShoppingBag, Sparkles, MapPin, CheckCircle2, Shield, Clock, Shirt, Layers, Backpack } from 'lucide-react';
import { HERO_STORE_IMG } from '../data/products';
import { ProductCategory, SchoolDepartment } from '../types/store';

interface HeroProps {
  onShopCategory: (category: ProductCategory) => void;
  onExploreDepartmentTees: () => void;
  onOpenCustomizer: () => void;
  onOpenAdminPanel: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onShopCategory,
  onExploreDepartmentTees,
  onOpenCustomizer,
  onOpenAdminPanel,
}) => {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Authentic Brand Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-2">
              <span>Grahak Bhandar · Official Campus Store & Cooperative Depot</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display leading-[1.15] text-balance">
              Grahak Bhandar Online: Department T-Shirts, Accessories & College Components.
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Order your official college items online at subsidized student rates. Pick up directly at the Grahak Bhandar physical counter (Student Activity Center Room 104) or 24/7 Quad lockers with instant digital pickup passes.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onShopCategory('t-shirts')}
                className="px-5 py-3 text-sm font-semibold text-slate-950 bg-white hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Shirt className="w-4 h-4 text-slate-900" />
                Browse T-Shirts
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onShopCategory('college-components')}
                className="px-5 py-3 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-amber-400" />
                College Components & Calculators
              </button>

              <button
                onClick={() => onShopCategory('accessories')}
                className="px-4 py-3 text-sm font-semibold text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Backpack className="w-4 h-4 text-emerald-400" />
                Accessories
              </button>
            </div>

            {/* Quiet metadata row with separators */}
            <div className="pt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400 border-t border-slate-800">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Subsidized Student Prices & 10% Discount
              </span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                20-Min Counter Handover
              </span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <button
                onClick={onOpenAdminPanel}
                className="text-amber-400 hover:underline cursor-pointer"
              >
                Admin Store Portal
              </button>
            </div>
          </div>

          {/* Right Column: High-Fidelity Store Photography */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 aspect-4/3 group">
              <img
                src={HERO_STORE_IMG}
                alt="Grahak Bhandar Campus Store interior with departmental t-shirts, calculators, and stationery"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-5">
                <div className="text-xs font-semibold text-white">
                  Grahak Bhandar (ग्राहक भण्डार)
                </div>
                <div className="text-xs text-slate-300 flex items-center justify-between mt-1">
                  <span>Student Center Room 104 · Ground Floor</span>
                  <span className="font-mono text-amber-300 tabular-nums">Physical Counter Open</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800/80 text-left">
          <div className="space-y-1">
            <div className="text-xs text-slate-400">Department T-Shirts</div>
            <div className="text-base font-semibold text-white font-display">6 College Faculties</div>
            <div className="text-xs text-slate-400">240 GSM combed cotton varsity tees</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-slate-400">College Components</div>
            <div className="text-base font-semibold text-white font-display">Calculators, Sets & Lab</div>
            <div className="text-xs text-slate-400">Casio fx-991EX, drafting kits, lab coats</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-slate-400">Campus Accessories</div>
            <div className="text-base font-semibold text-white font-display">RFID Badges & Bottles</div>
            <div className="text-xs text-slate-400">Lanyards, bags, pins, notebooks</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-slate-400">Express Pickup</div>
            <div className="text-base font-semibold text-white font-display">Zero Queue Wait</div>
            <div className="text-xs text-slate-400">Instant digital barcode & token pickup</div>
          </div>
        </div>

      </div>
    </section>
  );
};
