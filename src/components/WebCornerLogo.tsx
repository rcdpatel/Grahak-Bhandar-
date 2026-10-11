import React, { useState } from 'react';
import { SESLogo } from './SESLogo';
import { ShieldCheck, X, ExternalLink, Award, CheckCircle2, ChevronUp, ChevronDown } from 'lucide-react';

export const WebCornerLogo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <>
      {/* Persistent Web Corner Seal (Fixed at bottom-left corner of the viewport) */}
      <div 
        className="fixed bottom-4 left-4 z-40 select-none print:hidden"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))' }}
      >
        {!isMinimized ? (
          <div className="flex items-center gap-2 bg-slate-900/95 hover:bg-slate-900 backdrop-blur-md text-white px-3 py-2 rounded-2xl border border-amber-500/40 shadow-xl transition-all group">
            {/* The Logo User Shared in the Web Corner */}
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2.5 cursor-pointer text-left focus:outline-hidden"
              title="Click to view Shirpur Education Society (SES) Accreditation"
            >
              <div className="relative shrink-0 transition-transform group-hover:scale-108 duration-200">
                <SESLogo size={34} />
              </div>

              <div className="flex flex-col pr-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold tracking-tight text-white font-display">
                    SES Shirpur
                  </span>
                  <span className="text-[9px] font-mono uppercase bg-amber-400 text-slate-950 font-extrabold px-1 py-0.2 rounded-xs">
                    Official
                  </span>
                </div>
                <span className="text-[9px] text-amber-300 font-medium tracking-wide">
                  ॥ सा विद्या या विमुक्तये ॥
                </span>
              </div>
            </button>

            {/* Quick action buttons */}
            <div className="flex items-center border-l border-slate-700/80 pl-1.5 ml-0.5 gap-1">
              <button
                onClick={() => setIsOpen(true)}
                className="text-[10px] text-slate-300 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="View accreditation info"
                title="View SES Seal Details"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              </button>
              <button
                onClick={() => setIsMinimized(true)}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Minimize corner seal"
                title="Minimize seal"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Minimized circular button in the corner */
          <button
            onClick={() => setIsMinimized(false)}
            className="w-11 h-11 rounded-full bg-slate-900/95 hover:bg-slate-900 backdrop-blur-md border-2 border-amber-500/50 flex items-center justify-center text-white shadow-xl hover:scale-110 transition-all cursor-pointer group"
            title="Expand SES Campus Store Seal"
          >
            <SESLogo size={28} />
          </button>
        )}
      </div>

      {/* Accreditation Modal / Info Dialog when clicked */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Heraldic Theme */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 p-6 text-white text-center relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-block p-3 bg-white/10 rounded-2xl backdrop-blur-xs border border-amber-400/30 mb-3">
                <SESLogo size={72} />
              </div>

              <h3 className="text-xl font-bold font-display tracking-tight text-white">
                Shirpur Education Society (SES)
              </h3>
              <p className="text-amber-300 font-serif text-sm italic mt-0.5">
                ॥ सा विद्या या विमुक्तये ॥
              </p>
              <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30 text-[11px] font-mono">
                <Award className="w-3 h-3 text-amber-400" />
                Accredited Campus Cooperative Store
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 space-y-4 text-slate-700 text-sm">
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500 mb-1">
                  About Grahak Bhandar
                </h4>
                <p className="text-xs leading-relaxed text-slate-600">
                  Grahak Bhandar is the official non-profit campus cooperative store operating under the auspices of <strong>Shirpur Education Society</strong>. It provides authentic departmental uniform t-shirts, varsity jackets, approved Casio scientific calculators, lab coats, and academic gear at subsidized, student-friendly rates.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Serving All SES Institutes in Shirpur</span>
                </div>
                <ul className="text-slate-600 space-y-1 pl-6 list-disc">
                  <li>R. C. Patel Institute of Technology (RCPIT - Autonomous)</li>
                  <li>R. C. Patel Institute of Pharmaceutical Education (RCOP)</li>
                  <li>Institute of Management Research & Development (IMRD)</li>
                  <li>SES Polytechnics and Affiliated Colleges</li>
                </ul>
              </div>

              <div className="text-xs text-slate-500 border-t border-slate-100 pt-3 flex items-center justify-between">
                <span>Physical Store: Room 104, Student Center</span>
                <span className="font-semibold text-amber-800">Direct SES Trust Initiative</span>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
              >
                Close & Return to Store
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
