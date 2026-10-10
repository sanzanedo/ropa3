import React from 'react';

interface ClothingIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const ClothingIcon: React.FC<ClothingIconProps> = ({
  name,
  className = 'w-16 h-16',
  size = 64
}) => {
  const strokeWidth = 2;

  switch (name) {
    case 'shirt':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          {/* T-Shirt */}
          <path d="M22 10 C26 14 38 14 42 10 L54 18 L48 28 L42 25 L42 54 L22 54 L22 25 L16 28 L10 18 Z" fill="currentColor" fillOpacity="0.12" />
          <path d="M22 10 C26 15 38 15 42 10" />
          <line x1="22" y1="54" x2="42" y2="54" />
          <line x1="16" y1="28" x2="22" y2="25" />
          <line x1="48" y1="28" x2="42" y2="25" />
        </svg>
      );

    case 'button-shirt':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          {/* Buttoned shirt */}
          <path d="M20 10 L28 16 L22 18 L10 24 L6 34 L14 36 L18 28 L18 56 L46 56 L46 28 L50 36 L58 34 L54 24 L42 18 L36 16 L44 10 Z" fill="currentColor" fillOpacity="0.12" />
          <line x1="32" y1="16" x2="32" y2="56" />
          <circle cx="32" cy="24" r="1.5" fill="currentColor" />
          <circle cx="32" cy="34" r="1.5" fill="currentColor" />
          <circle cx="32" cy="44" r="1.5" fill="currentColor" />
          <path d="M28 16 L32 20 L36 16" />
        </svg>
      );

    case 'trousers':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          {/* Pants */}
          <path d="M16 12 L48 12 L45 56 L35 56 L32 28 L29 56 L19 56 Z" fill="currentColor" fillOpacity="0.12" />
          <line x1="16" y1="18" x2="48" y2="18" strokeDasharray="2 2" />
          <line x1="32" y1="12" x2="32" y2="28" />
        </svg>
      );

    case 'shorts':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          {/* Shorts */}
          <path d="M16 14 L48 14 L46 38 L36 38 L32 26 L28 38 L18 38 Z" fill="currentColor" fillOpacity="0.12" />
          <line x1="16" y1="20" x2="48" y2="20" />
          <line x1="32" y1="14" x2="32" y2="26" />
        </svg>
      );

    case 'skirt':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          {/* Skirt */}
          <path d="M22 16 L42 16 L52 52 C42 55 22 55 12 52 Z" fill="currentColor" fillOpacity="0.12" />
          <line x1="22" y1="22" x2="42" y2="22" />
          <path d="M24 22 L20 52" strokeDasharray="3 3" />
          <path d="M32 22 L32 54" strokeDasharray="3 3" />
          <path d="M40 22 L44 52" strokeDasharray="3 3" />
        </svg>
      );

    case 'dress':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          {/* Dress */}
          <path d="M24 10 L18 16 L22 24 L24 30 L14 56 C26 58 38 58 50 56 L40 30 L42 24 L46 16 L40 10 C36 14 28 14 24 10 Z" fill="currentColor" fillOpacity="0.12" />
          <line x1="24" y1="30" x2="40" y2="30" />
          <path d="M24 10 C28 14 36 14 40 10" />
        </svg>
      );

    case 'sweater':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          {/* Warm knit sweater */}
          <path d="M24 12 C28 16 36 16 40 12 L56 22 L50 36 L44 32 L44 54 L20 54 L20 32 L14 36 L8 22 Z" fill="currentColor" fillOpacity="0.12" />
          <path d="M24 12 C28 16 36 16 40 12" />
          <line x1="20" y1="50" x2="44" y2="50" />
          <line x1="20" y1="32" x2="44" y2="32" strokeDasharray="2 2" />
          <line x1="20" y1="40" x2="44" y2="40" strokeDasharray="2 2" />
        </svg>
      );

    case 'hoodie':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          {/* Hoodie */}
          <path d="M22 14 C22 8 42 8 42 14 L56 24 L50 38 L44 34 L44 54 L20 54 L20 34 L14 38 L8 24 Z" fill="currentColor" fillOpacity="0.12" />
          {/* Hood cowl */}
          <path d="M24 14 C24 20 40 20 40 14" />
          {/* Kangaroo pocket */}
          <path d="M26 40 L38 40 L40 50 L24 50 Z" />
        </svg>
      );

    case 'jacket':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          {/* Jacket with collar & zipper */}
          <path d="M22 12 L16 18 L8 26 L14 38 L18 34 L18 54 L46 54 L46 34 L50 38 L56 26 L48 18 L42 12 Z" fill="currentColor" fillOpacity="0.12" />
          <line x1="32" y1="18" x2="32" y2="54" strokeWidth={2.5} />
          <path d="M22 12 L32 20 L42 12" />
        </svg>
      );

    case 'coat':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          {/* Long overcoat */}
          <path d="M22 8 L14 16 L6 26 L12 36 L16 32 L16 58 L48 58 L48 32 L52 36 L58 26 L50 16 L42 8 Z" fill="currentColor" fillOpacity="0.12" />
          <line x1="34" y1="16" x2="34" y2="58" />
          <circle cx="30" cy="24" r="2" fill="currentColor" />
          <circle cx="30" cy="34" r="2" fill="currentColor" />
          <circle cx="30" cy="44" r="2" fill="currentColor" />
          <path d="M22 8 L32 18 L42 8" />
        </svg>
      );

    case 'raincoat':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          {/* Raincoat with hood */}
          <path d="M20 12 C20 6 44 6 44 12 L56 24 L50 36 L44 32 L44 56 L20 56 L20 32 L14 36 L8 24 Z" fill="currentColor" fillOpacity="0.12" />
          <path d="M24 12 C24 18 40 18 40 12" />
          <line x1="32" y1="18" x2="32" y2="56" />
          {/* Rain droplets */}
          <path d="M10 46 L8 50" strokeWidth={1.5} />
          <path d="M54 44 L52 48" strokeWidth={1.5} />
        </svg>
      );

    case 'scarf':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          {/* Scarf wrapped */}
          <path d="M16 22 C16 14 48 14 48 22 C48 30 16 30 16 22 Z" fill="currentColor" fillOpacity="0.12" />
          <path d="M22 26 L22 52 L32 52 L32 26" fill="currentColor" fillOpacity="0.12" />
          <path d="M32 26 L32 46 L40 46 L40 26" fill="currentColor" fillOpacity="0.12" />
          {/* Fringe */}
          <line x1="22" y1="52" x2="22" y2="56" />
          <line x1="26" y1="52" x2="26" y2="56" />
          <line x1="30" y1="52" x2="30" y2="56" />
        </svg>
      );

    case 'beanie':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          {/* Beanie with pompom */}
          <circle cx="32" cy="14" r="5" fill="currentColor" fillOpacity="0.2" />
          <path d="M16 42 C16 22 48 22 48 42 Z" fill="currentColor" fillOpacity="0.12" />
          <rect x="12" y="42" width="40" height="10" rx="3" fill="currentColor" fillOpacity="0.2" />
          <line x1="20" y1="42" x2="20" y2="52" />
          <line x1="32" y1="42" x2="32" y2="52" />
          <line x1="44" y1="42" x2="44" y2="52" />
        </svg>
      );

    case 'gloves':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          {/* Pair of winter gloves */}
          <path d="M10 24 C10 18 14 18 14 24 L14 14 C14 10 18 10 18 14 L18 12 C18 8 22 8 22 12 L22 16 C22 12 26 12 26 16 L26 38 L12 38 C10 34 10 28 10 24 Z" fill="currentColor" fillOpacity="0.12" />
          <rect x="10" y="38" width="16" height="8" rx="2" />
          <path d="M38 16 C38 12 42 12 42 16 L42 12 C42 8 46 8 46 12 L46 14 C46 10 50 10 50 14 L50 24 C50 18 54 18 54 24 C54 28 54 34 52 38 L38 38 Z" fill="currentColor" fillOpacity="0.12" />
          <rect x="38" y="38" width="16" height="8" rx="2" />
        </svg>
      );

    case 'socks':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          {/* Socks pair */}
          <path d="M18 12 L28 12 L28 36 C34 36 38 42 38 48 C38 52 34 54 28 54 C20 54 18 46 18 40 Z" fill="currentColor" fillOpacity="0.12" />
          <line x1="18" y1="16" x2="28" y2="16" />
          <path d="M36 12 L46 12 L46 36 C52 36 56 42 56 48 C56 52 52 54 46 54 C38 54 36 46 36 40 Z" fill="currentColor" fillOpacity="0.12" />
          <line x1="36" y1="16" x2="46" y2="16" />
        </svg>
      );

    case 'shoes':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          {/* Dress shoes */}
          <path d="M8 38 C8 30 18 28 26 28 L36 34 L56 38 C58 44 56 50 48 50 L8 50 Z" fill="currentColor" fillOpacity="0.12" />
          <line x1="8" y1="46" x2="54" y2="46" />
          <path d="M8 46 L8 54 L18 54 L18 46" />
          <line x1="28" y1="32" x2="34" y2="38" />
        </svg>
      );

    case 'sneakers':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          {/* Athletic sneaker */}
          <path d="M10 38 C10 26 22 24 30 24 L40 32 L56 36 C58 42 56 48 48 48 L10 48 Z" fill="currentColor" fillOpacity="0.12" />
          <rect x="8" y="46" width="50" height="6" rx="2" fill="currentColor" fillOpacity="0.2" />
          {/* Laces */}
          <line x1="26" y1="28" x2="32" y2="34" />
          <line x1="30" y1="26" x2="36" y2="32" />
          <line x1="34" y1="26" x2="40" y2="32" />
          {/* Toe cap */}
          <path d="M48 36 C52 38 54 42 54 46" />
        </svg>
      );

    case 'boots':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          {/* High rain/winter boots */}
          <path d="M16 12 L34 12 L34 36 L52 42 C54 48 52 52 46 52 L16 52 Z" fill="currentColor" fillOpacity="0.12" />
          <rect x="14" y="50" width="38" height="6" rx="1" fill="currentColor" fillOpacity="0.2" />
          <path d="M16 12 L34 12 L34 18 L16 18 Z" fill="currentColor" fillOpacity="0.2" />
          <line x1="14" y1="52" x2="22" y2="52" />
        </svg>
      );

    case 'sandals':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          {/* Summer sandals */}
          <rect x="10" y="46" width="46" height="6" rx="3" fill="currentColor" fillOpacity="0.2" />
          <path d="M16 46 C16 32 26 32 30 46" />
          <path d="M34 46 C38 34 48 34 50 46" />
          <line x1="24" y1="36" x2="42" y2="38" />
        </svg>
      );

    case 'slippers':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          {/* Cozy slippers */}
          <rect x="8" y="44" width="48" height="6" rx="3" fill="currentColor" fillOpacity="0.2" />
          <path d="M22 44 C22 28 52 28 52 44 Z" fill="currentColor" fillOpacity="0.12" />
          <circle cx="36" cy="36" r="3" fill="currentColor" />
        </svg>
      );

    case 'pajamas':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          {/* Pajama top & bottom with moon motif */}
          <path d="M18 10 L32 14 L46 10 L50 22 L42 24 L42 34 L22 34 L22 24 L14 22 Z" fill="currentColor" fillOpacity="0.12" />
          <path d="M22 36 L42 36 L40 56 L33 56 L32 44 L31 56 L24 56 Z" fill="currentColor" fillOpacity="0.12" />
          {/* Crescent moon detail */}
          <path d="M30 18 C28 18 26 20 26 22 C26 24 28 26 30 26 C29 25 29 23 30 22 Z" fill="currentColor" />
        </svg>
      );

    case 'bathrobe':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          {/* Robe with tie */}
          <path d="M20 10 L32 18 L44 10 L52 24 L46 28 L44 56 L20 56 L18 28 L12 24 Z" fill="currentColor" fillOpacity="0.12" />
          <line x1="26" y1="14" x2="38" y2="34" />
          <line x1="38" y1="14" x2="26" y2="34" />
          <rect x="18" y="34" width="28" height="4" rx="1" fill="currentColor" />
          <line x1="28" y1="38" x2="26" y2="48" strokeWidth={2.5} />
        </svg>
      );

    case 'cap':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          {/* Baseball cap with visor */}
          <path d="M14 38 C14 20 44 20 44 38 Z" fill="currentColor" fillOpacity="0.12" />
          <path d="M42 38 C42 38 48 36 56 38 C56 42 48 44 40 44 Z" fill="currentColor" fillOpacity="0.2" />
          <circle cx="28" cy="22" r="2" fill="currentColor" />
        </svg>
      );

    case 'sunglasses':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          {/* Sunglasses */}
          <path d="M12 28 L52 28" strokeWidth={2.5} />
          <rect x="14" y="28" width="16" height="14" rx="4" fill="currentColor" fillOpacity="0.3" />
          <rect x="34" y="28" width="16" height="14" rx="4" fill="currentColor" fillOpacity="0.3" />
          <line x1="30" y1="32" x2="34" y2="32" strokeWidth={2} />
          {/* Temples */}
          <path d="M14 28 L8 24" />
          <path d="M50 28 L56 24" />
        </svg>
      );

    case 'belt':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          {/* Belt with buckle */}
          <rect x="8" y="26" width="48" height="12" rx="3" fill="currentColor" fillOpacity="0.12" />
          <rect x="22" y="22" width="20" height="20" rx="3" fill="currentColor" fillOpacity="0.2" />
          <rect x="26" y="26" width="12" height="12" rx="1" stroke="currentColor" />
          <line x1="32" y1="28" x2="32" y2="36" strokeWidth={2.5} />
          {/* Holes */}
          <circle cx="14" cy="32" r="1.5" fill="currentColor" />
          <circle cx="48" cy="32" r="1.5" fill="currentColor" />
        </svg>
      );

    case 'umbrella':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          {/* Umbrella canopy & handle */}
          <path d="M12 36 C12 18 52 18 52 36 C45 34 40 34 32 36 C24 34 19 34 12 36 Z" fill="currentColor" fillOpacity="0.15" />
          <line x1="32" y1="20" x2="32" y2="14" />
          <line x1="32" y1="36" x2="32" y2="50" strokeWidth={2.5} />
          <path d="M32 50 C32 55 24 55 24 50" strokeWidth={2.5} />
        </svg>
      );

    case 'swimsuit':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          {/* One-piece swimsuit with wave */}
          <path d="M22 12 L20 22 C20 30 22 34 22 46 C22 52 30 52 32 46 C34 52 42 52 42 46 C42 34 44 30 44 22 L42 12 C38 18 36 22 32 22 C28 22 26 18 22 12 Z" fill="currentColor" fillOpacity="0.15" />
          <path d="M26 34 Q32 30 38 34" strokeWidth={1.5} />
        </svg>
      );

    case 'tracksuit':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          {/* Sport tracksuit */}
          <path d="M16 12 L32 16 L48 12 L52 24 L44 26 L42 34 L22 34 L20 26 L12 24 Z" fill="currentColor" fillOpacity="0.12" />
          <path d="M22 36 L42 36 L39 56 L33 56 L32 44 L31 56 L25 56 Z" fill="currentColor" fillOpacity="0.12" />
          {/* Sport side stripe */}
          <line x1="22" y1="36" x2="25" y2="56" strokeWidth={1.5} />
          <line x1="42" y1="36" x2="39" y2="56" strokeWidth={1.5} />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <circle cx="32" cy="32" r="24" fill="currentColor" fillOpacity="0.1" />
          <path d="M24 24 L40 40 M40 24 L24 40" />
        </svg>
      );
  }
};
