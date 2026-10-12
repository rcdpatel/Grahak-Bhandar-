import React from 'react';
import { ArrowRight, CheckCircle2, Clock, Shirt, ShieldCheck, Sparkles } from 'lucide-react';
import { COLLEGE_UNIFORMS_IMG } from '../data/products';
import { ProductCategory } from '../types/store';
import { StoreLogo } from './StoreLogo';

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
            <div className="flex items-center gap-3.5">
              <StoreLogo size={54} />
              <div>
                <div className="text-xs uppercase tracking-wider text-amber-400 font-bold flex items-center gap-2">
                  <span>Grahak Bhandar (ग्राहक भण्डार)</span>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-400/30 font-mono">
                    Official Campus Store
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                  Shirpur Education Society (SES) · ॥ सा विद्या या विमुक्तये ॥
                </div>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display leading-[1.15] text-balance">
              Official College Uniforms, Department T-Shirts & Campus Wear.
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Order your official IMRD College (BCA & MCA uniforms), RCPACS College (BCA uniform & BSc T-shirt), RC Patel Polytechnic College, RCPIT College, and All Colleges general apparel online at subsidized student rates. Pick up directly at the Grahak Bhandar counter (Room 104) or 24/7 campus lockers.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onShopCategory('uniforms')}
                className="px-5 py-3 text-sm font-semibold text-slate-950 bg-white hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                College Uniform Sets
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onShopCategory('t-shirts')}
                className="px-5 py-3 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Shirt className="w-4 h-4 text-amber-400" />
                Browse T-Shirts
              </button>

              <button
                onClick={() => onShopCategory('generals')}
                className="px-4 py-3 text-sm font-semibold text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                All Colleges Generals
              </button>
            </div>

            {/* Quiet metadata row with separators */}
            <div className="pt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400 border-t border-slate-800">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Prescribed College Dress Code Approved
              </span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                15-Min Counter Pickup Handover
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
                src={COLLEGE_UNIFORMS_IMG}
                alt="Official IMRD, RCPACS, Polytechnic, RCPIT College Uniforms and Department T-Shirts"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-5">
                <div className="text-xs font-semibold text-white">
                  Grahak Bhandar (ग्राहक भण्डार)
                </div>
                <div className="text-[11px] text-slate-300">
                  SES Campus Official Uniforms & Apparel Center · Room 104
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
