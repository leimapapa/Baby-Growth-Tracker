import { ThemeColors, ThemePreset } from '../types';

export const THEMES: Record<ThemePreset, ThemeColors> = {
  'classic-purple': {
    id: 'classic-purple',
    name: 'Classic Deep Violet',
    bgGradient: 'from-[#1e0048] via-[#32006c] to-[#12002e]',
    cardBg: 'bg-[#2b025b]/85',
    cardBorder: 'border-purple-400/30',
    accent: '#A020F0',
    accentGlow: 'rgba(160, 32, 240, 0.45)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.75)',
    babyFill: '#A020F0',
    sacFill: '#520f8c',
    pillBg: 'bg-purple-900/60'
  },
  'material-lavender': {
    id: 'material-lavender',
    name: 'Material You Lavender',
    bgGradient: 'from-violet-950 via-purple-900 to-indigo-950',
    cardBg: 'bg-violet-900/40',
    cardBorder: 'border-violet-300/25',
    accent: '#c084fc',
    accentGlow: 'rgba(192, 132, 252, 0.4)',
    textPrimary: '#f5f3ff',
    textSecondary: '#ddd6fe',
    babyFill: '#c084fc',
    sacFill: '#5b21b6',
    pillBg: 'bg-violet-500/20'
  },
  'material-peach': {
    id: 'material-peach',
    name: 'Material You Warm Peach',
    bgGradient: 'from-amber-950 via-rose-950 to-orange-950',
    cardBg: 'bg-rose-900/35',
    cardBorder: 'border-rose-300/25',
    accent: '#fb7185',
    accentGlow: 'rgba(251, 113, 133, 0.4)',
    textPrimary: '#fff1f2',
    textSecondary: '#fecdd3',
    babyFill: '#fb7185',
    sacFill: '#9f1239',
    pillBg: 'bg-rose-500/20'
  },
  'material-sage': {
    id: 'material-sage',
    name: 'Material You Botanical Sage',
    bgGradient: 'from-emerald-950 via-teal-950 to-slate-950',
    cardBg: 'bg-emerald-900/35',
    cardBorder: 'border-emerald-300/25',
    accent: '#34d399',
    accentGlow: 'rgba(52, 211, 153, 0.4)',
    textPrimary: '#ecfdf5',
    textSecondary: '#a7f3d0',
    babyFill: '#34d399',
    sacFill: '#065f46',
    pillBg: 'bg-emerald-500/20'
  },
  'material-blue': {
    id: 'material-blue',
    name: 'Material You Sky Breeze',
    bgGradient: 'from-sky-950 via-blue-950 to-indigo-950',
    cardBg: 'bg-sky-900/35',
    cardBorder: 'border-sky-300/25',
    accent: '#38bdf8',
    accentGlow: 'rgba(56, 189, 248, 0.4)',
    textPrimary: '#f0f9ff',
    textSecondary: '#bae6fd',
    babyFill: '#38bdf8',
    sacFill: '#0369a1',
    pillBg: 'bg-sky-500/20'
  },
  'oled-dark': {
    id: 'oled-dark',
    name: 'Pixel AMOLED Midnight',
    bgGradient: 'from-black via-zinc-950 to-neutral-950',
    cardBg: 'bg-zinc-900/80',
    cardBorder: 'border-zinc-700/40',
    accent: '#e2e8f0',
    accentGlow: 'rgba(255, 255, 255, 0.25)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.65)',
    babyFill: '#e2e8f0',
    sacFill: '#27272a',
    pillBg: 'bg-zinc-800'
  }
};
