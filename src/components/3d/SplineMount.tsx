import React, {
  Component,
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
  type ErrorInfo,
  type ReactNode,
} from "react";
import { WowAccent } from "../WowAccent";

const Spline = lazy(() => import("@splinetool/react-spline"));

/**
 * Default public abstract Spline scene (runtime-loadable).
 * Override with VITE_SPLINE_TECH_SCENE for a brand-authored scene.
 */
const DEFAULT_SCENE =
  import.meta.env.VITE_SPLINE_TECH_SCENE ||
  "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode";

interface SplineMountProps {
  className?: string;
  reducedMotion?: boolean;
  sceneUrl?: string;
  caption?: string;
}

class SplineErrorBoundary extends Component<
  { onError: () => void; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    this.props.onError();
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

/**
 * One lazy Spline wow moment — mounts only when near viewport.
 * Falls back to WowAccent layers on reducedMotion / error.
 */
export const SplineMount: React.FC<SplineMountProps> = ({
  className = "",
  reducedMotion = false,
  sceneUrl = DEFAULT_SCENE,
  caption = "Interactive architecture",
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        // Mount near viewport; unmount when far away to free WebGL budget.
        setNear(entry.isIntersecting);
        if (!entry.isIntersecting) {
          setLoaded(false);
        }
      },
      { rootMargin: "120px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const showFallback = reducedMotion || failed;

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      {caption ? (
        <div className="text-[10px] font-mono-accent uppercase tracking-[0.2em] text-[#E8A9C2] mb-2 text-center lg:text-right">
          {caption}
        </div>
      ) : null}

      <div className="relative w-full aspect-square max-h-[320px] rounded-2xl border border-[#B9A6D1]/30 bg-[#1E1024]/70 overflow-hidden">
        {showFallback ? (
          <WowAccent
            kind="layers"
            reducedMotion={reducedMotion}
            className="w-full h-full border-0"
          />
        ) : near ? (
          <Suspense
            fallback={
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-[#E8A9C2]/50 border-t-transparent animate-spin" />
              </div>
            }
          >
            <SplineErrorBoundary onError={() => setFailed(true)}>
              <Spline
                scene={sceneUrl}
                onLoad={() => setLoaded(true)}
                renderOnDemand
                style={{ width: "100%", height: "100%" }}
              />
            </SplineErrorBoundary>
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-8 h-8 rounded-full border-2 border-[#E8A9C2]/50 border-t-transparent animate-spin" />
              </div>
            )}
          </Suspense>
        ) : (
          <WowAccent
            kind="layers"
            reducedMotion
            className="w-full h-full border-0 opacity-80"
          />
        )}
      </div>
    </div>
  );
};
