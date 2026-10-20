/**
 * Utility functions for smooth animations, vectors, and device detection
 */

export const lerp = (start: number, end: number, factor: number): number => {
  return start + (end - start) * factor;
};

export const clamp = (val: number, min: number, max: number): number => {
  return Math.min(Math.max(val, min), max);
};

export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};
