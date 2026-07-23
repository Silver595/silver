// Full-screen image "page" with the welcome text overlaid.
export default function WelcomeScroll({ imageSrc = "/retro1.avif" }: { imageSrc?: string }) {
  return (
    // full-bleed so it spans edge-to-edge past the layout padding
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen min-h-screen overflow-hidden">
      {/* BACKGROUND IMAGE */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="absolute inset-0 h-full w-full object-cover" src={imageSrc} alt="" />
      <div className="absolute inset-0 bg-black/55" />

      {/* WELCOME TEXT */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pb-16 pt-28 sm:px-10">
        <p className="font-display mb-4 text-sm uppercase tracking-[0.3em] text-white/60">
          &sect;&ensp;Welcome back
        </p>
        <h1 className="font-display max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-7xl">
          Your interview room is ready.
        </h1>
      </div>
    </section>
  );
}
