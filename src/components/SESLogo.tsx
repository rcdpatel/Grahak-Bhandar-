import React from 'react';

interface SESLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
}

export const SESLogo: React.FC<SESLogoProps> = ({
  className = '',
  size = 48,
  showText = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 320 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm"
      >
        <defs>
          {/* Gold Gradients */}
          <linearGradient id="sesGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fae084" />
            <stop offset="25%" stopColor="#d4af37" />
            <stop offset="50%" stopColor="#fdf0a6" />
            <stop offset="75%" stopColor="#b8860b" />
            <stop offset="100%" stopColor="#8c6d1f" />
          </linearGradient>

          <linearGradient id="sesGoldLight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff2ab" />
            <stop offset="50%" stopColor="#e5be49" />
            <stop offset="100%" stopColor="#9c7a23" />
          </linearGradient>

          {/* Shield Metallic Background */}
          <radialGradient id="sesShieldBg" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="45%" stopColor="#0f224a" />
            <stop offset="85%" stopColor="#070d1d" />
            <stop offset="100%" stopColor="#02050b" />
          </radialGradient>

          {/* Book Gradients */}
          <linearGradient id="sesBookOrange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#c2410c" />
          </linearGradient>

          <linearGradient id="sesBookBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>

          {/* Feather Quill Gradient */}
          <linearGradient id="sesQuill" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          {/* Drop Shadows */}
          <filter id="sesGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* --- CROWN SPIKES AT TOP --- */}
        <g id="crown" fill="url(#sesGold)">
          {/* Center Crown Peak */}
          <polygon points="160,8 178,42 142,42" />
          {/* Left Mid Peak */}
          <polygon points="126,18 144,48 112,48" />
          {/* Right Mid Peak */}
          <polygon points="194,18 208,48 176,48" />
          {/* Left Outer Peak */}
          <polygon points="98,32 118,52 86,52" />
          {/* Right Outer Peak */}
          <polygon points="222,32 234,52 202,52" />
        </g>

        {/* --- SHIELD OUTER GOLDEN FRAME --- */}
        <path
          d="M50 48 L270 48 C270 48 280 170 240 245 C208 304 160 348 160 348 C160 348 112 304 80 245 C40 170 50 48 50 48 Z"
          fill="url(#sesGold)"
          stroke="#785e17"
          strokeWidth="2"
          filter="url(#sesGlow)"
        />

        {/* --- SHIELD INNER GOLDEN BEVEL --- */}
        <path
          d="M58 56 L262 56 C262 56 271 166 234 237 C204 292 160 334 160 334 C160 334 116 292 86 237 C49 166 58 56 58 56 Z"
          fill="url(#sesGoldLight)"
        />

        {/* --- SHIELD DARK BLUE CORE --- */}
        <path
          d="M66 64 L254 64 C254 64 262 164 227 230 C200 281 160 320 160 320 C160 320 120 281 93 230 C58 164 66 64 66 64 Z"
          fill="url(#sesShieldBg)"
          stroke="#eab308"
          strokeWidth="1.5"
        />

        {/* Inner Shield Subtle Hairline */}
        <path
          d="M74 72 L246 72 C246 72 253 162 221 223 C196 270 160 306 160 306 C160 306 124 270 99 223 C67 162 74 72 74 72 Z"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="0.75"
          opacity="0.35"
        />

        {/* --- TOP EMBLEM: OPEN BOOK & FEATHER QUILL --- */}
        <g id="book-and-quill" transform="translate(160, 96)">
          {/* Open Book Left Page */}
          <path
            d="M-2 -2 C-10 -7 -26 -6 -32 6 C-32 6 -20 10 -2 12 Z"
            fill="url(#sesBookOrange)"
            stroke="#fed7aa"
            strokeWidth="0.8"
          />
          {/* Open Book Right Page */}
          <path
            d="M2 -2 C10 -7 26 -6 32 6 C32 6 20 10 2 12 Z"
            fill="url(#sesBookBlue)"
            stroke="#bae6fd"
            strokeWidth="0.8"
          />
          {/* Book Spine Center */}
          <polygon points="-2,-2 2,-2 1,13 -1,13" fill="url(#sesGold)" />

          {/* Feather Quill Pen Plume */}
          <path
            d="M-1 -4 C-8 -18 -2 -34 18 -44 C12 -30 2 -18 -1 -4 Z"
            fill="url(#sesQuill)"
            stroke="#fef08a"
            strokeWidth="0.6"
          />
          {/* Quill Center Rib */}
          <path d="M-1 -4 Q5 -24 18 -44" stroke="#ffffff" strokeWidth="0.8" opacity="0.9" />
          {/* Red decorative crest bead */}
          <circle cx="16" cy="-28" r="2.5" fill="#ef4444" stroke="#fff" strokeWidth="0.5" />
        </g>

        {/* --- CENTER ACRONYM: "SES" IN METALLIC GOLD SERIF --- */}
        <g id="ses-text" filter="url(#sesGlow)">
          <text
            x="160"
            y="202"
            textAnchor="middle"
            fontFamily="'Cinzel', 'Playfair Display', 'Times New Roman', Georgia, serif"
            fontSize="84"
            fontWeight="900"
            letterSpacing="2"
            fill="url(#sesGold)"
            stroke="#5c440a"
            strokeWidth="1.5"
          >
            SES
          </text>
          {/* Highlight Shading Overlay */}
          <text
            x="159"
            y="201"
            textAnchor="middle"
            fontFamily="'Cinzel', 'Playfair Display', 'Times New Roman', Georgia, serif"
            fontSize="84"
            fontWeight="900"
            letterSpacing="2"
            fill="url(#sesGoldLight)"
            opacity="0.85"
          >
            SES
          </text>
        </g>

        {/* --- LOWER RIBBON: "SHIRPUR EDUCATION SOCIETY" --- */}
        <g id="ribbon-banner">
          {/* Ribbon Shadow Back folds */}
          <polygon points="12,246 36,228 36,260" fill="#4a370b" />
          <polygon points="308,246 284,228 284,260" fill="#4a370b" />

          {/* Left Ribbon Tail */}
          <polygon points="8,266 38,240 38,274 8,290 22,278" fill="url(#sesGold)" stroke="#6b4e0d" strokeWidth="1" />
          {/* Right Ribbon Tail */}
          <polygon points="312,266 282,240 282,274 312,290 298,278" fill="url(#sesGold)" stroke="#6b4e0d" strokeWidth="1" />

          {/* Main Dark Ribbon Arc */}
          <path
            d="M26 250 Q160 216 294 250 L288 284 Q160 250 32 284 Z"
            fill="#091428"
            stroke="url(#sesGold)"
            strokeWidth="3.5"
            filter="url(#sesGlow)"
          />

          {/* Ribbon Text: SHIRPUR EDUCATION SOCIETY */}
          <text
            x="160"
            y="266"
            textAnchor="middle"
            fontFamily="'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif"
            fontSize="14.5"
            fontWeight="800"
            letterSpacing="2.2"
            fill="#ffffff"
          >
            SHIRPUR EDUCATION SOCIETY
          </text>
        </g>

        {/* --- SANSKRIT MOTTO SCROLL: "|| सा विद्या या विमुक्तये ||" --- */}
        <g id="sanskrit-motto">
          {/* Motto Scroll Backdrop */}
          <path
            d="M64 290 Q160 274 256 290 L248 316 Q160 300 72 316 Z"
            fill="#030712"
            opacity="0.9"
          />

          <text
            x="160"
            y="306"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', 'Noto Sans Devanagari', 'Mangal', serif"
            fontSize="14"
            fontWeight="700"
            letterSpacing="1.2"
            fill="#ffffff"
          >
            ॥ सा विद्या या विमुक्तये ॥
          </text>
        </g>
      </svg>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-extrabold text-slate-900 tracking-tight leading-none text-lg">
              Grahak Bhandar
            </span>
            <span className="text-[10px] font-mono uppercase bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-bold">
              SES
            </span>
          </div>
          <span className="text-[11px] font-medium text-slate-500 tracking-wide">
            Shirpur Education Society Campus Store
          </span>
        </div>
      )}
    </div>
  );
};
