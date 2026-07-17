import { buttonVariants } from "@/components/ui/button";
import FeatureScroll from "@/components/FeatureScroll"
import {
  CalendarIcon,
  ChevronDownIcon,
  Code2Icon,
  FeatherIcon,
  MessageSquareIcon,
  PlayIcon,
  UsersIcon,
  VideoIcon,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollLink from "@/components/ScrollLink";
import FlowingMenu from "@/components/ui/flowing-menu";
import { cn } from "@/lib/utils";

export default function MarketingHomePage() {
  return (
    <>
      <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/Nüllrot -- ⫶ the rattener's malady.mkv"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="font-display absolute top-24 left-6 sm:left-10 z-10 text-white max-w-[40%]">
          <p className="text-sm font-medium uppercase tracking-wider text-white/60">Live room</p>
          <p className="text-4xl font-semibold">Video &amp; code</p>
        </div>
        {/* bottom-right overlay (kept) */}
        <div className="font-display absolute bottom-12 right-6 sm:right-10 z-10 text-white text-right max-w-[40%]">
          <p className="text-sm font-medium uppercase tracking-wider text-white/60">Feedback</p>
          <p className="text-4xl font-semibold">Rate &amp; comment</p>
        </div>
        <ScrollLink
          to="about"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/50 hover:text-white/90 transition-colors animate-bounce"
        >
          <ChevronDownIcon className="size-6" />
        </ScrollLink>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-t">
        <div className="container max-w-6xl mx-auto px-6 sm:px-10 py-28 sm:py-40">
          <ScrollReveal className="max-w-3xl md:ml-[6%] md:pr-12">
            <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-muted-foreground mb-6">
              &sect;&ensp;The idea
            </p>

            <h2 className="font-display text-4xl sm:text-6xl font-bold leading-[1.08] tracking-tight">
              One shared room for the call, the code &amp; the verdict.
            </h2>
          </ScrollReveal>
          <ScrollReveal className="max-w-xl ml-auto md:mr-[6%] md:pl-12 mt-16 sm:mt-24 text-right">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              No more juggling a video tab, a code pad &amp; a notes doc. TechMock drops the
              interviewer and candidate into one place &mdash; same call, same editor, same
              problem, running live &amp; scored the moment it ends.
            </p>
            <p className="mt-8 text-sm uppercase tracking-widest text-foreground/80">
              Built for teams who hire engineers&ensp;&rarr;
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-28 sm:mt-44">
            <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-muted-foreground mb-10">
              &sect;&ensp;How it runs
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {[
                { n: "01", t: "Schedule", d: "Pick a candidate, a slot & a link." },
                { n: "02", t: "Meet", d: "Hop on the call — grid or speaker." },
                { n: "03", t: "Code", d: "Solve real problems, run them live." },
                { n: "04", t: "Decide", d: "Rate, comment & mark pass or fail." },
              ].map((step) => (
                <div key={step.n} className="border-l pl-6">
                  <p className="font-display text-2xl font-bold text-muted-foreground/60">{step.n}</p>
                  <h3 className="mt-3 text-lg font-semibold">{step.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.d}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal className="mt-28 sm:mt-44 max-w-2xl ml-auto md:mr-[6%] text-right">
            <p className="font-display text-2xl sm:text-4xl italic leading-snug">
              &ldquo;Watch them think &mdash; not just read what they typed.&rdquo;
            </p>
            <p className="mt-6 text-sm uppercase tracking-widest text-muted-foreground">
              &mdash;&ensp;The TechMock team
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="border-t pb-24">
        <ScrollReveal className="container max-w-6xl mx-auto px-4 pt-24">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Everything you need to run an interview
            </h2>
            <p className="text-muted-foreground">
              One room for the call, the code, and the feedback.
            </p>
          </div>
        </ScrollReveal>
        <FeatureScroll />
      </section>
    </>
  );
}
