import React, { useState } from 'react';
import { CheckCircle2, QrCode, Printer, MapPin, Clock, ArrowRight, Share2, Ticket, Check } from 'lucide-react';
import { PickupOrder } from '../types/store';
import { StoreLogo } from './StoreLogo';

interface OrderSuccessModalProps {
  order: PickupOrder | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
}) => {
  if (!order) return null;

  const [copiedToken, setCopiedToken] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(order.orderNumber);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-lg w-full max-h-[94vh] overflow-y-auto shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pass Top Banner */}
        <div className="bg-slate-900 text-white p-6 rounded-t-2xl text-center space-y-2 relative">
          <div className="flex items-center justify-center gap-3 mb-2">
            <StoreLogo size={52} />
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold font-mono">
            SES Grahak Bhandar · Official Digital Pickup Pass
          </span>
          <h2 className="text-2xl font-black font-display tracking-tight">
            Order #{order.orderNumber}
          </h2>
          <p className="text-xs text-slate-300">
            Room 104 Express Desk · Show this screen or scan barcode
          </p>
        </div>

        {/* Pass Body */}
        <div className="p-6 space-y-5">
          
          {/* Simulated QR & Barcode Section */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center space-y-3">
            <div className="flex items-center justify-center gap-4">
              {/* Simulated QR Code Graphic */}
              <div className="w-24 h-24 bg-white p-2 rounded-lg border border-slate-300 shadow-2xs flex flex-col items-center justify-center">
                <QrCode className="w-20 h-20 text-slate-900" />
              </div>

              {/* Simulated Barcode */}
              <div className="text-left space-y-1">
                <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                  Pickup Barcode Token
                </div>
                <div className="font-mono text-lg font-black tracking-widest text-slate-900">
                  {order.orderNumber}-SCAN
                </div>
                <div className="text-[11px] text-slate-600">
                  {order.pickupTimeSlot}
                </div>
                <button
                  onClick={handleCopyCode}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 cursor-pointer"
                >
                  {copiedToken ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Code Copied!</span>
                    </>
                  ) : (
                    <span>Copy Token Code</span>
                  )}
                </button>
              </div>
            </div>

            {/* Stylized Barcode Stripes */}
            <div className="h-7 w-full flex items-stretch justify-between gap-[2px] opacity-80 px-2 pt-1">
              {[2, 4, 1, 3, 5, 2, 1, 4, 2, 3, 1, 5, 2, 4, 1, 3, 2, 5, 1, 4, 2, 3, 1, 4, 2, 5].map((w, i) => (
                <div
                  key={i}
                  className="bg-slate-900"
                  style={{ width: `${w * 2.5}px` }}
                />
              ))}
            </div>
          </div>

          {/* Location & Instructions Card */}
          <div className="space-y-2.5 text-xs text-slate-700">
            <div className="flex items-start gap-2.5 p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl">
              <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-amber-950 block">Pickup Counter Location:</span>
                <span className="text-amber-900">{order.pickupLocation}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-slate-600">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 block">Student:</span>
                <span className="font-semibold text-slate-900">{order.customerName}</span>
                <span className="text-[11px] font-mono block text-slate-500">{order.studentId}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 block">Payment Method:</span>
                <span className="font-semibold text-slate-900">{order.paymentMethod}</span>
              </div>
            </div>
          </div>

          {/* Itemized list in this order */}
          <div className="border-t border-slate-200 pt-3 space-y-2 text-xs">
            <div className="font-semibold text-slate-900 uppercase tracking-wider flex justify-between">
              <span>Items Packed ({order.items.length})</span>
              <span className="font-mono tabular-nums font-bold">₹{Math.round(order.total).toLocaleString('en-IN')}</span>
            </div>
            <div className="space-y-1 text-slate-600 max-h-24 overflow-y-auto pr-1">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <span className="truncate max-w-[240px]">
                    {item.quantity}x {item.title}
                    {item.selectedSize ? ` (${item.selectedSize})` : ''}
                  </span>
                  <span className="font-mono tabular-nums text-slate-900">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-2">
            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save Pass</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[11px] text-slate-400 text-center">
              SMS confirmation sent to {order.phoneNumber}. We hold items for 48 hours.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
