export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function remap(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) {
  const t = clamp((value - inMin) / (inMax - inMin), 0, 1);
  return lerp(outMin, outMax, t);
}

/** Hero: zoom in through first half of scroll, ease back out by the end (no snap). */
export function heroScrollZoom(progress: number, min = 1, max = 1.34) {
  const p = clamp(progress, 0, 1);
  if (p <= 0.5) {
    const t = p / 0.5;
    const ease = 1 - Math.pow(1 - t, 2);
    return lerp(min, max, ease);
  }
  const t = (p - 0.5) / 0.5;
  const ease = t * t * (3 - 2 * t);
  return lerp(max, min, ease);
}

/** Process: step-based zoom; peak on final step (04 / Ship & Scale). */
export function processScrollZoom(progress: number, activeStep: number, stepCount: number) {
  const stepTargets = [1.04, 1.12, 1.2, 1.38];
  const target = stepTargets[clamp(activeStep, 0, stepCount - 1)] ?? 1.38;
  const stepSlice = 1 / stepCount;
  const local = clamp((progress - activeStep * stepSlice) / stepSlice, 0, 1);
  const eased = local * local * (3 - 2 * local);
  const prev = activeStep === 0 ? 1 : (stepTargets[activeStep - 1] ?? 1);
  let scale = lerp(prev, target, eased);
  if (activeStep === stepCount - 1 && local > 0.5) {
    const tail = (local - 0.5) / 0.5;
    scale = lerp(scale, 1.42, tail * tail);
  }
  return scale;
}
