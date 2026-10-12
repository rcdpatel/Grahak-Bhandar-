import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../types/store';
import { PRODUCTS } from '../data/products';

interface CalculatorCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (p: Product) => void;
}

interface UniformRule {
  collegeName: string;
  courseTitle: string;
  mandatoryDays: string;
  prescribedShirt: string;
  prescribedTrouser: string;
  accessoriesRequired: string[];
  productId: string;
  notes: string;
}

const UNIFORM_RULES: UniformRule[] = [
  {
    collegeName: 'IMRD College',
    courseTitle: 'IMRD College BCA Uniform (Bachelor of Computer Applications)',
    mandatoryDays: 'Monday, Tuesday, Thursday, Friday',
    prescribedShirt: 'Tailored Sky Blue Pin-striped Formal Shirt with Embroidered SES IMRD Pocket Crest',
    prescribedTrouser: 'Crease-Resistant Dark Charcoal Grey Formal Suiting Trousers',
    accessoriesRequired: ['SES IMRD Woven College Tie', 'SES Campus ID Lanyard', 'Black Formal Leather Shoes'],
    productId: 'imrd-bca-uniform',
    notes: 'Mandatory for all 1st, 2nd, and 3rd year BCA classroom sessions, lab practicals, and internal unit tests.',
  },
  {
    collegeName: 'IMRD College',
    courseTitle: 'IMRD College MCA Executive Uniform (Master of Computer Applications)',
    mandatoryDays: 'All Academic Seminars, Corporate Presentations & Campus Placement Drives',
    prescribedShirt: 'Executive Royal Oxford Blue Formal Shirt with Gold & Blue SES IMRD Monogram',
    prescribedTrouser: 'Tailored Midnight Navy Terry-Rayon Formal Suiting Trousers',
    accessoriesRequired: ['Corporate Placement Tie', 'Official SES RFID Badge Lanyard', 'Formal Black Shoes'],
    productId: 'imrd-mca-uniform',
    notes: 'Required for campus interviews, corporate HR guest lectures, project vivas, and formal university events.',
  },
  {
    collegeName: 'RCPACS College',
    courseTitle: 'RCPACS College BCA Official Uniform (Computer Applications)',
    mandatoryDays: 'Monday, Wednesday & Friday',
    prescribedShirt: 'Crisp Light Sky Blue Collared Formal Shirt with Official RCPACS Pocket Crest',
    prescribedTrouser: 'Comfort-Stretch Poly-Viscose Formal Charcoal Grey Trousers',
    accessoriesRequired: ['Navy Formal College Tie', 'RCPACS Student ID Lanyard', 'Formal Shoes'],
    productId: 'rcpacs-bca-uniform',
    notes: 'Strictly inspected at college main gate and department entry by the faculty discipline committee.',
  },
  {
    collegeName: 'RCPACS College',
    courseTitle: 'RCPACS College BSc Faculty of Science T-Shirt & Lab Apron',
    mandatoryDays: 'Department Practical Days, Field Studies & Science Exhibitions',
    prescribedShirt: 'Official RCPACS BSc Science Department Cotton T-Shirt ("॥ सा विद्या या विमुक्तये ॥")',
    prescribedTrouser: 'Dark Blue / Black Jeans or Formal Trousers',
    accessoriesRequired: ['Pure White Cotton Laboratory Apron (Mandatory for Chemistry/Bio Labs)', 'SES Campus ID Card'],
    productId: 'tee-rcpacs-bsc',
    notes: 'White lab coat is mandatory for all chemistry, botany, and zoology lab sessions. T-shirt allowed for lab practicals.',
  },
  {
    collegeName: 'RC Patel Polytechnic',
    courseTitle: 'RC Patel Polytechnic Workshop Uniform & Technical T-Shirt',
    mandatoryDays: 'All Mechanical, Civil & Electrical Workshop Sessions',
    prescribedShirt: 'Heavy Industrial Navy Drill Boiler Suit / Workshop Drill Uniform with SES Polytechnic Badge',
    prescribedTrouser: 'Reinforced Navy Drill Workshop Trousers with Tool Pockets',
    accessoriesRequired: ['Polytechnic Diploma Technical T-Shirt (Lab Days)', 'Safety Shoes', 'SES ID Lanyard'],
    productId: 'polytechnic-workshop-uniform',
    notes: 'Flame-retardant drill uniform is an MSBTE mandatory requirement for machine shop, welding, turning, and carpentry practicals.',
  },
  {
    collegeName: 'RCPIT College',
    courseTitle: 'RCPIT College Official Engineering Uniform & Varsity Tee',
    mandatoryDays: 'Formal Presentations, Viva Voce & Designated Engineering Days',
    prescribedShirt: 'Tailored Steel Blue Fine-Cotton Shirt with RCPIT Gold Thread Monogram',
    prescribedTrouser: 'Pleated Dark Charcoal Suiting Trousers with College Logo Buttons',
    accessoriesRequired: ['RCPIT Engineering Crest T-Shirt (Lab & Fest Days)', 'White Lab Apron (Physics/Chem Labs)', 'SES ID Card'],
    productId: 'rcpit-engineering-uniform',
    notes: 'Formal uniform mandatory for major project vivas and campus drives; RCPIT Engineering tee worn on lab days.',
  },
  {
    collegeName: 'All Colleges Generals',
    courseTitle: 'SES Universal Pure White Cotton Laboratory Apron',
    mandatoryDays: 'Every Practical Session in Chemistry, Physics, Biology & Pharmacy Labs',
    prescribedShirt: '100% Sanitized Pure White Cotton Drill Lab Coat with Embroidered SES Golden Crest',
    prescribedTrouser: 'Standard College Uniform / Formal Trousers',
    accessoriesRequired: ['SES Campus ID Lanyard', 'Protective Eyewear (if handling acids)'],
    productId: 'lab-allcolleges-apron',
    notes: 'Prescribed standard lab apron across all SES campus colleges (IMRD, RCPACS, Polytechnic, RCPIT, RCPIPER).',
  },
];

