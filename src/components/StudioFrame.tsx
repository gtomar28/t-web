import React from "react";

interface StudioFrameProps {
  src: string;
  alt: string;
  caption: string;
  kicker?: string;
}

/** Same mat + caption rail on every page so paintings read as one studio, not a blog dump. */
export const StudioFrame: React.FC<StudioFrameProps> = ({
  src,
  alt,
  caption,
  kicker = "Studio",
}) => {
  return (
    <figure className="w-full">
      <div className="rounded-[1.6rem] border border-[#B9A6D1]/35 bg-[#160A1C]/90 p-2.5 sm:p-3 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
        <img
          src={src}
          srcSet={
            src.endsWith(".jpg")
              ? `${src.replace(/\.jpg$/i, "-640.jpg")} 640w, ${src} 960w`
              : undefined
          }
          sizes="(max-width: 768px) 92vw, (max-width: 1280px) 45vw, 560px"
          alt={alt}
          width={960}
          height={540}
          loading="lazy"
          decoding="async"
          className="aspect-video w-full rounded-[1.15rem] object-cover"
        />
        <figcaption className="flex items-start justify-between gap-4 px-2 pb-1 pt-3">
          <span className="font-mono-accent text-[10px] uppercase tracking-[0.22em] text-[#E8A9C2]">
            {kicker}
          </span>
          <span className="max-w-[16rem] text-right text-xs leading-relaxed text-[#E7E1F0]">
            {caption}
          </span>
        </figcaption>
      </div>
    </figure>
  );
};
