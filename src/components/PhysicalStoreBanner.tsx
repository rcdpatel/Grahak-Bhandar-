import React from 'react';
import { MapPin, Clock, ShieldCheck, Ticket, Shield } from 'lucide-react';
import { PHYSICAL_STORE_INFO } from '../data/products';

interface PhysicalStoreBannerProps {
  onOpenCalcChecker: () => void;
  onApplyStudentCode: () => void;
  hasStudentDiscount: boolean;
  onOpenAdminPanel: () => void;
}

export const PhysicalStoreBanner: React.FC<PhysicalStoreBannerProps> = ({
  onOpenCalcChecker,
  onApplyStudentCode,
  hasStudentDiscount,
  onOpenAdminPanel,
}) => {
  return (
    <div className="bg-slate-950 text-slate-200 text-xs py-2.5 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-slate-300">
          <span className="flex items-center gap-1.5 font-semibold text-amber-300">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            Grahak Bhandar Campus Store · Room 104 (Student Center)
          </span>
          <span aria-hidden="true" className="text-slate-600 hidden md:inline">·</span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            Express Pickups Ready in 20 Mins (Mon–Sat 8:30 AM–6:30 PM)
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onApplyStudentCode}
            className="flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors cursor-pointer"
          >
            <Ticket className="w-3.5 h-3.5 text-amber-400" />
            <span>{hasStudentDiscount ? 'Student 10% Discount Active' : 'Enter Student ID for 10% Off'}</span>
          </button>
          <span aria-hidden="true" className="text-slate-600 hidden sm:inline">·</span>
          <button
            onClick={onOpenAdminPanel}
            className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Shield className="w-3 h-3" />
            <span>Store Admin</span>
          </button>
        </div>
      </div>
    </div>
  );
};