export const CalculatorCheckerModal: React.FC<CalculatorCheckerModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [selectedCourse, setSelectedCourse] = useState<string>(UNIFORM_RULES[0].courseTitle);
  const activeRule = UNIFORM_RULES.find((r) => r.courseTitle === selectedCourse) || UNIFORM_RULES[0];
  const matchingProduct = PRODUCTS.find((p) => p.id === activeRule.productId);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Official Campus Uniform & Dress Code Guide
              </h2>
              <p className="text-xs text-slate-500">
                Prescribed Uniform Specifications · IMRD, RCPACS, Polytechnic, RCPIT & All SES Colleges
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close uniform guide"
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Select College / Course */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-900 uppercase tracking-wider block">
              Select Your College & Department:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {UNIFORM_RULES.map((rule) => (
                <button
                  key={rule.courseTitle}
                  onClick={() => setSelectedCourse(rule.courseTitle)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedCourse === rule.courseTitle
                      ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                      : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="text-xs font-semibold">{rule.collegeName}</div>
                  <div className={`text-[11px] mt-0.5 line-clamp-1 ${selectedCourse === rule.courseTitle ? 'text-slate-300' : 'text-slate-600'}`}>
                    {rule.courseTitle}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Specification Card */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {activeRule.collegeName} Official Dress Code
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {activeRule.courseTitle}
                </h3>
              </div>
              <div className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 shrink-0 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>University Approved</span>
              </div>
            </div>

            {/* Schedule */}
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-700">Mandatory Dress Code Schedule:</span>
              <p className="text-xs text-slate-900 bg-white p-2.5 rounded-lg border border-slate-200 font-medium">
                📅 {activeRule.mandatoryDays}
              </p>
            </div>

            {/* Prescribed Specifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Prescribed Shirt / Top:
                </span>
                <p className="text-xs text-slate-900 font-medium">
                  {activeRule.prescribedShirt}
                </p>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Prescribed Trousers / Bottom:
                </span>
                <p className="text-xs text-slate-900 font-medium">
                  {activeRule.prescribedTrouser}
                </p>
              </div>
            </div>

            {/* Accessories */}
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-700">Required Accessories & Inspection Items:</span>
              <div className="flex flex-wrap gap-2">
                {activeRule.accessoriesRequired.map((acc, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-white text-slate-700 px-2.5 py-1 rounded-md border border-slate-200 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{acc}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-amber-50/80 border border-amber-200/80 rounded-lg p-3 text-xs text-amber-900">
              <span className="font-semibold block mb-0.5">Campus Regulations:</span>
              <p>{activeRule.notes}</p>
            </div>
          </div>

          {/* Link to Buy Matching Item in Store */}
          {matchingProduct && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-900 text-white rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-800 shrink-0">
                  <img
                    src={matchingProduct.image}
                    alt={matchingProduct.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Available at Grahak Bhandar Counter:</div>
                  <div className="text-sm font-bold text-white line-clamp-1">{matchingProduct.title}</div>
                  <div className="text-xs font-mono text-amber-400 font-semibold">
                    ₹{matchingProduct.price.toLocaleString('en-IN')} (Subsidized Student Rate)
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectProduct(matchingProduct);
                  onClose();
                }}
                className="w-full sm:w-auto px-4 py-2.5 bg-white text-slate-900 hover:bg-slate-100 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>View & Select Size</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
