import React from 'react';

interface FruitIconProps {
  week: number;
  className?: string;
  size?: number;
}

export const FruitIcon: React.FC<FruitIconProps> = ({ week, className = 'w-6 h-6', size = 24 }) => {
  const clampedWeek = Math.max(4, Math.min(40, Math.round(week)));

  const renderGraphic = () => {
    switch (clampedWeek) {
      case 4: // Poppy Seed
        return (
          <g>
            <circle cx="12" cy="12" r="6" fill="#3B2D26" />
            <circle cx="10" cy="10" r="1.5" fill="#6B5347" />
            <circle cx="13" cy="13" r="1" fill="#8D7061" />
            <circle cx="8" cy="14" r="2.5" fill="#2E211B" />
            <circle cx="15.5" cy="10.5" r="2" fill="#4A3B32" />
          </g>
        );

      case 5: // Sesame Seed
        return (
          <g>
            <path
              d="M12 4C9 8 8 13 8 16a4 4 0 0 0 8 0c0-3-1-8-4-12z"
              fill="#F5E6CA"
              stroke="#D4B996"
              strokeWidth="0.8"
            />
            <path d="M11 8c-0.8 2.5-1 5-0.8 7" stroke="#E3CBA8" strokeWidth="0.8" strokeLinecap="round" />
            <ellipse cx="12.5" cy="15" rx="1.5" ry="2.5" fill="#FAF1DF" opacity="0.8" />
          </g>
        );

      case 6: // Lentil
        return (
          <g>
            <ellipse cx="12" cy="12" rx="7.5" ry="5.5" fill="#E28743" stroke="#B85E22" strokeWidth="0.8" />
            <ellipse cx="11" cy="10.5" rx="5" ry="3.2" fill="#F4A261" />
            <ellipse cx="10" cy="9.5" rx="2.5" ry="1.5" fill="#FCEADE" opacity="0.7" />
          </g>
        );

      case 7: // Blueberry
        return (
          <g>
            <circle cx="12" cy="12.5" r="7.5" fill="#3A506B" />
            <circle cx="12" cy="12.5" r="7.5" fill="url(#blueberryGrad)" />
            {/* Crown star */}
            <path
              d="M10 6.5l1.5 1 1-1.5 1 1.5 1.5-1-0.5 1.8 1.5 1-1.8 0.5-0.2 1.8-1.5-1-1.5 1-0.2-1.8-1.8-0.5 1.5-1z"
              fill="#222C3D"
            />
            <circle cx="12" cy="8.5" r="1.5" fill="#1C2541" />
            <ellipse cx="9" cy="11" rx="2" ry="1.2" fill="#78909C" opacity="0.6" />
            <defs>
              <radialGradient id="blueberryGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#5BC0BE" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#4361EE" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#1D2A44" />
              </radialGradient>
            </defs>
          </g>
        );

      case 8: // Raspberry
        return (
          <g>
            <circle cx="12" cy="13" r="6" fill="#C2185B" />
            {/* Drupelets */}
            <circle cx="9" cy="10" r="2.2" fill="#E91E63" />
            <circle cx="15" cy="10" r="2.2" fill="#E91E63" />
            <circle cx="12" cy="9" r="2.2" fill="#FF4081" />
            <circle cx="8" cy="13.5" r="2.2" fill="#C2185B" />
            <circle cx="12" cy="13" r="2.4" fill="#E91E63" />
            <circle cx="16" cy="13.5" r="2.2" fill="#AD1457" />
            <circle cx="10" cy="16.5" r="2.2" fill="#AD1457" />
            <circle cx="14" cy="16.5" r="2.2" fill="#880E4F" />
            {/* Green calyx stem */}
            <path d="M12 4v3M10 6l2 1 2-1" stroke="#4CAF50" strokeWidth="1.2" strokeLinecap="round" />
          </g>
        );

      case 9: // Grape
        return (
          <g>
            {/* Stem */}
            <path d="M12 3v3c0 1 1 1.5 2 1.5" stroke="#795548" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M13 4c2-0.5 3 0.5 3.5 1.5" stroke="#4CAF50" strokeWidth="1" fill="none" strokeLinecap="round" />
            {/* Cluster */}
            <circle cx="10" cy="8.5" r="2.5" fill="#7B1FA2" />
            <circle cx="14" cy="8.5" r="2.5" fill="#9C27B0" />
            <circle cx="8" cy="12" r="2.5" fill="#6A1B9A" />
            <circle cx="12" cy="12" r="2.8" fill="#AB47BC" />
            <circle cx="16" cy="12" r="2.5" fill="#7B1FA2" />
            <circle cx="10" cy="15.5" r="2.5" fill="#6A1B9A" />
            <circle cx="14" cy="15.5" r="2.5" fill="#8E24AA" />
            <circle cx="12" cy="18.5" r="2.2" fill="#4A148C" />
            <ellipse cx="11.5" cy="11.5" rx="1" ry="0.6" fill="#E1BEE7" opacity="0.7" />
          </g>
        );

      case 10: // Strawberry
        return (
          <g>
            {/* Strawberry berry heart */}
            <path
              d="M12 21C8 17 5 13 5 9.5a4.5 4.5 0 0 1 7-3.7 4.5 4.5 0 0 1 7 3.7c0 3.5-3 7.5-7 11.5z"
              fill="#E53935"
            />
            <path
              d="M12 20C8.5 16.5 6 13 6 10a3.5 3.5 0 0 1 5.5-2.9L12 8l0.5-0.9A3.5 3.5 0 0 1 18 10c0 3-2.5 6.5-6 10z"
              fill="#D32F2F"
            />
            {/* Yellow seeds */}
            <circle cx="8.5" cy="10" r="0.6" fill="#FFEB3B" />
            <circle cx="12" cy="10" r="0.6" fill="#FFEB3B" />
            <circle cx="15.5" cy="10" r="0.6" fill="#FFEB3B" />
            <circle cx="10" cy="13" r="0.6" fill="#FFEB3B" />
            <circle cx="14" cy="13" r="0.6" fill="#FFEB3B" />
            <circle cx="12" cy="16" r="0.6" fill="#FFEB3B" />
            {/* Green crown */}
            <path
              d="M12 3v2.5M7 6c2 1 3 0.5 5 2 2-1.5 3-1 5-2-1 2-2 3-5 3-3 0-4-1-5-3z"
              fill="#43A047"
              stroke="#2E7D32"
              strokeWidth="0.5"
            />
          </g>
        );

      case 11: // Fig
        return (
          <g>
            <path
              d="M12 4c-1 2-5 6-5 10a5 5 0 0 0 10 0c0-4-4-8-5-10z"
              fill="#6A1B9A"
            />
            <path
              d="M12 5c-0.8 1.8-4 5.5-4 9a4 4 0 0 0 8 0c0-3.5-3.2-7.2-4-9z"
              fill="#8E24AA"
            />
            <ellipse cx="10" cy="14" rx="2" ry="3" fill="#AB47BC" opacity="0.6" />
            {/* Stem */}
            <path d="M12 2v3" stroke="#558B2F" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        );

      case 12: // Lime
        return (
          <g>
            <circle cx="12" cy="12" r="8" fill="#43A047" stroke="#2E7D32" strokeWidth="0.8" />
            <circle cx="12" cy="12" r="6.2" fill="#7CB342" />
            <circle cx="12" cy="12" r="5" fill="#C0CA33" />
            <path d="M12 7v10M7 12h10M8.5 8.5l7 7M8.5 15.5l7-7" stroke="#DCEDC8" strokeWidth="0.8" />
            <circle cx="12" cy="12" r="1.5" fill="#F1F8E9" />
          </g>
        );

      case 13: // Plum
        return (
          <g>
            <ellipse cx="12" cy="13" rx="7.5" ry="8" fill="#4A148C" />
            <path
              d="M12 5c-4 0-7 3.5-7 8a7 7 0 0 0 7 8c1 0 2-0.5 2-0.5"
              fill="#7B1FA2"
            />
            <ellipse cx="9" cy="11" rx="2.5" ry="4" fill="#BA68C8" opacity="0.5" />
            {/* Leaf and stem */}
            <path d="M12 2.5v3M12 4c2-2 4-1 5 0-1 1-3 1.5-5 0z" stroke="#33691E" strokeWidth="1" fill="#689F38" />
          </g>
        );

      case 14: // Lemon
        return (
          <g>
            <path
              d="M20 12c-1.5 4.5-5 8-9.5 8C6 20 3.5 16.5 2 12c1.5-4.5 5-8 9.5-8 4.5 0 7 3.5 8.5 8z"
              fill="#FDD835"
              stroke="#FBC02D"
              strokeWidth="0.8"
            />
            <ellipse cx="10" cy="10" rx="4" ry="2.5" fill="#FFF59D" opacity="0.7" />
            {/* Leaf */}
            <path d="M19 6c-2 0-3 1-3 3 1.5 0 3-1 3-3z" fill="#43A047" stroke="#2E7D32" strokeWidth="0.6" />
          </g>
        );

      case 15: // Apple
        return (
          <g>
            <path
              d="M12 7c-1.5-1.5-4-1.5-5.5 0-2 2-2 6 0 9 1.5 2.2 4 2 5.5 0.5 1.5 1.5 4 1.7 5.5-0.5 2-3 2-7 0-9C16 5.5 13.5 5.5 12 7z"
              fill="#E53935"
              stroke="#C62828"
              strokeWidth="0.8"
            />
            <ellipse cx="9" cy="11" rx="2" ry="3.5" fill="#FF8A80" opacity="0.5" />
            {/* Stem & Leaf */}
            <path d="M12 3.5c0 2 0.5 3.5 0 4" stroke="#5D4037" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M12 4.5c2-2 4-1 4.5 0.5-1 1-3 1-4.5-0.5z" fill="#4CAF50" stroke="#2E7D32" strokeWidth="0.5" />
          </g>
        );

      case 16: // Avocado
        return (
          <g>
            {/* Skin */}
            <path
              d="M12 3.5c-3 0-5.5 4-5.5 9.5 0 4.5 2.5 7.5 5.5 7.5s5.5-3 5.5-7.5c0-5.5-2.5-9.5-5.5-9.5z"
              fill="#2E7D32"
              stroke="#1B5E20"
              strokeWidth="0.8"
            />
            {/* Flesh */}
            <path
              d="M12 5c-2.3 0-4.2 3.5-4.2 8 0 3.8 1.9 6.2 4.2 6.2s4.2-2.4 4.2-6.2c0-4.5-1.9-8-4.2-8z"
              fill="#C8E6C9"
            />
            <path
              d="M12 6.5c-1.8 0-3.3 2.8-3.3 6.5 0 3 1.5 5 3.3 5s3.3-2 3.3-5c0-3.7-1.5-6.5-3.3-6.5z"
              fill="#E8F5E9"
            />
            {/* Seed pit */}
            <circle cx="12" cy="14" r="3" fill="#6D4C41" stroke="#4E342E" strokeWidth="0.8" />
            <ellipse cx="11" cy="13" rx="1" ry="1.5" fill="#8D6E63" opacity="0.8" />
          </g>
        );

      case 17: // Turnip
        return (
          <g>
            {/* Greens */}
            <path d="M12 7V2M10 6C8 3 9 2 9 2M14 6c2-3 1-4 1-4" stroke="#43A047" strokeWidth="1.2" strokeLinecap="round" />
            {/* Turnip bulb */}
            <path
              d="M12 7c-4 0-6.5 2.5-6.5 6 0 4 5 7.5 6.5 8.5 1.5-1 6.5-4.5 6.5-8.5 0-3.5-2.5-6-6.5-6z"
              fill="#F5F5F5"
              stroke="#E0E0E0"
              strokeWidth="0.8"
            />
            {/* Purple shoulder */}
            <path
              d="M12 7c-4 0-6.5 2-6.5 4.5 1.5 1 4 1.5 6.5 1.5s5-0.5 6.5-1.5C18.5 9 16 7 12 7z"
              fill="#AB47BC"
            />
          </g>
        );

      case 18: // Bell Pepper
        return (
          <g>
            {/* Stem */}
            <path d="M12 3v3" stroke="#2E7D32" strokeWidth="1.8" strokeLinecap="round" />
            {/* Pepper Lobes */}
            <path
              d="M7.5 6c-2 0-3.5 2-3.5 5.5 0 4.5 2 7.5 4.5 7.5.5 0 1-.2 1.5-.5M16.5 6c2 0 3.5 2 3.5 5.5 0 4.5-2 7.5-4.5 7.5-.5 0-1-.2-1.5-.5"
              fill="#E53935"
              stroke="#C62828"
              strokeWidth="0.8"
            />
            <path
              d="M10 6c-1 0-1.5 1.5-1.5 5.5 0 4 1 7.5 3.5 7.5s3.5-3.5 3.5-7.5c0-4-.5-5.5-1.5-5.5z"
              fill="#FF1744"
              stroke="#C62828"
              strokeWidth="0.8"
            />
            <ellipse cx="11" cy="10" rx="1.5" ry="3.5" fill="#FF8A80" opacity="0.6" />
          </g>
        );

      case 19: // Heirloom Tomato
        return (
          <g>
            <circle cx="12" cy="13" r="7.5" fill="#D32F2F" stroke="#B71C1C" strokeWidth="0.8" />
            <path d="M8 8c1 3 1 7 0 9M16 8c-1 3-1 7 0 9" stroke="#B71C1C" strokeWidth="0.6" fill="none" />
            <ellipse cx="9" cy="11" rx="2" ry="3" fill="#FF8A80" opacity="0.5" />
            {/* Calyx */}
            <path d="M12 5V2.5M9 6l3 1.5 3-1.5M10.5 8.5L12 7l1.5 1.5" stroke="#2E7D32" strokeWidth="1.2" strokeLinecap="round" />
          </g>
        );

      case 20: // Banana
        return (
          <g>
            <path
              d="M18 4c0.5 0 1 0.5 0.8 1.2-1 3.5-3 7-6 10-3 3-6.5 4.5-9.5 4.8-.8 0-1.2-.8-.7-1.4 3-3.2 5.5-6.5 7.5-10 1.5-2.8 4.5-4.5 7.9-4.6z"
              fill="#FDD835"
              stroke="#FBC02D"
              strokeWidth="0.8"
            />
            <path d="M18.2 4.2c-0.2 1-0.8 1.8-1.5 2.5" stroke="#795548" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M3.2 20c0.6-0.2 1.2-0.6 1.8-1.2" stroke="#795548" strokeWidth="1" strokeLinecap="round" />
            <path d="M14 8c-2 3-4.5 6-7.5 8.5" stroke="#FFF59D" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          </g>
        );

      case 21: // Carrot
        return (
          <g>
            {/* Green top */}
            <path d="M17 3l-3 4M19 5l-4 3M15 2l-2 5" stroke="#388E3C" strokeWidth="1.2" strokeLinecap="round" />
            {/* Carrot body */}
            <path
              d="M15.5 6.5c1 1 1 2.5-0.5 3.5L6 19.5c-0.8 0.8-1.8 0.5-2-0.5s0.2-1.5 1-2.2L13.5 7c1-1.2 2-0.5 2 0.5z"
              fill="#FF6D00"
              stroke="#E65100"
              strokeWidth="0.8"
            />
            <path d="M12 9l2 1.5M9.5 12l2 1M7.5 15l1.5 1" stroke="#BF360C" strokeWidth="0.6" strokeLinecap="round" />
          </g>
        );

      case 22: // Spaghetti Squash
        return (
          <g>
            <ellipse cx="12" cy="12.5" rx="6.5" ry="8" fill="#FDD835" stroke="#F57F17" strokeWidth="0.8" />
            <path d="M10 5.5c-1.5 3-1.5 11 0 14M14 5.5c1.5 3 1.5 11 0 14" stroke="#FFF59D" strokeWidth="0.8" fill="none" />
            <path d="M12 3v2.5" stroke="#6D4C41" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        );

      case 23: // Large Mango
        return (
          <g>
            <path
              d="M12 3.5c-3.5 0-6 3.5-6 8 0 5 3 8.5 7 8.5 4.5 0 6.5-4 6.5-8.5 0-4-3.5-8-7.5-8z"
              fill="#FFA000"
              stroke="#E65100"
              strokeWidth="0.8"
            />
            <path
              d="M7 11c0-4 2.5-7 5-7 1.5 0 2.5 0.5 3.5 1.5-1.5 2-2 5-2 8 0 2.5 0.5 4.5 1.5 6-3 0-5.5-3-5.5-7z"
              fill="#FF7043"
              opacity="0.75"
            />
            <ellipse cx="15.5" cy="12" rx="1.5" ry="3.5" fill="#FFE082" opacity="0.6" />
            <path d="M12 2v2" stroke="#5D4037" strokeWidth="1.2" strokeLinecap="round" />
          </g>
        );

      case 24: // Ear of Corn
        return (
          <g>
            {/* Husk leaves */}
            <path d="M7 17c1-4 2.5-9 5-13M17 17c-1-4-2.5-9-5-13" stroke="#66BB6A" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Cob */}
            <rect x="9.5" y="6" width="5" height="12" rx="2.5" fill="#FDD835" stroke="#F57F17" strokeWidth="0.8" />
            {/* Kernels */}
            <circle cx="11" cy="8" r="0.8" fill="#FFF59D" />
            <circle cx="13" cy="8" r="0.8" fill="#FFF59D" />
            <circle cx="11" cy="10.5" r="0.8" fill="#FFF59D" />
            <circle cx="13" cy="10.5" r="0.8" fill="#FFF59D" />
            <circle cx="11" cy="13" r="0.8" fill="#FFF59D" />
            <circle cx="13" cy="13" r="0.8" fill="#FFF59D" />
            <circle cx="11" cy="15.5" r="0.8" fill="#FFF59D" />
            <circle cx="13" cy="15.5" r="0.8" fill="#FFF59D" />
            <path d="M12 18v3" stroke="#8D6E63" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        );

      case 25: // Rutabaga
        return (
          <g>
            <path
              d="M12 6c-4.5 0-7 3-7 7s5 7 7 8c2-1 7-4 7-8s-2.5-7-7-7z"
              fill="#FFF9C4"
              stroke="#FBC02D"
              strokeWidth="0.8"
            />
            {/* Purple crown */}
            <path
              d="M12 6c-4.5 0-7 2.5-7 5 2 1 4.5 1.5 7 1.5s5-0.5 7-1.5c0-2.5-2.5-5-7-5z"
              fill="#7B1FA2"
            />
            <path d="M12 2v4" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        );

      case 26: // Zucchini
        return (
          <g>
            <path
              d="M16 4c0.8 0 1.2 0.8 1 1.5L14 17.5c-0.8 2.5-3 4-5.5 3.5s-4-2.5-4-5l2-11c0.2-1 1-1.5 2-1.5h7.5z"
              fill="#2E7D32"
              stroke="#1B5E20"
              strokeWidth="0.8"
            />
            <path d="M11 6l-2 11" stroke="#4CAF50" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
            <path d="M15 5l-1.5 10" stroke="#81C784" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
          </g>
        );

      case 27: // Cauliflower
        return (
          <g>
            {/* Outer green wrapper leaves */}
            <path d="M4 14c1 4 4 6 8 6s7-2 8-6c-2-1-4-1-6 1-2-3-4-3-6 0-1-1-3-1-4-1z" fill="#43A047" stroke="#2E7D32" strokeWidth="0.8" />
            {/* Head florets */}
            <circle cx="12" cy="11" r="5" fill="#F5F5F5" />
            <circle cx="9" cy="9.5" r="3" fill="#EEEEEE" />
            <circle cx="15" cy="9.5" r="3" fill="#EEEEEE" />
            <circle cx="12" cy="7.5" r="3.2" fill="#FAFAFA" />
            <circle cx="8" cy="12.5" r="2.8" fill="#E0E0E0" />
            <circle cx="16" cy="12.5" r="2.8" fill="#E0E0E0" />
          </g>
        );

      case 28: // Eggplant
        return (
          <g>
            {/* Glossy Eggplant body */}
            <path
              d="M12 7c-2 0-3.5 1.5-4 4-0.8 3.5-2.5 5.5-2.5 8 0 2.5 3 4.5 6.5 4.5s6.5-2 6.5-4.5c0-2.5-1.7-4.5-2.5-8-0.5-2.5-2-4-4-4z"
              fill="#4A148C"
              stroke="#311B92"
              strokeWidth="0.8"
            />
            <ellipse cx="9.5" cy="15" rx="1.5" ry="4" fill="#BA68C8" opacity="0.5" />
            {/* Green calyx cap and stem */}
            <path d="M12 2.5v3" stroke="#2E7D32" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M12 5.5l-3 3 1.5-1.5L9 9.5l3-2.5 3 2.5-1.5-2.5L15 8.5z" fill="#43A047" stroke="#2E7D32" strokeWidth="0.6" />
          </g>
        );

      case 29: // Butternut Squash
        return (
          <g>
            <path
              d="M12 4c-1.8 0-3 1.5-3 4 0 2 0.8 3 0.8 4.5C9 14 7 15.5 7 18a5 5 0 0 0 10 0c0-2.5-2-4-2.8-5.5 0-1.5 0.8-2.5 0.8-4.5 0-2.5-1.2-4-3-4z"
              fill="#FFE082"
              stroke="#FFB300"
              strokeWidth="0.8"
            />
            <ellipse cx="10" cy="17" rx="1.8" ry="3" fill="#FFF8E1" opacity="0.6" />
            <path d="M12 2v2.5" stroke="#795548" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        );

      case 30: // Cabbage
        return (
          <g>
            <circle cx="12" cy="12.5" r="7.5" fill="#4CAF50" stroke="#2E7D32" strokeWidth="0.8" />
            {/* Ruffled leaf layers */}
            <path d="M6 10c2-2 5-2 6 0 1-2 4-2 6 0" stroke="#81C784" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M5 14c3 3 5 1 7 3 2-2 4 0 7-3" stroke="#81C784" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <circle cx="12" cy="12" r="3.5" fill="#C8E6C9" />
          </g>
        );

      case 31: // Coconut
        return (
          <g>
            <circle cx="12" cy="12.5" r="7.5" fill="#5D4037" stroke="#3E2723" strokeWidth="0.8" />
            {/* Coconut eyes */}
            <circle cx="10" cy="9.5" r="1" fill="#3E2723" />
            <circle cx="14" cy="9.5" r="1" fill="#3E2723" />
            <circle cx="12" cy="12" r="1.1" fill="#3E2723" />
            <path d="M7 14c1.5 2 3.5 3 6 3" stroke="#8D6E63" strokeWidth="0.8" fill="none" strokeLinecap="round" />
          </g>
        );

      case 32: // Jicama
        return (
          <g>
            <path
              d="M12 5c-4.5 0-7.5 2.5-7.5 6.5 0 4.5 5 8 7.5 9.5 2.5-1.5 7.5-5 7.5-9.5 0-4-3-6.5-7.5-6.5z"
              fill="#D7CCC8"
              stroke="#A1887F"
              strokeWidth="0.8"
            />
            <path d="M12 2v3.5" stroke="#4E342E" strokeWidth="1.2" strokeLinecap="round" />
            <ellipse cx="10" cy="10" rx="3" ry="1.8" fill="#EFEBE9" opacity="0.6" />
          </g>
        );

      case 33: // Pineapple
        return (
          <g>
            {/* Green Crown */}
            <path d="M12 7l-2-4 2 2 2-2-2 4M9 6L6 3l3 2M15 6l3-3-3 2" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            {/* Body */}
            <rect x="7.5" y="7" width="9" height="12" rx="4.5" fill="#FFA000" stroke="#FF6F00" strokeWidth="0.8" />
            {/* Diamond pattern */}
            <path d="M8 10l8 6M8 16l8-6M9 8l6 8M9 18l6-8" stroke="#FFE082" strokeWidth="0.7" fill="none" opacity="0.75" />
          </g>
        );

      case 34: // Cantaloupe
        return (
          <g>
            <circle cx="12" cy="12.5" r="7.5" fill="#D7CCC8" stroke="#8D6E63" strokeWidth="0.8" />
            <circle cx="12" cy="12.5" r="7.5" fill="none" stroke="#FFCC80" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
            {/* Inner glow slice preview */}
            <ellipse cx="10" cy="11" rx="2.5" ry="3" fill="#FFB74D" opacity="0.5" />
          </g>
        );

      case 35: // Honeydew Melon
        return (
          <g>
            <circle cx="12" cy="12.5" r="7.5" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="0.8" />
            <ellipse cx="10.5" cy="10" rx="3" ry="4" fill="#C8E6C9" opacity="0.7" />
            <path d="M12 3.5v2" stroke="#689F38" strokeWidth="1.2" strokeLinecap="round" />
          </g>
        );

      case 36: // Romaine Lettuce
        return (
          <g>
            <path
              d="M12 3c-2.5 0-4.5 3-4.5 8 0 5.5 2.5 9 4.5 10 2-1 4.5-4.5 4.5-10 0-5-2-8-4.5-8z"
              fill="#4CAF50"
              stroke="#2E7D32"
              strokeWidth="0.8"
            />
            <path d="M12 5v14" stroke="#C8E6C9" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M9 10c1.5 2 2 4 3 6M15 10c-1.5 2-2 4-3 6" stroke="#81C784" strokeWidth="0.8" fill="none" />
          </g>
        );

      case 37: // Swiss Chard
        return (
          <g>
            {/* Broad green ruffled leaf */}
            <path
              d="M12 2c-3.5 0-6 3.5-6 8 0 5 3.5 7 6 8.5 2.5-1.5 6-3.5 6-8.5 0-4.5-2.5-8-6-8z"
              fill="#2E7D32"
              stroke="#1B5E20"
              strokeWidth="0.8"
            />
            {/* Magenta-red spine/stem */}
            <path d="M12 3v19" stroke="#E91E63" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 8l4 3 4-3M7 13l5 2 5-2" stroke="#FF4081" strokeWidth="0.8" fill="none" />
          </g>
        );

      case 38: // Rhubarb
        return (
          <g>
            {/* Crimson stalks */}
            <path d="M10 21V5M14 21V5" stroke="#C2185B" strokeWidth="2.2" strokeLinecap="round" />
            {/* Leaf tops */}
            <path d="M7 6c2-3 4-3 5-1 1-2 3-2 5 1-2 1-4 1-5 0-1 1-3 1-5 0z" fill="#4CAF50" stroke="#2E7D32" strokeWidth="0.8" />
          </g>
        );

      case 39: // Watermelon
        return (
          <g>
            {/* Striped melon */}
            <ellipse cx="12" cy="12.5" rx="8" ry="7.5" fill="#2E7D32" stroke="#1B5E20" strokeWidth="0.8" />
            {/* Light green stripes */}
            <path d="M6 9c1.5 3 2 5 0 8M9 7c1 4 1 7-1 11M14 7c1 4 0 7 2 11M17 9c-1 3-1 5 1 8" stroke="#81C784" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          </g>
        );

      case 40: // Pumpkin
      default:
        return (
          <g>
            {/* Stem */}
            <path d="M12 3c0.5 1 0 2 0 3" stroke="#5D4037" strokeWidth="1.8" strokeLinecap="round" />
            {/* Pumpkin Lobes */}
            <ellipse cx="12" cy="13.5" rx="7.5" ry="6.5" fill="#FF6D00" stroke="#E65100" strokeWidth="0.8" />
            <ellipse cx="8.5" cy="13.5" rx="3.5" ry="6" fill="#FF8F00" opacity="0.6" />
            <ellipse cx="15.5" cy="13.5" rx="3.5" ry="6" fill="#FF8F00" opacity="0.6" />
            <ellipse cx="12" cy="13.5" rx="3.8" ry="6.5" fill="#FFA000" />
            <ellipse cx="10" cy="11.5" rx="1.5" ry="3" fill="#FFE082" opacity="0.5" />
          </g>
        );
    }
  };

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`shrink-0 drop-shadow-sm select-none ${className}`}
      aria-label={`Fruit illustration for week ${clampedWeek}`}
    >
      {renderGraphic()}
    </svg>
  );
};
