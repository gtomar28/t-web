import React from 'react';

interface TrevykLogoProps {
  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'card';
  /** Display layout */
  layout?: 'horizontal' | 'vertical' | 'icon-only' | 'card-banner';
  /**
   * `dark` = logo for dark backgrounds (light wordmark)
   * `light` = original logo for light backgrounds (dark wordmark)
   * `auto` = same as dark (site shell is dark-themed)
   */
  theme?: 'dark' | 'light' | 'auto';
  /** Show the brand tagline under the mark */
  showTagline?: boolean;
  /** Custom className for the outer container */
  className?: string;
  /** Custom size in pixels for the icon alone */
  iconSize?: number;
}

const LOGO_ON_LIGHT = '/trevyk-logo.png';
const LOGO_ON_DARK = '/trevyk-logo-on-dark.png';
const ICON_ON_LIGHT = '/trevyk-icon.png';
const ICON_ON_DARK = '/trevyk-icon-on-dark.png';

/** Intrinsic wordmark aspect: 900×254 */
const LOGO_ASPECT = 900 / 254;

const HEIGHTS: Record<NonNullable<TrevykLogoProps['size']>, number> = {
  xs: 28,
  sm: 36,
  md: 44,
  lg: 64,
  xl: 96,
  card: 72,
};

function logoWidthForHeight(height: number) {
  return Math.round(height * LOGO_ASPECT);
}

/**
 * Official Trevyk Technologies logo (transparent PNG).
 * Use theme="light" only on lilac/white surfaces; default is dark-bg safe.
 */
export const TrevykLogo: React.FC<TrevykLogoProps> = ({
  size = 'sm',
  layout = 'horizontal',
  theme = 'auto',
  showTagline = false,
  className = '',
  iconSize,
}) => {
  const onDark = theme !== 'light';
  const logoSrc = onDark ? LOGO_ON_DARK : LOGO_ON_LIGHT;
  const iconSrc = onDark ? ICON_ON_DARK : ICON_ON_LIGHT;
  const iconH = iconSize ?? HEIGHTS[size];
  const logoH = iconSize ? Math.round(iconSize * 0.85) : HEIGHTS[size];
  const logoW = logoWidthForHeight(logoH);
  const taglineClass = onDark ? 'text-[#B9A6D1]' : 'text-[#5C4A6E]';

  if (layout === 'icon-only') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <img
          src={iconSrc}
          alt="Trevyk Technologies"
          width={iconH}
          height={iconH}
          className="shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_12px_rgba(185,166,209,0.35)]"
          draggable={false}
          decoding="async"
          loading="eager"
          fetchPriority="high"
        />
      </div>
    );
  }

  if (layout === 'card-banner') {
    const bannerH = 56;
    const bannerW = logoWidthForHeight(bannerH);
    return (
      <div
        className={`p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#1E1024] border border-[#6B4A87]/35 shadow-sm flex flex-col sm:flex-row items-center gap-5 sm:gap-8 ${className}`}
      >
        <img
          src={logoSrc}
          alt="Trevyk Technologies"
          width={bannerW}
          height={bannerH}
          className="h-14 sm:h-16 w-auto max-w-full object-contain"
          draggable={false}
          decoding="async"
          loading="lazy"
        />
        {showTagline && (
          <p className={`text-sm font-medium leading-relaxed font-sans max-w-sm text-center sm:text-left ${taglineClass}`}>
            Turning Vision Into Progress.
          </p>
        )}
      </div>
    );
  }

  if (layout === 'vertical') {
    const vH = Math.round(logoH * 1.15);
    const vW = logoWidthForHeight(vH);
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <img
          src={logoSrc}
          alt="Trevyk Technologies"
          width={vW}
          height={vH}
          style={{ height: vH, width: 'auto', maxWidth: '100%' }}
          className="object-contain drop-shadow-[0_8px_24px_rgba(107,74,135,0.45)]"
          draggable={false}
          decoding="async"
          loading="lazy"
        />
        {showTagline && (
          <p className={`mt-3 text-xs sm:text-sm max-w-xs font-medium leading-relaxed ${taglineClass}`}>
            Turning Vision Into Progress.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex flex-col items-start group ${className}`}>
      <img
        src={logoSrc}
        alt="Trevyk Technologies"
        width={logoW}
        height={logoH}
        style={{ height: logoH, width: 'auto', maxWidth: 'min(100%, 280px)' }}
        className="object-contain object-left transition-opacity duration-300 group-hover:opacity-95 drop-shadow-[0_0_18px_rgba(185,166,209,0.25)]"
        draggable={false}
        decoding="async"
        loading="eager"
        fetchPriority="high"
      />
      {showTagline && (
        <span className={`text-[10px] sm:text-[11px] font-sans font-medium leading-tight mt-1 hidden sm:block ${taglineClass}`}>
          Turning Vision Into Progress.
        </span>
      )}
    </div>
  );
};
