import React, { useState } from 'react';
import { X, Sparkles, Check, ShoppingBag, RotateCcw } from 'lucide-react';
import { Product, SchoolDepartment } from '../types/store';
import { SCHOOLS, PRODUCTS } from '../data/products';
import { StoreLogo } from './StoreLogo';

interface TShirtCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: Product | null;
  onAddToCart: (customizedProduct: Product, size: string, color: string, qty: number, customData: { customText: string; gradYear: string }) => void;
}

export const TShirtCustomizerModal: React.FC<TShirtCustomizerModalProps> = ({
  isOpen,
  onClose,
  initialProduct,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const [selectedSchoolId, setSelectedSchoolId] = useState<SchoolDepartment>(
    initialProduct?.school || 'engineering'
  );
  const [viewSide, setViewSide] = useState<'front' | 'back'>('front');
  const [tshirtColor, setTshirtColor] = useState<{ name: string; hex: string; textDark: boolean }>({
    name: 'Midnight Navy',
    hex: '#1e293b',
    textDark: false,
  });
  const [customText, setCustomText] = useState('STUDENT NAME');
  const [gradYear, setGradYear] = useState('2026');
  const [selectedSize, setSelectedSize] = useState('L');
  const [added, setAdded] = useState(false);

  const currentSchool = SCHOOLS.find((s) => s.id === selectedSchoolId) || SCHOOLS[0];

  const colorPalette = [
    { name: 'Midnight Navy', hex: '#1e293b', textDark: false },
    { name: 'Athletic Grey', hex: '#94a3b8', textDark: true },
    { name: 'Varsity Maroon', hex: '#881337', textDark: false },
    { name: 'Forest Evergreen', hex: '#064e3b', textDark: false },
    { name: 'Pure Chalk White', hex: '#f8fafc', textDark: true },
    { name: 'Charcoal Asphalt', hex: '#334155', textDark: false },
  ];

  const handleFinishCustomization = () => {
    // Find matching base product or fallback to varsity tee
    const baseTee = PRODUCTS.find(
      (p) => p.category === 't-shirts' && p.school === selectedSchoolId
    ) || PRODUCTS[0];

    const customizedProduct: Product = {
      ...baseTee,
      id: `${baseTee.id}-custom-${Date.now()}`,
      title: `${currentSchool.shortName} Custom Printed Varsity Tee`,
      price: baseTee.price + 50, // ₹50 custom print fee
      badge: 'Custom Printed',
      description: `Personalized department tee featuring ${currentSchool.name}. Custom back print: "${customText.toUpperCase()}" with Year "${gradYear}".`,
    };

    onAddToCart(customizedProduct, selectedSize, tshirtColor.name, 1, {
      customText: customText.toUpperCase(),
      gradYear,
    });

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[94vh] overflow-y-auto shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Campus Department Tee Studio
              </h2>
              <p className="text-xs text-slate-500">
                Live preview: Pick department emblem, custom back lettering & graduation year
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close customizer"
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          
          {/* Left: Interactive Live Mockup Canvas */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col items-center justify-center bg-slate-100/70">
            {/* View toggle (Front / Back) */}
            <div className="flex items-center gap-1 p-1 bg-white rounded-lg border border-slate-200 mb-6 shadow-xs">
              <button
                onClick={() => setViewSide('front')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  viewSide === 'front' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Front View (Emblem)
              </button>
              <button
                onClick={() => setViewSide('back')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  viewSide === 'back' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Back View (Custom Text)
              </button>
            </div>

            {/* Stylized T-Shirt Mockup Canvas */}
            <div className="relative w-64 sm:w-72 aspect-4/5 flex items-center justify-center">
              {/* T-Shirt Silhouette Container */}
              <div
                className="w-full h-full rounded-3xl relative shadow-xl border border-black/10 transition-colors duration-300 flex flex-col items-center justify-center p-6 text-center select-none"
                style={{ backgroundColor: tshirtColor.hex }}
              >
                {/* Collar Ribbing simulation */}
                <div
                  className="absolute top-2 w-24 h-7 rounded-b-full border-b-2 border-black/20"
                  style={{ backgroundColor: tshirtColor.hex }}
                />

                {/* FRONT VIEW CONTENT */}
                {viewSide === 'front' ? (
                  <div className={`space-y-2.5 px-4 ${tshirtColor.textDark ? 'text-slate-900' : 'text-white'}`}>
                    <div className="text-[10px] uppercase font-mono tracking-widest opacity-80">
                      SHIRPUR EDUCATION SOCIETY (SES)
                    </div>
                    
                    {/* Arched or Bold Varsity Department Title */}
                    <div className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight leading-tight">
                      {currentSchool.shortName}
                    </div>

                    {/* Department Crest / Seal */}
                    <div className="flex justify-center my-1.5">
                      <div className="p-1 rounded-full bg-white/10 backdrop-blur-xs border border-current">
                        <StoreLogo size={42} showBadge={false} />
                      </div>
                    </div>

                    <div className="text-[11px] font-medium tracking-wide opacity-85">
                      {currentSchool.motto}
                    </div>
                  </div>
                ) : (
                  /* BACK VIEW CONTENT */
                  <div className={`space-y-4 px-3 w-full ${tshirtColor.textDark ? 'text-slate-900' : 'text-white'}`}>
                    {/* Custom Student Name */}
                    <div className="text-xl sm:text-2xl font-black font-display tracking-widest uppercase border-b-2 border-current pb-2">
                      {customText.trim() || 'YOUR NAME'}
                    </div>

                    {/* Graduation Number */}
                    <div className="text-5xl font-extrabold font-mono tabular-nums tracking-tighter">
                      {gradYear.slice(-2)}
                    </div>

                    <div className="text-xs uppercase font-semibold tracking-wider opacity-90">
                      CLASS OF {gradYear}
                    </div>

                    <div className="text-[10px] opacity-75 font-mono">
                      {currentSchool.shortName.toUpperCase()}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mt-4 text-center">
              Printed on 240 GSM organic ring-spun cotton at the Campus Print Center.
            </p>
          </div>

          {/* Right: Controls & Options */}
          <div className="lg:col-span-6 p-6 sm:p-8 space-y-6">
            
            {/* 1. School / Faculty Selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-900 uppercase tracking-wider block">
                1. Select College Department
              </label>
              <div className="grid grid-cols-2 gap-2">
                {SCHOOLS.map((school) => (
                  <button
                    key={school.id}
                    onClick={() => setSelectedSchoolId(school.id)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      selectedSchoolId === school.id
                        ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-semibold truncate">{school.shortName}</div>
                    <div className={`text-[10px] truncate ${selectedSchoolId === school.id ? 'text-slate-300' : 'text-slate-500'}`}>
                      {school.motto}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Garment Color */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-900 uppercase tracking-wider">
                  2. Tee Base Color
                </span>
                <span className="text-slate-500">{tshirtColor.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {colorPalette.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setTshirtColor(c)}
                    title={c.name}
                    className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                      tshirtColor.name === c.name
                        ? 'border-slate-900 scale-110 shadow-sm'
                        : 'border-white hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* 3. Back Custom Lettering */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-900 uppercase tracking-wider block">
                3. Back Personalization (Optional)
              </label>
              
              <div className="space-y-2">
                <div>
                  <span className="text-xs text-slate-600 block mb-1">Student Name or Nickname (Max 14 chars):</span>
                  <input
                    type="text"
                    maxLength={14}
                    value={customText}
                    onChange={(e) => {
                      setCustomText(e.target.value.toUpperCase());
                      setViewSide('back');
                    }}
                    placeholder="E.G. CHEN, SARAH, CAPTAIN"
                    className="w-full px-3 py-2 text-xs font-mono font-semibold bg-slate-50 border border-slate-200 rounded-lg text-slate-900 uppercase focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-xs text-slate-600 block mb-1">Graduation Year:</span>
                    <select
                      value={gradYear}
                      onChange={(e) => {
                        setGradYear(e.target.value);
                        setViewSide('back');
                      }}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-slate-900 cursor-pointer"
                    >
                      <option value="2025">Class of 2025</option>
                      <option value="2026">Class of 2026</option>
                      <option value="2027">Class of 2027</option>
                      <option value="2028">Class of 2028</option>
                      <option value="2029">Class of 2029</option>
                    </select>
                  </div>

                  <div>
                    <span className="text-xs text-slate-600 block mb-1">Size:</span>
                    <div className="flex gap-1">
                      {['S', 'M', 'L', 'XL', '2XL'].map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`flex-1 py-1.5 text-xs font-mono font-medium rounded border transition-colors cursor-pointer ${
                            selectedSize === size
                              ? 'bg-slate-900 text-white border-slate-900'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Price & Add to Cart button */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500">Customized Department Tee</div>
                  <div className="text-xl font-bold font-mono tabular-nums text-slate-900">
                    ₹499
                  </div>
                </div>
                <div className="text-right text-xs text-emerald-700 font-medium">
                  Subsidized SES Grahak Bhandar Rate
                </div>
              </div>

              <button
                onClick={handleFinishCustomization}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  added ? 'bg-emerald-700 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white shadow-md'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added Custom Tee to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add Personalized Tee to Pickup Bag</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
