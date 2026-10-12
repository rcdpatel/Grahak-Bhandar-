import React from 'react';
import { ProductCategory, SchoolDepartment } from '../types/store';
import { StoreLogo } from './StoreLogo';

interface FooterProps {
  onSelectCategory: (category: ProductCategory | 'all') => void;
  onSelectSchool: (school: SchoolDepartment | 'all') => void;
  onOpenCalcChecker: () => void;
  onOpenCustomizer: () => void;
  onOpenAdminPanel?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onSelectSchool,
  onOpenCalcChecker,
  onOpenCustomizer,
  onOpenAdminPanel,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column 1: Brand & Physical Store */}
          <div className="space-y-3 col-span-2 md:col-span-1">
            <div className="flex items-center gap-3">
              <StoreLogo size={46} />
              <div>
                <div className="text-lg font-bold text-white font-display leading-tight">
                  Grahak Bhandar
                </div>
                <div className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
                  Shirpur Education Society (SES)
                </div>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Official campus cooperative store for Shirpur Education Society (SES). Providing students with subsidized academic goods, department t-shirts, calculators, and lab components.
            </p>
            <div className="text-[11px] text-slate-500">
              Student Activity Center · Room 104<br />
              SES Campus, Shirpur (Dhule) · Hours: Mon–Sat 8:30 AM – 6:30 PM
            </div>
          </div>

          {/* Column 2: Colleges & Faculties */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Colleges & Faculties
            </div>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onSelectSchool('imrd')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  IMRD College (BCA & MCA)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectSchool('rcpacs')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  RCPACS College (BCA & BSc)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectSchool('polytechnic')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  RC Patel Polytechnic College
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectSchool('rcpit')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  RCPIT Engineering College
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectSchool('generals')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  All Colleges Generals (SES Central)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Store Categories */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Store Categories
            </div>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onSelectCategory('t-shirts')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  College Department T-Shirts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('uniforms')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  College Uniform Sets (BCA / MCA / Engg)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('generals')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  All Colleges Generals & Lab Gear
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCalcChecker}
                  className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Uniform & Dress Code Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Student Services & Admin */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Store Services
            </div>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button
                  onClick={onOpenCustomizer}
                  className="hover:text-white transition-colors cursor-pointer text-left text-amber-300"
                >
                  Personalized Tee Studio
                </button>
              </li>
              {onOpenAdminPanel && (
                <li>
                  <button
                    onClick={onOpenAdminPanel}
                    className="hover:text-white transition-colors cursor-pointer text-left text-amber-400 font-medium"
                  >
                    Store Admin Dashboard
                  </button>
                </li>
              )}
              <li>20-Minute Express Pickup Desk</li>
              <li>24/7 Smart Quad Lockers</li>
              <li>Student ID 10% Discount</li>
              <li>Exchange at Room 104 Counter</li>
            </ul>
          </div>
        </div>

        {/* Quiet Copyright Row */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © 2026 Grahak Bhandar (ग्राहक भण्डार) Campus Cooperative Store.
          </div>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Academic Regulations</span>
            <span>·</span>
            <span>Campus Pickup Terms</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
