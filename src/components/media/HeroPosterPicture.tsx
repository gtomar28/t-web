import type { CSSProperties } from "react";

type HeroPosterPictureProps = {
  className?: string;
  style?: CSSProperties;
  sizes?: string;
  loading?: "eager" | "lazy";
  decoding?: "sync" | "async" | "auto";
  fetchPriority?: "high" | "low" | "auto";
  onLoad?: () => void;
  posterJpg: string;
  posterJpg640: string;
  posterWebp: string;
  posterWebp640: string;
  objectPosition?: string;
};

/** LCP-friendly hero still with WebP + JPEG fallback. */
export function HeroPosterPicture({
  className = "",
  style,
  sizes = "100vw",
  loading = "eager",
  decoding = "sync",
  fetchPriority = "high",
  onLoad,
  posterJpg,
  posterJpg640,
  posterWebp,
  posterWebp640,
  objectPosition,
}: HeroPosterPictureProps) {
  const webpSet = `${posterWebp640} 640w, ${posterWebp} 1920w`;
  const jpgSet = `${posterJpg640} 640w, ${posterJpg} 1920w`;

  return (
    <picture className={className} style={style}>
      <source type="image/webp" srcSet={webpSet} sizes={sizes} />
      <img
        src={posterJpg640}
        srcSet={jpgSet}
        sizes={sizes}
        alt=""
        decoding={decoding}
        loading={loading}
        className="h-full w-full object-cover"
        style={objectPosition ? { objectPosition } : undefined}
        onLoad={onLoad}
        // @ts-expect-error fetchPriority on img
        fetchPriority={fetchPriority}
      />
    </picture>
  );
}
