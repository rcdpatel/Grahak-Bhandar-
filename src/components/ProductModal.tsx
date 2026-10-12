import React, { useState } from 'react';
import { X, Check, MapPin, ShieldCheck, ShoppingBag, Clock, Sparkles, AlertCircle, Share2 } from 'lucide-react';
import { Product } from '../types/store';
import { PHYSICAL_STORE_INFO } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size?: string, color?: string, qty?: number) => void;
  onOpenCustomizer: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenCustomizer,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes ? product.sizes[1] || product.sizes[0] : ''
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors ? product.colors[0].name : ''
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-900 bg-white/80 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          
          {/* Left Column: Visual Gallery & Shelf Indicator */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-slate-50/60">
            <div className="space-y-4">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-200 border border-slate-200">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1 rounded">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Physical Shelf & Inventory Box */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="font-semibold text-slate-900 flex items-center gap-1.5 font-display text-sm">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  Physical Campus Store Location
                </div>
                <div className="text-slate-600 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Store Rack:</span>
                    <span className="font-medium text-slate-900">{product.storeLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Current Shelf Stock:</span>
                    <span className="font-mono tabular-nums font-semibold text-emerald-700">
                      {product.stockCount} units available
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Store Desk:</span>
                    <span>Student Activity Center, Room 104</span>
                  </div>
                </div>
              </div>

              {/* Prescribed College Dress Code & Uniform Highlight */}
              {product.isUniformApproved && (
                <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-xl text-xs text-blue-900 space-y-1">
                  <div className="font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-700" />
                    Official Prescribed College Dress Code
                  </div>
                  <p className="text-blue-800 leading-relaxed">
                    100% compliant with college discipline guidelines, official monogram placement, and campus dress code inspections.
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 flex items-center justify-between text-xs text-slate-500">
              <span>Grahak Bhandar ID: #{product.id}</span>
              <button
                onClick={handleShare}
                className="flex items-center gap-1 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Link Copied' : 'Share Item'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Category & School */}
              <div className="text-xs uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <span className="font-semibold text-slate-700">{product.schoolName || 'Campus Wide'}</span>
                <span aria-hidden="true">·</span>
                <span>{product.category.replace('-', ' ')}</span>
              </div>

              {/* Title & Slogan */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                  {product.title}
                </h2>
                {product.departmentSlogan && (
                  <p className="text-xs text-slate-500 italic mt-1">
                    "{product.departmentSlogan}"
                  </p>
                )}
              </div>

              {/* Price Row in Rupees */}
              <div className="flex items-baseline gap-3 pb-3 border-b border-slate-200">
                <span className="font-mono tabular-nums text-2xl font-bold text-slate-900">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="font-mono tabular-nums text-sm text-slate-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs text-emerald-700 font-medium">
                  Student 10% discount applies at checkout
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection if any */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-700">Selected Color:</span>
                    <span className="text-slate-500">{selectedColor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg border transition-all cursor-pointer ${
                          selectedColor === c.name
                            ? 'border-slate-900 bg-slate-50 font-semibold text-slate-900'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection for Apparel */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-700">Select Size:</span>
                    <span className="text-slate-500">Unisex Collegiate Standard</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`font-mono text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                          selectedSize === s
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Personalization Callout for T-Shirts */}
              {product.category === 't-shirts' && (
                <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-amber-950 block">Want your Name or Grad Year on back?</span>
                    <span className="text-amber-800">Add custom print via the campus tee personalizer.</span>
                  </div>
                  <button
                    onClick={() => onOpenCustomizer(product)}
                    className="px-3 py-1.5 bg-amber-900 hover:bg-amber-950 text-white text-xs font-semibold rounded-lg shrink-0 cursor-pointer transition-colors"
                  >
                    Customize
                  </button>
                </div>
              )}

              {/* Technical Specifications / Breakdown */}
              {product.specs && product.specs.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    Specifications & Standards
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {product.specs.map((spec, i) => (
                      <div key={i} className="bg-slate-50 p-2 rounded-lg">
                        <div className="text-slate-400 text-[11px]">{spec.label}</div>
                        <div className="font-medium text-slate-800">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Actions: Stepper + Add to Cart */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer text-sm"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 font-mono tabular-nums text-xs font-semibold text-slate-900 w-10 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer text-sm"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Cart CTA */}
                <button
                  onClick={handleAdd}
                  disabled={product.stockCount <= 0}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    product.stockCount <= 0
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : addedSuccess
                      ? 'bg-emerald-700 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-md'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Pickup Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Pickup Bag · ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Pickup Promise */}
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Ready for pickup at Room 104 in approx. 20 minutes</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
