import React, { useEffect, useRef } from 'react';

interface AmbientParticlesProps {
  count?: number;
  reducedMotion?: boolean;
  className?: string;
  colorScheme?: 'brand' | 'lavender' | 'pink';
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  pulseSpeed: number;
  pulseOffset: number;
}

export const AmbientParticles: React.FC<AmbientParticlesProps> = ({
  count = 35,
  reducedMotion = false,
  className = 'absolute inset-0 pointer-events-none z-0',
  colorScheme = 'brand',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const colors =
      colorScheme === 'brand'
        ? ['#E8A9C2', '#B9A6D1', '#6B4A87', '#241428']
        : colorScheme === 'pink'
        ? ['#E8A9C2', '#241428', '#B9A6D1']
        : ['#B9A6D1', '#6B4A87', '#5C4A6E'];

    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35 - 0.1, // subtle upward drift
        alpha: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        const currentAlpha =
          p.alpha * (0.6 + 0.4 * Math.sin(time * p.pulseSpeed + p.pulseOffset));

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.05, Math.min(1, currentAlpha));
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [count, reducedMotion, colorScheme]);

  if (reducedMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  );
};
