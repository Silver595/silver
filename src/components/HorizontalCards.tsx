"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ActionCard from "./ActionCard";
import { QUICK_ACTIONS } from "@/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Pinned horizontal scroll: scrolling vertically drives the card row sideways.
export default function HorizontalCards({ onAction }: { onAction: (title: string) => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => "+=" + getScrollAmount(),
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        animation: tween,
        invalidateOnRefresh: true,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    // full-bleed, transform-free so the pin positions correctly
    <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
      <div ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-background">
        {/* section label */}
        <div className="absolute left-6 top-24 z-10 sm:left-10">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-muted-foreground">
            &sect;&ensp;Quick actions
          </p>
        </div>

        {/* horizontal track */}
        <div ref={trackRef} className="flex h-full w-max items-center gap-6 px-6 sm:px-10">
          {QUICK_ACTIONS.map((action) => (
            <ActionCard key={action.title} action={action} onClick={() => onAction(action.title)} />
          ))}
        </div>
      </div>
    </div>
  );
}
