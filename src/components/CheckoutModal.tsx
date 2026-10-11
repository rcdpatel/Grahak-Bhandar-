import React, { useState } from 'react';
import { X, CheckCircle2, MapPin, Clock, CreditCard, ShieldCheck, Ticket } from 'lucide-react';
import { CartItem, PickupOrder } from '../types/store';
import { StoreLogo } from './StoreLogo';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  pickupLocation: string;
  onOrderComplete: (order: PickupOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  pickupLocation,
  onOrderComplete,
}) => {
  if (!isOpen) return null;

  const [studentName, setStudentName] = useState('Alex Rivers');
  const [studentId, setStudentId] = useState('STU-2024-5821');
  const [phone, setPhone] = useState('+1 (555) 349-2190');
  const [pickupSlot, setPickupSlot] = useState('Today: 2:00 PM – 3:30 PM (Express Counter)');
  const [paymentMode, setPaymentMode] = useState<string>('desk-pay');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = Math.max(0, subtotal - discount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const randomOrderNum = Math.floor(1000 + Math.random() * 9000);
      const randomCode = `QD-${randomOrderNum}`;

      const newOrder: PickupOrder = {
        orderNumber: randomCode,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        customerName: studentName,
        studentId: studentId,
        phoneNumber: phone,
        pickupLocation: pickupLocation,
        pickupTimeSlot: pickupSlot,
        items: items,
        subtotal: subtotal,
        discount: discount,
        total: total,
        paymentMethod:
          paymentMode === 'desk-pay'
            ? 'Pay in Person at Physical Counter (Room 104)'
            : paymentMode === 'student-card'
            ? 'Campus Student Card Account (Direct Charge)'
            : 'Credit / Debit Card (Online)',
        pickupCode: randomCode,
        status: 'Ready for Pickup',
        createdAt: new Date().toISOString(),
      };

      setIsSubmitting(false);
      onOrderComplete(newOrder);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Store Logo */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <StoreLogo size={42} />
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Campus Store Pickup Checkout
              </h2>
              <p className="text-xs text-slate-500">
                Grahak Bhandar · Student Activity Center Room 104 · No shipping fee
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close checkout"
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Pickup Location Reminder */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-slate-900">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              Designated Pickup Counter:
            </div>
            <div className="text-slate-700 font-medium pl-5">
              {pickupLocation}
            </div>
          </div>

          {/* Student Info Fields */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
              1. Student Pickup Credentials
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-600 block mb-1">Full Student Name *</label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="text-xs text-slate-600 block mb-1">Student Campus ID *</label>
                <input
                  type="text"
                  required
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="text-xs text-slate-600 block mb-1">Mobile Phone (SMS Ready Alert) *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="text-xs text-slate-600 block mb-1">Estimated Pickup Time Slot *</label>
                <select
                  value={pickupSlot}
                  onChange={(e) => setPickupSlot(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-slate-900 cursor-pointer"
                >
                  <option value="Today: 1:00 PM – 2:30 PM (Express Counter)">Today: 1:00 PM – 2:30 PM (Express Counter)</option>
                  <option value="Today: 2:30 PM – 4:00 PM (Express Counter)">Today: 2:30 PM – 4:00 PM (Express Counter)</option>
                  <option value="Today: 4:00 PM – 6:00 PM (Express Counter)">Today: 4:00 PM – 6:00 PM (Express Counter)</option>
                  <option value="Tomorrow: 9:00 AM – 11:30 AM (Express Counter)">Tomorrow: 9:00 AM – 11:30 AM</option>
                  <option value="24/7 Smart Locker: Pick up anytime with PIN">24/7 Smart Locker: Pick up anytime with PIN</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
              2. Preferred Payment Method
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <label
                onClick={() => setPaymentMode('desk-pay')}
                className={`p-3 rounded-xl border flex flex-col justify-between text-xs transition-all cursor-pointer ${
                  paymentMode === 'desk-pay'
                    ? 'border-slate-900 bg-slate-50 font-semibold text-slate-900'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <div className="space-y-1">
                  <div className="font-semibold text-slate-900">Pay at Desk</div>
                  <div className="text-[11px] text-slate-500 font-normal">Cash, Card, or UPI at Room 104 Counter</div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMode === 'desk-pay'}
                  onChange={() => setPaymentMode('desk-pay')}
                  className="mt-2"
                />
              </label>

              <label
                onClick={() => setPaymentMode('student-card')}
                className={`p-3 rounded-xl border flex flex-col justify-between text-xs transition-all cursor-pointer ${
                  paymentMode === 'student-card'
                    ? 'border-slate-900 bg-slate-50 font-semibold text-slate-900'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <div className="space-y-1">
                  <div className="font-semibold text-slate-900">Campus ID Card</div>
                  <div className="text-[11px] text-slate-500 font-normal">Direct Student Union Account Debit</div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMode === 'student-card'}
                  onChange={() => setPaymentMode('student-card')}
                  className="mt-2"
                />
              </label>

              <label
                onClick={() => setPaymentMode('card-online')}
                className={`p-3 rounded-xl border flex flex-col justify-between text-xs transition-all cursor-pointer ${
                  paymentMode === 'card-online'
                    ? 'border-slate-900 bg-slate-50 font-semibold text-slate-900'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <div className="space-y-1">
                  <div className="font-semibold text-slate-900">UPI / GPay / Card</div>
                  <div className="text-[11px] text-slate-500 font-normal">Pre-pay via UPI QR or Card</div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMode === 'card-online'}
                  onChange={() => setPaymentMode('card-online')}
                  className="mt-2"
                />
              </label>
            </div>
          </div>

          {/* Order Itemized Summary */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
            <div className="font-semibold text-slate-900 uppercase tracking-wider">
              Order Receipt Summary ({items.length} items)
            </div>
            <div className="space-y-1 max-h-28 overflow-y-auto pr-1">
              {items.map((i) => (
                <div key={i.id} className="flex justify-between text-slate-600">
                  <span className="truncate max-w-[220px]">
                    {i.quantity}x {i.title}
                  </span>
                  <span className="font-mono tabular-nums text-slate-900">
                    ₹{(i.price * i.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-slate-200 space-y-1">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal:</span>
                <span className="font-mono tabular-nums">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Student 10% Discount:</span>
                  <span className="font-mono tabular-nums">-₹{Math.round(discount).toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-1 border-t border-slate-200">
                <span>Total Due:</span>
                <span className="font-mono tabular-nums text-base">₹{Math.round(total).toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="space-y-2 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
            >
              {isSubmitting ? (
                <span>Generating Digital Pickup Pass...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Confirm Order & Issue Digital Pickup Pass</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-slate-500 text-center">
              Items will be packed from physical racks (Aisles 1–4) within 20 minutes.
            </p>
          </div>

        </form>
      </div>
    </div>
  );
};
