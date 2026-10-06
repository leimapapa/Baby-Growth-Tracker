import React, { useMemo } from 'react';
import { UTERUS_SAC_PATH } from '../data/svgKeyframes';
import { getInterpolatedFetalPaths, weekToProgressValue } from '../data/pathInterpolator';

interface BabySvgProps {
  progressValue?: number; // 0 to 252 (pregnancy days 28 to 280)
  week?: number; // 4 to 40
  daysInWeek?: number; // 0 to 6
  babyColor?: string;
  sacColor?: string;
  className?: string;
  showSac?: boolean;
  glow?: boolean;
}

export const BabySvg: React.FC<BabySvgProps> = ({
  progressValue,
  week = 24,
  daysInWeek = 0,
  babyColor = '#A020F0',
  sacColor = '#3b0764',
  className = 'w-full h-full',
  showSac = true,
  glow = true,
}) => {
  // Compute normalized progressValue (0 to 252)
  const effectiveProgress = useMemo(() => {
    if (typeof progressValue === 'number') {
      return Math.max(0, Math.min(252, progressValue));
    }
    return weekToProgressValue(week, daysInWeek);
  }, [progressValue, week, daysInWeek]);

  // Compute continuously interpolated SVG path strings for every day/fraction
  const paths = useMemo(() => {
    return getInterpolatedFetalPaths(effectiveProgress);
  }, [effectiveProgress]);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {glow && (
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-30 pointer-events-none transition-colors duration-500"
          style={{ backgroundColor: babyColor }}
        />
      )}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full max-h-full drop-shadow-md select-none"
        aria-label={`Fetal development graphic at ${effectiveProgress + 28} gestational days`}
      >
        {/* Gestational sac / Uterus outline */}
        {showSac && (
          <path
            d={UTERUS_SAC_PATH}
            fill={sacColor}
            fillOpacity="0.5"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="0.8"
            className="transition-colors duration-500"
          />
        )}

        {/* Fetal Anatomy: Continuously interpolated paths across all gestational stages */}
        <g
          fill={babyColor}
          stroke="rgba(0,0,0,0.4)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0.5"
          className="transition-colors duration-500"
        >
          {/* Umbilical cord */}
          <path
            className="umbilical"
            d={paths.umbilical}
          />

          {/* Body and head base */}
          <path
            className="bodyHead"
            d={paths.bodyHead}
          />

          {/* Developing arm / hand */}
          <path
            className="arm"
            d={paths.arm}
          />

          {/* Cranium / Head */}
          <path
            className="head"
            d={paths.head}
          />

          {/* Eye and ear details */}
          <path
            className="eyeEar"
            d={paths.eyeEar}
          />
        </g>
      </svg>
    </div>
  );
};
