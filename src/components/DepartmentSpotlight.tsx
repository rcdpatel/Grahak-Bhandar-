import React from 'react';
import { Shirt, ArrowRight, Sparkles } from 'lucide-react';
import { SCHOOLS, COLLEGE_TSHIRTS_IMG, PRODUCTS } from '../data/products';
import { SchoolDepartment, Product } from '../types/store';

interface DepartmentSpotlightProps {
  onSelectSchool: (schoolId: SchoolDepartment) => void;
  onOpenCustomizerForSchool: (schoolId: SchoolDepartment) => void;
  onSelectProduct: (product: Product) => void;
}

export const DepartmentSpotlight: React.FC<DepartmentSpotlightProps> = ({
  onSelectSchool,
  onOpenCustomizerForSchool,
  onSelectProduct,
}) => {
  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">
              Department Identity & Apparel
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Official Individual Department T-Shirts
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Each faculty features its own custom typography, founding year, and department colors. Screen-printed on 240 GSM organic cotton at the campus store print shop.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">
              Showing 6 Official Colleges
            </span>
          </div>
        </div>

        {/* 6-Department Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SCHOOLS.map((school) => {
            const deptTee = PRODUCTS.find(
              (p) => p.category === 't-shirts' && p.school === school.id
            );

            return (
              <div
                key={school.id}
                className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all group"
              >
                <div className="space-y-3">
                  {/* Top Bar of Card */}
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-md"
                      style={{
                        backgroundColor: `${school.accentHex}15`,
                        color: school.accentHex,
                      }}
                    >
                      {school.shortName}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {school.count} items in store
                    </span>
                  </div>

                  {/* Department Name */}
                  <h3 className="text-base font-bold text-slate-900 font-display group-hover:text-slate-700 transition-colors">
                    {school.name}
                  </h3>

                  {/* Motto & Campus Building */}
                  <p className="text-xs text-slate-500 italic">
                    "{school.motto}"
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Location: {school.building}
                  </p>

                  {/* Featured Tee Preview Box */}
                  {deptTee && (
                    <div 
                      onClick={() => onSelectProduct(deptTee)}
                      className="mt-2 p-2.5 bg-slate-50 rounded-lg border border-slate-100 hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-md overflow-hidden bg-slate-200 shrink-0">
                        <img
                          src={deptTee.image}
                          alt={deptTee.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-slate-900 truncate">
                          {deptTee.shortTitle}
                        </div>
                        <div className="text-[11px] font-mono tabular-nums text-slate-500">
                          ₹{deptTee.price.toLocaleString('en-IN')} · In Store Rack A
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onOpenCustomizerForSchool(school.id)}
                    className="text-xs font-medium text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Personalize</span>
                  </button>

                  <button
                    onClick={() => onSelectSchool(school.id)}
                    className="text-xs font-semibold text-slate-900 hover:text-slate-700 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
