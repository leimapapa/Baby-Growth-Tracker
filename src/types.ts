export type ThemePreset =
  | 'classic-purple'
  | 'material-lavender'
  | 'material-peach'
  | 'material-sage'
  | 'material-blue'
  | 'oled-dark';

export interface ThemeColors {
  id: ThemePreset;
  name: string;
  bgGradient: string;
  cardBg: string;
  cardBorder: string;
  accent: string;
  accentGlow: string;
  textPrimary: string;
  textSecondary: string;
  babyFill: string;
  sacFill: string;
  pillBg: string;
}

export interface WeekDetail {
  week: number;
  fruitName: string;
  fruitPath: string;
  lengthCm: string;
  lengthIn: string;
  weightG: string;
  weightOz: string;
  milestoneTitle: string;
  milestoneDesc: string;
  trimester: 1 | 2 | 3;
}
