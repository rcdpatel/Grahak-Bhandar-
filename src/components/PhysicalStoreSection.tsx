import React from 'react';
import { MapPin, Clock, Phone, Shield, ArrowRight, Store, CheckCircle } from 'lucide-react';
import { PHYSICAL_STORE_INFO } from '../data/products';

export const PhysicalStoreSection: React.FC = () => {
  const aisles = [
    { aisle: 'Aisle 1', name: 'IMRD & RCPACS College Uniforms', desc: 'IMRD BCA & MCA tailored uniform sets, RCPACS BCA shirts, formal trousers & ties' },
    { aisle: 'Aisle 2', name: 'Polytechnic & RCPIT Engineering', desc: 'RC Patel Polytechnic workshop uniforms, RCPIT Engineering varsity tees & apparel' },
    { aisle: 'Aisle 3', name: 'SES Central Heritage & Varsity', desc: 'SES All Colleges Gold-Seal heritage tees, 380 GSM heavyweight fleece winter hoodies' },
    { aisle: 'Aisle 4', name: 'Practical Lab Aprons & Campus Gear', desc: '100% white cotton SES embroidered lab coats, RFID campus lanyards, student backpacks' },
  ];

  return (
    <section className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">
              Campus Ground Presence
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Visit The Physical Campus Store
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Located in the heart of campus. Reserve items online for zero-wait express pickup or browse in person during lecture breaks.
            </p>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Store className="w-4 h-4 text-slate-700" />
            <span>Student Activity Center · Ground Level</span>
          </div>
        </div>

        {/* 2-Column Physical Store Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Aisle Directory Grid */}
          <div className="lg:col-span-7 bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-display uppercase tracking-wider">
              Store Layout & Shelf Directory
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {aisles.map((a) => (
                <div key={a.aisle} className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded">
                      {a.aisle}
                    </span>
                    <span className="text-[11px] text-emerald-700 font-medium">In Stock</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-900">{a.name}</div>
                  <div className="text-[11px] text-slate-500 leading-relaxed">{a.desc}</div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-xs text-slate-600 flex items-center justify-between border-t border-slate-200">
              <span>Express Desks 1 & 2 handle all web pickup orders.</span>
              <span className="font-semibold text-slate-900">Average Handover: &lt; 90 seconds</span>
            </div>
          </div>

          {/* Right: Operational Info Card */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 sm:p-7 space-y-5">
            <div className="space-y-1">
              <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                Store Operations
              </span>
              <h3 className="text-xl font-bold font-display">
                Hours & Pickup Windows
              </h3>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Physical Counter Hours:</div>
                  <div>Monday – Friday: 8:30 AM – 6:30 PM</div>
                  <div>Saturday: 10:00 AM – 4:00 PM (Closed Sundays)</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Campus Location:</div>
                  <div>Student Activity Center (Building B), Room 104</div>
                  <div className="text-slate-400 text-[11px]">Directly across from Central Dining Commons</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Shield className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Student Price Guarantee:</div>
                  <div>Valid student ID earns 10% off all apparel, sets, and tech accessories.</div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 text-xs text-slate-400">
              Need bulk order for a student club or faculty event? Email <span className="text-white">grahakbhandar@ses.ac.in</span> or visit Room 104 Counter.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
