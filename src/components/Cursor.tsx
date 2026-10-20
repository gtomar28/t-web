import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { isTouchDevice } from '../utils/math';

interface CursorProps {
  reducedMotion?: boolean;
}

export const Cursor: React.FC<CursorProps> = ({ reducedMotion = false }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | '3d' | 'drag'>('default');
  const [cursorLabel, setCursorLabel] = useState<string>('');
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (isTouchDevice() || reducedMotion) {
      setIsTouch(true);
      document.body.classList.remove('custom-cursor-active');
      return;
    }

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, input, [role="button"], .interactive-target');
      const canvasTarget = target.closest('#three-canvas-wrapper, canvas');
      const customLabel = target.closest('[data-cursor-label]')?.getAttribute('data-cursor-label');

      if (customLabel) {
        setCursorType('pointer');
        setCursorLabel(customLabel);
      } else if (canvasTarget) {
        setCursorType('3d');
        setCursorLabel('TILT 3D');
      } else if (interactive) {
        setCursorType('pointer');
        setCursorLabel('');
      } else {
        setCursorType('default');
        setCursorLabel('');
      }
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [reducedMotion, visible]);

  if (isTouch || reducedMotion || !visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Center Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#E8A9C2] shadow-[0_0_12px_#E8A9C2]"
        animate={{
          x: pos.x - 4,
          y: pos.y - 4,
          scale: cursorType === 'pointer' ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 450, mass: 0.2 }}
      />

      {/* Trailing Fluid Halo */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[#B9A6D1]/60 flex items-center justify-center backdrop-blur-[1px]"
        animate={{
          x: pos.x - (cursorType === '3d' ? 36 : cursorType === 'pointer' ? 28 : 16),
          y: pos.y - (cursorType === '3d' ? 36 : cursorType === 'pointer' ? 28 : 16),
          width: cursorType === '3d' ? 72 : cursorType === 'pointer' ? 56 : 32,
          height: cursorType === '3d' ? 72 : cursorType === 'pointer' ? 56 : 32,
          backgroundColor:
            cursorType === '3d'
              ? 'rgba(107, 74, 135, 0.25)'
              : cursorType === 'pointer'
              ? 'rgba(232, 169, 194, 0.18)'
              : 'rgba(42, 24, 48, 0.05)',
          borderColor: cursorType === '3d' ? '#E8A9C2' : cursorType === 'pointer' ? '#E8A9C2' : '#B9A6D1',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 280, mass: 0.4 }}
      >
        {cursorLabel && (
          <span className="font-mono-accent text-[9px] uppercase tracking-wider text-[#F8F6FB] font-bold px-1 select-none text-center leading-none">
            {cursorLabel}
          </span>
        )}
      </motion.div>
    </div>
  );
};
