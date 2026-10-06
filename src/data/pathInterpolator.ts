import {
  UMBILICAL_KEYFRAMES,
  BODYHEAD_KEYFRAMES,
  ARM_KEYFRAMES,
  HEAD_KEYFRAMES,
  EYEEAR_KEYFRAMES,
} from './svgKeyframes';

interface PreparsedKeyframes {
  template: string[];
  frames: number[][];
}

// Parses keyframe strings once into static string segments and numeric arrays for ultra-fast interpolation
function preparseKeyframeArray(keyframes: string[]): PreparsedKeyframes {
  const numRegex = /-?\d*\.?\d+(?:e[-+]?\d+)?/g;

  // Extract static string chunks between numbers from the first frame
  const firstFrame = keyframes[0];
  const template: string[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  const regex = new RegExp(numRegex);
  while ((match = regex.exec(firstFrame)) !== null) {
    template.push(firstFrame.substring(lastIndex, match.index));
    lastIndex = match.index + match[0].length;
  }
  template.push(firstFrame.substring(lastIndex));

  // Extract numbers for each frame
  const frames = keyframes.map((kf) => {
    const nums = kf.match(numRegex);
    return nums ? nums.map(Number) : [];
  });

  return { template, frames };
}

const PREPARSED = {
  umbilical: preparseKeyframeArray(UMBILICAL_KEYFRAMES),
  bodyHead: preparseKeyframeArray(BODYHEAD_KEYFRAMES),
  arm: preparseKeyframeArray(ARM_KEYFRAMES),
  head: preparseKeyframeArray(HEAD_KEYFRAMES),
  eyeEar: preparseKeyframeArray(EYEEAR_KEYFRAMES),
};

/**
 * Interpolates an array of keyframes based on a continuous float index [0 .. 9]
 */
function interpolateParsed(parsed: PreparsedKeyframes, floatIndex: number): string {
  const clamped = Math.max(0, Math.min(9, floatIndex));
  const i0 = Math.min(8, Math.floor(clamped));
  const i1 = Math.min(9, i0 + 1);
  const t = clamped - i0;

  const numsA = parsed.frames[i0];
  const numsB = parsed.frames[i1];
  const { template } = parsed;

  let result = '';
  const len = numsA.length;

  for (let k = 0; k < len; k++) {
    result += template[k];
    const val = numsA[k] + (numsB[k] - numsA[k]) * t;
    // Format to 2 decimal places, removing unnecessary trailing zeros
    result += Math.round(val * 100) / 100;
  }
  result += template[len];

  return result;
}

export interface FetalInterpolatedPaths {
  umbilical: string;
  bodyHead: string;
  arm: string;
  head: string;
  eyeEar: string;
}

/**
 * Given progressValue (0 to 252, representing pregnancy days 28 to 280),
 * calculates continuous interpolated SVG paths for all fetal anatomy elements.
 */
export function getInterpolatedFetalPaths(progressValue: number): FetalInterpolatedPaths {
  // progressValue is 0 (Week 4) to 252 (Week 40)
  // Float index from 0.0 to 9.0
  const normalized = Math.max(0, Math.min(252, progressValue));
  const floatIndex = (normalized / 252) * 9;

  return {
    umbilical: interpolateParsed(PREPARSED.umbilical, floatIndex),
    bodyHead: interpolateParsed(PREPARSED.bodyHead, floatIndex),
    arm: interpolateParsed(PREPARSED.arm, floatIndex),
    head: interpolateParsed(PREPARSED.head, floatIndex),
    eyeEar: interpolateParsed(PREPARSED.eyeEar, floatIndex),
  };
}

/**
 * Helper to convert gestational week (4 to 40) or week+days into progressValue (0 to 252)
 */
export function weekToProgressValue(week: number, days: number = 0): number {
  const totalDays = week * 7 + days;
  return Math.max(0, Math.min(252, totalDays - 28));
}
