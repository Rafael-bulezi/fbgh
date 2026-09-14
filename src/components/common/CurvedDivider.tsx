import React from 'react';

export type CurveVariant =
  | 'gentle-wave'
  | 's-curve'
  | 'circular-arc'
  | 'sharp-diagonal'
  | 'swoop'
  | 'asymmetric'
  | 'soft-curve';

interface CurvedDividerProps {
  variant?: CurveVariant;
  fromColor?: string; // Color of section above divider
  toColor?: string;   // Color of section below divider
  position?: 'top' | 'bottom';
  flip?: boolean;     // Mirror horizontally
  className?: string;
  height?: number | string;
}

export const CurvedDivider: React.FC<CurvedDividerProps> = ({
  variant = 'gentle-wave',
  fromColor = 'transparent',
  toColor = '#0D0B0A',
  position = 'bottom',
  flip = false,
  className = '',
  height = 'clamp(42px, 6vw, 92px)',
}) => {
  // Ultra-smooth, high-precision SVG paths mapped on a 1440x120 canvas
  const getPath = () => {
    switch (variant) {
      case 'gentle-wave':
        // Smooth organic S-curve river flow
        return 'M0,0 C360,90 600,10 960,80 C1200,126 1360,35 1440,50 L1440,121 L0,121 Z';
      case 's-curve':
        // Deep sweeping harmonic S-curve
        return 'M0,15 C440,115 880,-20 1440,80 L1440,121 L0,121 Z';
      case 'circular-arc':
        // Smooth convex circular arch
        return 'M0,0 Q720,115 1440,0 L1440,121 L0,121 Z';
      case 'sharp-diagonal':
        // Clean editorial diagonal cut
        return 'M0,15 L1440,95 L1440,121 L0,121 Z';
      case 'swoop':
        // Dramatic swoop entering high on left and dipping across
        return 'M0,10 C460,25 940,112 1440,55 L1440,121 L0,121 Z';
      case 'asymmetric':
        // Organic asymmetric wave cresting gracefully
        return 'M0,25 C340,115 620,10 1000,85 C1220,122 1360,45 1440,60 L1440,121 L0,121 Z';
      case 'soft-curve':
      default:
        // Subtle minimal bow
        return 'M0,15 Q720,90 1440,15 L1440,121 L0,121 Z';
    }
  };

  const transform = `${flip ? 'scaleX(-1) ' : ''}${position === 'top' ? 'scaleY(-1)' : ''}`.trim();

  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none z-20 relative -my-[1px] ${className}`}
      style={{
        height,
        backgroundColor: fromColor,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full h-full block filter"
        style={{
          transform: transform || undefined,
          transformOrigin: 'center',
        }}
      >
        <path
          d={getPath()}
          fill={toColor}
          fillRule="nonzero"
        />
      </svg>
    </div>
  );
};
