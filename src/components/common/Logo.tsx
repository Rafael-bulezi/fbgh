import React, { useState, useEffect } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showText?: boolean;
  variant?: 'light' | 'dark';
  animate?: boolean;
}

/* Path reordered to start at the TOP-LEFT corner:
   traces down → around → closes back at top-left. Identical artwork. */
const LOGO_PATH =
  'M 364.00,310.00 L 364.00,327.00 L 421.00,341.00 L 441.00,384.00 L 440.00,1103.00 L 418.00,1146.00 L 365.00,1160.00 L 364.00,1178.00 L 646.00,1178.00 L 645.00,1158.00 L 591.00,1146.00 L 568.00,1111.00 L 568.00,726.00 L 703.00,733.00 L 738.00,758.00 L 749.00,782.00 L 737.00,1147.00 L 724.00,1183.00 L 672.00,1208.00 L 672.00,1221.00 L 1050.00,1216.00 L 1143.00,1191.00 L 1218.00,1142.00 L 1266.00,1078.00 L 1293.00,995.00 L 1292.00,896.00 L 1270.00,836.00 L 1230.00,784.00 L 1167.00,739.00 L 1119.00,721.00 L 985.00,706.00 L 1106.00,682.00 L 1186.00,611.00 L 1208.00,559.00 L 1213.00,500.00 L 1203.00,448.00 L 1171.00,392.00 L 1103.00,340.00 L 1023.00,314.00 Z M 1069.00,424.00 L 1082.00,456.00 L 1089.00,493.00 L 1090.00,532.00 L 1085.00,569.00 L 1062.00,627.00 L 1036.00,657.00 L 1017.00,670.00 L 982.00,683.00 L 951.00,687.00 L 907.00,685.00 L 869.00,674.00 L 848.00,660.00 L 827.00,635.00 L 815.00,609.00 L 805.00,559.00 L 776.00,559.00 L 757.00,631.00 L 741.00,655.00 L 721.00,672.00 L 678.00,685.00 L 577.00,685.00 L 566.00,681.00 L 568.00,344.00 L 837.00,345.00 L 879.00,353.00 L 931.00,377.00 L 931.00,341.00 L 955.00,341.00 L 991.00,352.00 L 1026.00,372.00 L 1052.00,398.00 L 1069.00,424.00 Z M 791.00,654.00 L 793.00,656.00 L 794.00,663.00 L 796.00,666.00 L 798.00,674.00 L 810.00,690.00 L 815.00,694.00 L 828.00,701.00 L 840.00,704.00 L 847.00,704.00 L 849.00,706.00 L 847.00,708.00 L 836.00,709.00 L 825.00,713.00 L 809.00,724.00 L 802.00,733.00 L 794.00,751.00 L 793.00,759.00 L 790.00,763.00 L 788.00,761.00 L 785.00,746.00 L 778.00,731.00 L 764.00,716.00 L 765.00,715.00 L 762.00,716.00 L 755.00,712.00 L 752.00,712.00 L 750.00,710.00 L 742.00,708.00 L 731.00,708.00 L 729.00,706.00 L 731.00,704.00 L 743.00,704.00 L 754.00,701.00 L 771.00,691.00 L 781.00,679.00 L 788.00,658.00 L 791.00,654.00 Z M 1055.00,741.00 L 1089.00,759.00 L 1121.00,789.00 L 1146.00,830.00 L 1160.00,872.00 L 1166.00,908.00 L 1166.00,961.00 L 1156.00,1017.00 L 1140.00,1063.00 L 1104.00,1119.00 L 1071.00,1149.00 L 1033.00,1170.00 L 983.00,1185.00 L 954.00,1189.00 L 944.00,1187.00 L 943.00,1190.00 L 886.00,1191.00 L 856.00,1184.00 L 835.00,1161.00 L 830.00,1145.00 L 825.00,1099.00 L 814.00,865.00 L 815.00,824.00 L 825.00,786.00 L 838.00,764.00 L 860.00,744.00 L 876.00,735.00 L 909.00,726.00 L 983.00,725.00 L 1026.00,732.00 L 1055.00,741.00 Z';

