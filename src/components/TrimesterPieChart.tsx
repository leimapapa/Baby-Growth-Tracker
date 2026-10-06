import React from 'react';

// SVG Center = (16, 16), Radius = 13.
// 3 equal sectors (120° each, 114° arc + 6° clean dividing gaps):
// 1. Top-Left (1st Trimester): 153° to 267°, centered at 210° (upper-left)
// 2. Bottom (2nd Trimester):   33° to 147°, centered at 90° (bottom)
// 3. Top-Right (3rd Trimester): 273° to 387° (27°), centered at 330° (upper-right)

const topLeftD = 'M 14.96 15.40 L 4.42 21.90 A 13 13 0 0 1 15.32 3.02 Z';
const bottomD = 'M 16.00 17.20 L 26.90 23.08 A 13 13 0 0 1 5.10 23.08 Z';
const topRightD = 'M 17.04 15.40 L 16.68 3.02 A 13 13 0 0 1 27.58 21.90 Z';

interface TrimesterPieChartProps {
  trimester: 1 | 2 | 3;
  accentColor?: string;
  size?: number; // default 24
  className?: string;
}

export const TrimesterPieChart: React.FC<TrimesterPieChartProps> = ({
  trimester,
  accentColor = '#A020F0',
  size = 24,
  className = '',
}) => {
  // Cumulative fill logic as specified:
  // - 1st Trimester: 1st (Top-Left) is filled; 2nd and 3rd are unfilled.
  // - 2nd Trimester: 1st (Top-Left) AND 2nd (Bottom) are filled; 3rd is unfilled.
  // - 3rd Trimester: 1st (Top-Left), 2nd (Bottom), AND 3rd (Top-Right) are all filled!
  const isS1Filled = trimester >= 1;
  const isS2Filled = trimester >= 2;
  const isS3Filled = trimester >= 3;

  const unfilledBg = 'rgba(255, 255, 255, 0.14)';
  const unfilledStroke = 'rgba(255, 255, 255, 0.3)';
  const filledStroke = 'rgba(255, 255, 255, 0.95)';

  const tooltipText =
    trimester === 1
      ? '1st Trimester (Weeks 1–13) • 1 of 3 filled'
      : trimester === 2
      ? '2nd Trimester (Weeks 14–27) • 2 of 3 filled'
      : '3rd Trimester (Weeks 28–40+) • 3 of 3 filled';

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 group ${className}`}
      title={tooltipText}
      role="img"
      aria-label={tooltipText}
    >
      <svg
        viewBox="0 0 32 32"
        width={size}
        height={size}
        className="drop-shadow-sm select-none transition-transform duration-200 group-hover:scale-105"
      >
        {/* Section 1: 1st Trimester (Top-Left) */}
        <path
          d={topLeftD}
          fill={isS1Filled ? accentColor : unfilledBg}
          stroke={isS1Filled ? filledStroke : unfilledStroke}
          strokeWidth={isS1Filled ? '1' : '0.6'}
          className="transition-colors duration-300"
        />

        {/* Section 2: 2nd Trimester (Bottom) */}
        <path
          d={bottomD}
          fill={isS2Filled ? accentColor : unfilledBg}
          stroke={isS2Filled ? filledStroke : unfilledStroke}
          strokeWidth={isS2Filled ? '1' : '0.6'}
          className="transition-colors duration-300"
        />

        {/* Section 3: 3rd Trimester (Top-Right) */}
        <path
          d={topRightD}
          fill={isS3Filled ? accentColor : unfilledBg}
          stroke={isS3Filled ? filledStroke : unfilledStroke}
          strokeWidth={isS3Filled ? '1' : '0.6'}
          className="transition-colors duration-300"
        />
      </svg>
    </div>
  );
};
