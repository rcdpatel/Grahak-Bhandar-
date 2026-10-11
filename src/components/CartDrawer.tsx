import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, MapPin, Clock, ShieldCheck, Ticket } from 'lucide-react';
import { CartItem } from '../types/store';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: (pickupLocation: string, discountAmount: number) => void;
  hasStudentDiscount: boolean;
  onApplyStudentCode: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  hasStudentDiscount,
  onApplyStudentCode,
}) => {
  if (!isOpen) return null;

  const [studentCodeInput, setStudentCodeInput] = useState('');
  const [discountError, setDiscountError] = useState('');
  const [pickupOption, setPickupOption] = useState<'express-desk' | 'smart-lockers'>('express-desk');

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = hasStudentDiscount ? subtotal * 0.1 : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentCodeInput.trim()) return;
    const ok = onApplyStudentCode(studentCodeInput.trim());
    if (!ok) {
      setDiscountError('Use promo code CAMPUS10 or your Student ID format (e.g. STU-...)');
    } else {
      setDiscountError('');
      setStudentCodeInput('');
    }
  };

  const selectedLocationText =
    pickupOption === 'express-desk'
      ? 'Express Pickup Desk (Student Activity Center, Room 104)'
      : '24/7 Smart Campus Lockers (Quad East Walkway)';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-slate-900" />
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Campus Pickup Bag
            </h2>
            <span className="font-mono tabular-nums text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
              {items.reduce((acc, i) => acc + i.quantity, 0)} items
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-slate-900 font-display">
                  Your campus bag is empty
                </h3>
                <p className="text-xs text-slate-500 max-w-xs">
                  Browse department varsity t-shirts, exam-ready calculators, and lab gear from our physical campus store.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors cursor-pointer"
              >
                Start Browsing
              </button>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="divide-y divide-slate-100 space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex gap-3 items-start">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-slate-900 line-clamp-2 leading-tight">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          aria-label="Remove item"
                          className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant tags */}
                      <div className="text-[11px] text-slate-500 flex flex-wrap gap-x-2">
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                        {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                        {item.customization?.customText && (
                          <span className="text-amber-800 font-medium">
                            Back: "{item.customization.customText}" ('{item.customization.gradYear?.slice(-2)})
                          </span>
                        )}
                      </div>

                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5" />
                        <span>Shelf: {item.storeLocation}</span>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        {/* Stepper */}
                        <div className="flex items-center border border-slate-200 rounded-md overflow-hidden bg-slate-50 text-xs">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-0.5 hover:bg-slate-200 text-slate-700 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 font-mono tabular-nums font-semibold text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-0.5 hover:bg-slate-200 text-slate-700 cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <div className="font-mono tabular-nums text-xs font-bold text-slate-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pickup Mode Selection */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="text-xs font-semibold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  Select Campus Pickup Method
                </div>

                <div className="space-y-1.5 text-xs">
                  <label
                    onClick={() => setPickupOption('express-desk')}
                    className={`flex items-start gap-2.5 p-2 rounded-lg border transition-all cursor-pointer ${
                      pickupOption === 'express-desk'
                        ? 'border-slate-900 bg-white shadow-2xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="pickupOption"
                      checked={pickupOption === 'express-desk'}
                      onChange={() => setPickupOption('express-desk')}
                      className="mt-0.5 cursor-pointer"
                    />
                    <div>
                      <div className="font-semibold text-slate-900">Physical Express Desk (Room 104)</div>
                      <div className="text-[11px] text-slate-500">Student Center Ground Floor · Ready in ~20 mins</div>
                    </div>
                  </label>

                  <label
                    onClick={() => setPickupOption('smart-lockers')}
                    className={`flex items-start gap-2.5 p-2 rounded-lg border transition-all cursor-pointer ${
                      pickupOption === 'smart-lockers'
                        ? 'border-slate-900 bg-white shadow-2xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="pickupOption"
                      checked={pickupOption === 'smart-lockers'}
                      onChange={() => setPickupOption('smart-lockers')}
                      className="mt-0.5 cursor-pointer"
                    />
                    <div>
                      <div className="font-semibold text-slate-900">24/7 Smart Lockers (Quad East)</div>
                      <div className="text-[11px] text-slate-500">Self-service barcode pin locker · 24/7 pickup</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Student Discount Promo Input */}
              <div className="space-y-1.5">
                <form onSubmit={handleApplyCode} className="flex gap-2">
                  <div className="relative flex-1">
                    <Ticket className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Student ID or 'CAMPUS10'"
                      value={studentCodeInput}
                      onChange={(e) => setStudentCodeInput(e.target.value)}
                      className="w-full pl-8.5 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 uppercase focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
                {discountError && (
                  <p className="text-[11px] text-rose-600">{discountError}</p>
                )}
                {hasStudentDiscount && (
                  <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Student 10% Discount applied to your order!
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer / Summary Strip */}
        {items.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({items.length} items):</span>
                <span className="font-mono tabular-nums text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              {hasStudentDiscount && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Student Discount (10%):</span>
                  <span className="font-mono tabular-nums">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Campus Store Pickup Handling:</span>
                <span className="text-emerald-700 font-medium">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-1.5 border-t border-slate-200">
                <span>Total Amount:</span>
                <span className="font-mono tabular-nums text-base">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => onProceedToCheckout(selectedLocationText, discountAmount)}
              className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
            >
              <span>Schedule Campus Pickup</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Instant Digital Pickup Token issued upon order confirmation</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
