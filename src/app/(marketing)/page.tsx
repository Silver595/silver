import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalendarIcon,
  Code2Icon,
  MessageSquareIcon,
  PlayIcon,
  UsersIcon,
  VideoIcon,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollLink from "@/components/ScrollLink";
import { cn } from "@/lib/utils";

const FEATURES = [
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

export default function MarketingHomePage() {
  return (
    <>
      {/* HOME — full-screen video background */}
      <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        {/* FULL-PAGE BACKGROUND VIDEO */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* dark overlay so all text stays readable over the video */}
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
      </section>

      {/* ABOUT */}
      <section id="about" className="border-t">
        <div className="container max-w-6xl mx-auto px-6 sm:px-10 py-28 sm:py-40">
          {/* PART 1 — summary statement, near middle-left */}
          <ScrollReveal className="max-w-3xl md:ml-[6%] md:pr-12">
            {/* small — eyebrow label */}
            <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-muted-foreground mb-6">
              &sect;&ensp;The idea
            </p>
            {/* large — the summary itself */}
            <h2 className="font-display text-4xl sm:text-6xl font-bold leading-[1.08] tracking-tight">
              One shared room for the call, the code &amp; the verdict.
            </h2>
          </ScrollReveal>

          {/* PART 2 — detail, below and to the right */}
          <ScrollReveal className="max-w-xl ml-auto md:mr-[6%] md:pl-12 mt-16 sm:mt-24 text-right">
            {/* medium — supporting paragraph */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              No more juggling a video tab, a code pad &amp; a notes doc. TechMock drops the
              interviewer and candidate into one place &mdash; same call, same editor, same
              problem, running live &amp; scored the moment it ends.
            </p>
            <p className="mt-8 text-sm uppercase tracking-widest text-foreground/80">
              Built for teams who hire engineers&ensp;&rarr;
            </p>
          </ScrollReveal>



          {/* PART 4 — how it runs */}
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

          {/* PART 5 — pull quote + signature */}
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
      <section id="features" className="border-t">
        <ScrollReveal className="container max-w-6xl mx-auto px-4 py-24">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Everything you need to run an interview
            </h2>
            <p className="text-muted-foreground">
              One room for the call, the code, and the feedback.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature) => (
              <Card key={feature.title}>
                <CardHeader className="flex flex-row items-center gap-2">
                  <feature.icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {feature.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
