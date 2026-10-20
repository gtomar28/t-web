import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

export type HomeSceneId =
  | "hero"
  | "services"
  | "technology"
  | "kiduart"
  | "process"
  | "about"
  | "contact";

type TrackMap = Partial<
  Record<HomeSceneId, React.RefObject<HTMLElement | null>>
>;

interface HomeSceneContextValue {
  tracks: TrackMap;
  registerTrack: (
    id: HomeSceneId,
    ref: React.RefObject<HTMLElement | null> | null
  ) => void;
  /** Services lattice focus 0-2 */
  latticeFocus: number | null;
  setLatticeFocus: (i: number | null) => void;
  /** Technology layer 0-4 */
  layerFocus: number | null;
  setLayerFocus: (i: number | null) => void;
  /** Kiduart journey step 0-n */
  campusStep: number;
  setCampusStep: (i: number) => void;
  /** Process active stage 0-4 */
  processStage: number;
  setProcessStage: (i: number) => void;
  /** Contact engagement track 0-2 */
  contactTrack: number;
  setContactTrack: (i: number) => void;
  /** About principle index */
  aboutPrinciple: number | null;
  setAboutPrinciple: (i: number | null) => void;
  reducedMotion: boolean;
  highQuality3D: boolean;
  mousePos: { x: number; y: number };
  scrollProgress: number;
  disassembled: boolean;
  setDisassembled: (v: boolean) => void;
  hoveredCube: number | null;
  onCubeHover: (i: number | null) => void;
  onEasterEggTrigger?: () => void;
  onOpenArchitectureModal?: (index?: number | null) => void;
}

const HomeSceneContext = createContext<HomeSceneContextValue | null>(null);

export function useHomeScene() {
  const ctx = useContext(HomeSceneContext);
  if (!ctx) {
    throw new Error("useHomeScene must be used within HomeSceneProvider");
  }
  return ctx;
}

export function useHomeSceneOptional() {
  return useContext(HomeSceneContext);
}

interface ProviderProps {
  children: React.ReactNode;
  reducedMotion?: boolean;
  highQuality3D?: boolean;
  mousePos?: { x: number; y: number };
  scrollProgress?: number;
  hoveredCube?: number | null;
  onCubeHover?: (i: number | null) => void;
  onEasterEggTrigger?: () => void;
  onOpenArchitectureModal?: (index?: number | null) => void;
}

export const HomeSceneProvider: React.FC<ProviderProps> = ({
  children,
  reducedMotion = false,
  highQuality3D = true,
  mousePos = { x: 0, y: 0 },
  scrollProgress = 0,
  hoveredCube = null,
  onCubeHover,
  onEasterEggTrigger,
  onOpenArchitectureModal,
}) => {
  const [tracks, setTracks] = useState<TrackMap>({});
  const [latticeFocus, setLatticeFocus] = useState<number | null>(null);
  const [layerFocus, setLayerFocus] = useState<number | null>(null);
  const [campusStep, setCampusStep] = useState(0);
  const [processStage, setProcessStage] = useState(0);
  const [contactTrack, setContactTrack] = useState(1);
  const [aboutPrinciple, setAboutPrinciple] = useState<number | null>(null);
  const [disassembled, setDisassembled] = useState(false);
  const [, bump] = useState(0);

  const registerTrack = useCallback(
    (id: HomeSceneId, ref: React.RefObject<HTMLElement | null> | null) => {
      setTracks((prev) => {
        if (ref === null) {
          if (!(id in prev)) return prev;
          const next = { ...prev };
          delete next[id];
          return next;
        }
        if (prev[id] === ref) return prev;
        return { ...prev, [id]: ref };
      });
      // Force host re-eval when DOM attaches
      bump((n) => n + 1);
    },
    []
  );

  const value = useMemo<HomeSceneContextValue>(
    () => ({
      tracks,
      registerTrack,
      latticeFocus,
      setLatticeFocus,
      layerFocus,
      setLayerFocus,
      campusStep,
      setCampusStep,
      processStage,
      setProcessStage,
      contactTrack,
      setContactTrack,
      aboutPrinciple,
      setAboutPrinciple,
      reducedMotion,
      highQuality3D,
      mousePos,
      scrollProgress,
      disassembled,
      setDisassembled,
      hoveredCube,
      onCubeHover: onCubeHover ?? (() => undefined),
      onEasterEggTrigger,
      onOpenArchitectureModal,
    }),
    [
      tracks,
      registerTrack,
      latticeFocus,
      layerFocus,
      campusStep,
      processStage,
      contactTrack,
      aboutPrinciple,
      reducedMotion,
      highQuality3D,
      mousePos,
      scrollProgress,
      disassembled,
      hoveredCube,
      onCubeHover,
      onEasterEggTrigger,
      onOpenArchitectureModal,
    ]
  );

  return (
    <HomeSceneContext.Provider value={value}>{children}</HomeSceneContext.Provider>
  );
};

/** Stable empty ref helper for typing */
export function useSceneTrackRef() {
  return useRef<HTMLElement | null>(null);
}
