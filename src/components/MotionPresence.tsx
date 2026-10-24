import { AnimatePresence } from "motion/react";
import type { ReactNode } from "react";

export function MotionPresence({ children }: { children: ReactNode }) {
  return <AnimatePresence mode="sync">{children}</AnimatePresence>;
}
