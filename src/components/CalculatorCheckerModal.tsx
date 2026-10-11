import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, XCircle, Search, HelpCircle, ExternalLink } from 'lucide-react';
import { Product } from '../types/store';
import { PRODUCTS } from '../data/products';

interface CalculatorCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (p: Product) => void;
}

interface ExamRule {
  courseName: string;
  department: string;
  allowedModels: string[];
  bannedFeatures: string[];
  notes: string;
}

const EXAM_RULES: ExamRule[] = [
  {
    courseName: 'Calculus I & II (MATH 101/102)',
    department: 'Faculty of Science & Math',
    allowedModels: ['Casio fx-991EX', 'Casio fx-115ES Plus', 'TI-30X IIS', 'TI-36X Pro'],
    bannedFeatures: ['Graphing / QWERTY keyboards', 'Wireless communication', 'CAS (Computer Algebra Systems)'],
    notes: 'Scientific non-programmable only. Memory must be cleared before exam room entry.',
  },
  {
    courseName: 'Engineering Statics & Dynamics (ENGR 201)',
    department: 'School of Engineering',
    allowedModels: ['Casio fx-991EX ClassWiz', 'TI-36X Pro', 'HP 35s', 'NCEES Approved List'],
    bannedFeatures: ['Laptops', 'Calculators with internet or cameras'],
    notes: 'Strict compliance with NCEES FE/PE exam policy. Casio fx-991EX is the campus standard.',
  },
  {
    courseName: 'Business Finance & Accounting (FIN 301)',
    department: 'School of Business & Economics',
    allowedModels: ['Texas Instruments BA II Plus', 'BA II Plus Professional', 'HP 12C'],
    bannedFeatures: ['Standard non-financial calculators (lacks TVM keys)'],
    notes: 'Requires dedicated Time-Value-of-Money (TVM) and Cash-Flow register functions.',
  },
  {
    courseName: 'Applied Statistics & Probability (STAT 220)',
    department: 'Mathematics & Data',
    allowedModels: ['TI-84 Plus CE', 'TI-84 Plus', 'TI-83 Plus', 'Casio fx-9750GIII'],
    bannedFeatures: ['TI-89', 'TI-Nspire CAS', 'Cell phones'],
    notes: 'Graphing calculators permitted; CAS models strictly forbidden by university council.',
  },
  {
    courseName: 'General Chemistry & Lab (CHEM 110)',
    department: 'Natural Sciences',
    allowedModels: ['Casio fx-991EX', 'TI-30X IIS', 'Scientific non-graphing'],
    bannedFeatures: ['Graphing displays', 'Text storage functions'],
    notes: 'Must not have stored formulas or editable text memories.',
  },
];

export const CalculatorCheckerModal: React.FC<CalculatorCheckerModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [selectedCourse, setSelectedCourse] = useState<string>(EXAM_RULES[0].courseName);
  const activeRule = EXAM_RULES.find((r) => r.courseName === selectedCourse) || EXAM_RULES[0];

  const calculatorsInStore = PRODUCTS.filter(
    (p) => p.subCategory?.includes('Calculator') || p.id.startsWith('calc')
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Campus Exam Calculator Approval Verification
              </h2>
              <p className="text-xs text-slate-500">
                Official University Senate Academic Regulations · Updated for 2026 Academic Term
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close calculator checker"
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Select Course / Department Exam */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-900 uppercase tracking-wider block">
              Select Your Examination or Course:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {EXAM_RULES.map((rule) => (
                <button
                  key={rule.courseName}
                  onClick={() => setSelectedCourse(rule.courseName)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedCourse === rule.courseName
                      ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                      : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="text-xs font-semibold">{rule.courseName}</div>
                  <div className={`text-[10px] mt-0.5 ${selectedCourse === rule.courseName ? 'text-slate-300' : 'text-slate-500'}`}>
                    {rule.department}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Policy Breakdown */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs uppercase font-semibold tracking-wider text-slate-500">
                  Exam Standards For:
                </span>
                <h3 className="text-base font-bold text-slate-900 font-display mt-0.5">
                  {activeRule.courseName}
                </h3>
              </div>
              <span className="text-xs font-medium bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                Official Senate Policy
              </span>
            </div>

            {/* Approved vs Banned list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <div className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Permitted Calculator Models:
                </div>
                <ul className="text-xs space-y-1.5 text-slate-700">
                  {activeRule.allowedModels.map((m, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-rose-800 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  Prohibited Features & Hardware:
                </div>
                <ul className="text-xs space-y-1.5 text-slate-700">
                  {activeRule.bannedFeatures.map((b, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200 mt-2">
              <span className="font-semibold text-slate-800">Exam Hall Marshall Rule: </span>
              {activeRule.notes}
            </div>
          </div>

          {/* Quick-buy approved calculators in our campus physical store */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Available in Physical Campus Store Right Now:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {calculatorsInStore.map((calc) => (
                <div
                  key={calc.id}
                  onClick={() => {
                    onClose();
                    onSelectProduct(calc);
                  }}
                  className="p-3 bg-white border border-slate-200 rounded-xl hover:border-slate-400 transition-all cursor-pointer flex flex-col justify-between space-y-2 shadow-2xs"
                >
                  <div>
                    <div className="text-xs font-semibold text-slate-900 line-clamp-2">
                      {calc.shortTitle}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      {calc.storeLocation}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                    <span className="font-mono tabular-nums font-bold text-xs text-slate-900">
                      ₹{calc.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] font-medium text-blue-600 hover:underline">
                      View Model →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
