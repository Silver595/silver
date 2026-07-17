"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { QuickActionType } from "@/constants";

function ActionCard({ action, onClick }: { action: QuickActionType; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // video hidden by default, pre-tilted & scaled up so it fully covers the
  // card once it rotates in
  useEffect(() => {
    gsap.set(videoRef.current, { opacity: 0, scale: 1.25, rotate: 6 });
    gsap.set(overlayRef.current, { opacity: 0 });
  }, []);

  const handleEnter = () => {
    // only decode/play the video that's actually being hovered
    videoRef.current?.play().catch(() => {});
    gsap.to(cardRef.current, { y: -8, duration: 0.4, ease: "power3.out" });
    gsap.to(videoRef.current, {
      opacity: 1,
      scale: 1.1,
      rotate: 3, // settles with a little tilt
      duration: 0.55,
      ease: "power3.out",
    });
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.4 });
  };

  const handleLeave = () => {
    gsap.to(cardRef.current, { y: 0, duration: 0.4, ease: "power3.out" });
    gsap.to(videoRef.current, {
      opacity: 0,
      scale: 1.25,
      rotate: 6,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => videoRef.current?.pause(),
    });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group relative h-24 overflow-hidden rounded-lg border border-white/15 bg-white/5 backdrop-blur-md cursor-pointer shadow-lg hover:border-white/40"
    >
      {/* HOVER VIDEO */}
      {action.video && (
        <video
          ref={videoRef}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          src={action.video}
          loop
          muted
          playsInline
          preload="metadata"
        />
      )}

      {/* darkening overlay so text stays readable over the video */}
      <div ref={overlayRef} className="absolute inset-0 bg-black/45" />

      {/* CONTENT — horizontal: icon + title */}
      <div className="relative z-10 flex h-full items-center gap-4 px-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-white/20 bg-white/10 backdrop-blur-sm transition-colors group-hover:bg-white/20 group-hover:border-white/40">
          <action.icon className="h-6 w-6 text-white" />
        </div>

        <h3 className="font-display text-xl font-semibold tracking-tight text-white">
          {action.title}
        </h3>
      </div>
    </div>
  );
}

export default ActionCard;
