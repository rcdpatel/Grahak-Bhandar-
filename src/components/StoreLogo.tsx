import React from 'react';
import { SESLogo } from './SESLogo';

export const GRAHAK_BHANDAR_LOGO_IMG = '/src/assets/images/grahak_bhandar_logo_1791716509285.jpg';

interface StoreLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  variant?: 'ses' | 'dual' | 'badge';
  showBadge?: boolean;
}

export const StoreLogo: React.FC<StoreLogoProps> = ({
  className = '',
  size = 46,
  showText = false,
  showBadge = true,
  variant = 'ses',
}) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Official SES Logo Crest Shared by the User */}
      <div 
        className="relative shrink-0 flex items-center justify-center transition-transform hover:scale-105"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <SESLogo size={size} className="drop-shadow-xs" />
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-slate-900 tracking-tight leading-none text-xl sm:text-2xl">
              Grahak Bhandar
            </span>
            {showBadge && (
              <span className="text-[10px] font-mono uppercase bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-bold border border-amber-200">
                SES Campus
              </span>
            )}
          </div>
          <span className="text-[11px] font-medium text-slate-500 tracking-wide mt-0.5">
            Campus Cooperative Store · Shirpur Education Society
          </span>
        </div>
      )}
    </div>
  );
};
