import React, { useState } from 'react';
import { ShoppingBag, Eye, MapPin, Check, Sparkles } from 'lucide-react';
import { Product } from '../types/store';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size?: string, color?: string) => void;
  onOpenCustomizerForProduct?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onAddToCart,
  onOpenCustomizerForProduct,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes ? product.sizes[1] || product.sizes[0] : '');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors ? product.colors[0].name : '');
  const [justAdded, setJustAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize, selectedColor);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <article
      onClick={() => onSelectProduct(product)}
      className="group bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
    >
      <div>
        {/* Product Image Stage: takes 65%-70% of upper visual proportion */}
        <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
          {!imgError ? (
            <img
              src={product.image}
              alt={product.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-slate-100 text-slate-500">
              <span className="text-xs uppercase tracking-wider font-semibold font-display">
                {product.schoolName || 'Campus Goods'}
              </span>
              <span className="text-xs text-slate-400 mt-1">{product.shortTitle}</span>
            </div>
          )}

          {/* Single Subtle Text Tag (No pill cluster) */}
          {product.badge && (
            <div className="absolute top-2.5 left-2.5 bg-slate-900/90 text-white text-[11px] font-medium px-2 py-0.5 rounded shadow-xs">
              {product.badge}
            </div>
          )}

          {/* Physical Store Rack Indicator */}
          <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-xs text-slate-700 text-[10px] px-2 py-1 rounded flex items-center justify-between shadow-xs">
            <span className="flex items-center gap-1 font-medium truncate">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">{product.storeLocation}</span>
            </span>
            <span className="font-mono tabular-nums text-slate-500 shrink-0 pl-1">
              {product.stockCount} in stock
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-2">
          {/* Unboxed Metadata: Faculty & Category with separator */}
          <div className="text-[11px] uppercase tracking-wider text-slate-500 flex items-center gap-1.5 truncate">
            <span className="truncate font-medium">{product.schoolName || 'Campus General'}</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{product.category.replace('-', ' ')}</span>
          </div>

          {/* Product Title */}
          <h3 className="text-sm font-semibold text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-2 leading-snug">
            {product.title}
          </h3>

          {/* Department Slogan / Quick Note */}
          {product.departmentSlogan && (
            <p className="text-xs text-slate-500 line-clamp-1 italic">
              "{product.departmentSlogan}"
            </p>
          )}

          {/* Size Selectors for Apparel */}
          {product.sizes && product.sizes.length > 0 && (
            <div
              className="pt-1 flex items-center gap-1 overflow-x-auto scrollbar-none"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-[11px] text-slate-400 mr-1 shrink-0">Size:</span>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`text-[10px] font-mono font-medium px-1.5 py-0.5 rounded border transition-colors cursor-pointer shrink-0 ${
                    selectedSize === size
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          {/* Color Swatches if available */}
          {product.colors && product.colors.length > 0 && (
            <div
              className="pt-0.5 flex items-center gap-1.5"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-[11px] text-slate-400 mr-1">Color:</span>
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  title={c.name}
                  className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                    selectedColor === c.name ? 'ring-2 ring-slate-900 ring-offset-1 scale-110' : 'border-slate-300'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              <span className="text-[10px] text-slate-500 truncate">{selectedColor}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Strip: Price baseline & Add to Cart button */}
      <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between mt-3">
        {/* Tabular Price in Rupees */}
        <div className="flex items-baseline gap-2">
          <span className="font-mono tabular-nums text-base font-bold text-slate-900">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="font-mono tabular-nums text-xs text-slate-400 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-1.5">
          {product.category === 't-shirts' && onOpenCustomizerForProduct && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenCustomizerForProduct(product);
              }}
              title="Personalize with student name or grad year"
              className="p-2 text-amber-700 hover:text-amber-800 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={handleQuickAdd}
            disabled={product.stockCount <= 0}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              product.stockCount <= 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : justAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