/* Unique-id counter so multiple <Logo /> instances (navbar + footer) never collide */
let uidCounter = 0;

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  variant = 'light',
  animate = true,
}) => {
  const [uid] = useState(() => `fbgh-${++uidCounter}`);
  const [textVisible, setTextVisible] = useState(!animate);

  useEffect(() => {
    if (animate) {
      setTextVisible(false);
      // Text appears right after the flood completes (4.7s + 0.8s)
      const timer = setTimeout(() => setTextVisible(true), 5500);
      return () => clearTimeout(timer);
    }
    setTextVisible(true);
  }, [animate]);

  const sizeMap = {
    sm: { iconSize: 24, titleSize: 'text-[10px] sm:text-xs', subSize: 'text-[7px] sm:text-[7.5px]' },
    md: { iconSize: 30, titleSize: 'text-[11px] sm:text-sm', subSize: 'text-[7.5px] sm:text-[8.5px]' },
    lg: { iconSize: 38, titleSize: 'text-[12px] sm:text-base', subSize: 'text-[8.5px] sm:text-[10px]' },
    xl: { iconSize: 56, titleSize: 'text-lg sm:text-xl', subSize: 'text-[10px] sm:text-xs' },
    hero: { iconSize: 56, titleSize: 'text-xl sm:text-2xl', subSize: 'text-xs sm:text-sm' },
  };

  const { iconSize, titleSize, subSize } = sizeMap[size];
  const gold = '#C9953D';
  const textColor = variant === 'dark' ? '#F5EDD8' : '#111114';

  /* ---------- Animation engine ----------
     Intro: 5s sketch trace (top-left → down → around → top-left)
     Flood: 0.8s liquid-gold pour-in at 4.7s
     Loop:  seamless 3s diagonal liquid cycle + 5s counter specular sweep
     No outer glow. GPU-accelerated transforms only. */
  const animationStyles = `
    .fbgh-trace {
      fill: transparent;
      stroke: ${gold};
      stroke-width: 2.5px;
      stroke-linejoin: round;
      stroke-linecap: round;
      stroke-dasharray: 100;
      stroke-dashoffset: 100;
      animation: fbgh-draw 5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    .fbgh-liquid {
      opacity: 0;
      animation: fbgh-flood 0.8s 4.7s ease-out forwards;
    }
    .fbgh-sweep-main { animation: fbgh-sweep-main 3s linear infinite; }
    .fbgh-sweep-spec { animation: fbgh-sweep-spec 5s linear infinite; }

    @keyframes fbgh-draw  { to { stroke-dashoffset: 0; } }
    @keyframes fbgh-flood { to { opacity: 1; } }
    @keyframes fbgh-sweep-main {
      from { transform: translate(0px, 0px); }
      to   { transform: translate(1599px, 1599px); }
    }
    @keyframes fbgh-sweep-spec {
      from { transform: translate(0px, 0px); }
      to   { transform: translate(-1599px, -1599px); }
    }
  `;

  return (
    <>
      <style>{animationStyles}</style>
      <div className={`inline-flex items-center gap-2 sm:gap-3 select-none ${className}`}>
        {/* Monogram Logo SVG */}
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 1599 1599"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Faith Based Global Holdings Logo"
          className="flex-shrink-0 transition-transform duration-500 hover:scale-105"
        >
          {animate ? (
            <>
              <defs>
                {/* Logo shape as the liquid container */}
                <clipPath id={`${uid}-clip`}>
                  <path clipRule="evenodd" d={LOGO_PATH} />
                </clipPath>

                {/* Liquid metallic gold — repeating diagonal bands */}
                <linearGradient
                  id={`${uid}-liquid`}
                  gradientUnits="userSpaceOnUse"
                  x1="0" y1="0" x2="1599" y2="1599"
                  spreadMethod="repeat"
                >
                  <stop offset="0%"   stopColor="#8F6420" />
                  <stop offset="30%"  stopColor="#C9953D" />
                  <stop offset="46%"  stopColor="#E8C97E" />
                  <stop offset="52%"  stopColor="#F5EDD8" />
                  <stop offset="58%"  stopColor="#E8C97E" />
                  <stop offset="80%"  stopColor="#C9953D" />
                  <stop offset="100%" stopColor="#8F6420" />
                </linearGradient>

                {/* Sweeping specular highlight — inside the logo only */}
                <linearGradient
                  id={`${uid}-spec`}
                  gradientUnits="userSpaceOnUse"
                  x1="0" y1="0" x2="1599" y2="1599"
                  spreadMethod="repeat"
                >
                  <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="0" />
                  <stop offset="44%"  stopColor="#FFFFFF" stopOpacity="0" />
                  <stop offset="50%"  stopColor="#FFFDF0" stopOpacity="0.45" />
                  <stop offset="56%"  stopColor="#FFFFFF" stopOpacity="0" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Liquid gold body, masked by the logo shape */}
              <g clipPath={`url(#${uid}-clip)`} className="fbgh-liquid">
                <rect className="fbgh-sweep-main" x={-3200} y={-3200} width={8000} height={8000} fill={`url(#${uid}-liquid)`} />
                <rect className="fbgh-sweep-spec" x={-3200} y={-3200} width={8000} height={8000} fill={`url(#${uid}-spec)`} />
              </g>

              {/* Structural trace outline — draws once, remains as crisp edge */}
              <path
                className="fbgh-trace"
                pathLength={100}
                vectorEffect="non-scaling-stroke"
                fillRule="evenodd"
                d={LOGO_PATH}
              />
            </>
          ) : (
            /* Static fallback — identical to your original logo */
            <path fill={gold} fillRule="evenodd" clipRule="evenodd" d={LOGO_PATH} />
          )}
        </svg>

        {/* Brand Wordmark matching user specification */}
        {showText && (
          <div
            className={`flex flex-col justify-center leading-none space-y-0.5 transition-opacity duration-1000 ease-in-out ${
              textVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span
              className={`font-serif tracking-[0.2em] font-semibold uppercase ${titleSize}`}
              style={{ color: textColor }}
            >
              FAITH BASED
            </span>
            <span
              className={`hidden sm:inline-block font-mono tracking-[0.3em] uppercase font-semibold text-champagne-gold ${subSize}`}
            >
              GLOBAL HOLDINGS
            </span>
          </div>
        )}
      </div>
    </>
  );
};
