"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CalendarIcon,
  Code2Icon,
  MessageSquareIcon,
  PlayIcon,
  UsersIcon,
  VideoIcon,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type ScrollFeature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

// Same content as before — feel free to import this from a shared constants
// file instead of redefining it if you already have it elsewhere.
export const FEATURES: ScrollFeature[] = [
  {
    icon: VideoIcon,
    title: "Live video interviews",
    description:
      "Start an instant call or schedule one for later. Grid or speaker layout, participant list, and standard call controls.",
  },
  {
    icon: Code2Icon,
    title: "Shared code editor",
    description:
      "A Monaco-powered editor sits right next to the video call, with a bank of coding questions and multi-language support.",
  },
  {
    icon: PlayIcon,
    title: "Run code live",
    description:
      "Candidates can actually execute their solution during the interview and see real output, not just a static file.",
  },
  {
    icon: CalendarIcon,
    title: "Scheduling",
    description:
      "Interviewers pick a candidate, one or more interviewers, a date and time slot, and get a shareable meeting link.",
  },
  {
    icon: MessageSquareIcon,
    title: "Feedback & ratings",
    description:
      "Leave a star rating and written comment on every interview, visible to every interviewer on that candidate.",
  },
  {
    icon: UsersIcon,
    title: "Interview dashboard",
    description:
      "See every interview grouped by status — upcoming, completed, passed, failed — and act on it in one place.",
  },
];

// How much scroll distance (px) is spent "on" each feature before the next
// one takes over. Bump this up for a slower, more deliberate scroll feel.
const SCROLL_PER_FEATURE = 950;

interface FeatureScrollProps {
  features?: ScrollFeature[];
  className?: string;
}

export default function FeatureScroll({
  features = FEATURES,
  className,
}: FeatureScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  // Pin the section and drive `activeIndex` off scroll progress.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const totalScroll = SCROLL_PER_FEATURE * features.length;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${totalScroll}`,
      pin: true,
      scrub: 0.6,
      // anticipatePin avoids a jump when the pin kicks in
      anticipatePin: 1,
      onUpdate: (self) => {
        const idx = Math.min(
          features.length - 1,
          Math.floor(self.progress * features.length)
        );
        if (idx !== activeIndexRef.current) {
          activeIndexRef.current = idx;
          setActiveIndex(idx);
        }
      },
    });

    return () => trigger.kill();
  }, [features.length]);

  // Whenever the active feature changes, animate the swapped-in text.
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      numberRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4 },
      0
    ).fromTo(
      descRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5 },
      0.05
    ).fromTo(
      titleRef.current,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.6 },
      0.05
    );
    return () => {
      tl.kill();
    };
  }, [activeIndex]);

  const feature = features[activeIndex];
  const Icon = feature.icon;

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative h-screen w-full overflow-hidden bg-background text-foreground",
        className
      )}
    >
      <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 lg:p-16">
        {/* top-left: index + description */}
        <div className="max-w-md">
          <span
            ref={numberRef}
            className="font-display text-sm tracking-[0.3em] text-foreground/40"
          >
            0{activeIndex + 1}&nbsp;/&nbsp;0{features.length}
          </span>

          <div className="mt-6 flex items-center gap-2 text-foreground/50">
            <Icon className="size-4" />
            <span className="text-xs uppercase tracking-[0.25em]">
              Feature
            </span>
          </div>

          <p
            ref={descRef}
            className="mt-4 text-base sm:text-lg text-foreground/75 leading-relaxed"
          >
            {feature.description}
          </p>
        </div>

        {/* bottom-right: big feature name */}
        <div className="self-end text-right">
          <h3
            ref={titleRef}
            className="font-display font-bold leading-[0.95] tracking-tight text-[13vw] sm:text-[8vw] lg:text-[6.5rem]"
          >
            {feature.title}
          </h3>
        </div>
      </div>

      {/* progress dots, right-center */}
      <div className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-3">
        {features.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 w-1.5 rounded-full transition-all duration-300",
              i === activeIndex ? "bg-white h-5" : "bg-white/25"
            )}
          />
        ))}
      </div>
    </section>
  );
}
