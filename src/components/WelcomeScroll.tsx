import type { ReactNode } from "react";

// Full-screen video "page". Welcome text + whatever is passed as children
// (e.g. the action-card grid) are overlaid on top of the video.
export default function WelcomeScroll({
  videoSrc = "/retro1.avif",
  children,
}: {
  videoSrc?: string;
  children?: ReactNode;
}) {
  return (
    // full-bleed so it spans edge-to-edge past the layout padding
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen min-h-screen overflow-hidden">
      {/* BACKGROUND VIDEO */}
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src={videoSrc}
        //autoPlay
        //loop
        //muted
        //playsInline
      />
      <div className="absolute inset-0 bg-black/55" />

      {/* OVERLAY CONTENT — text left, cards stacked right */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col gap-12 px-6 pb-16 pt-28 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        {/* LEFT — welcome text */}
        <div className="lg:max-w-md">
          <p className="font-display mb-4 text-sm uppercase tracking-[0.3em] text-white/60">
            &sect;&ensp;Welcome back
          </p>
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Your interview room is ready.
          </h1>
        </div>

        {/* RIGHT — cards */}
        <div className="w-full lg:w-[380px] lg:shrink-0">{children}</div>
      </div>
    </section>
  );
}
