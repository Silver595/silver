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
      {/* HOME */}
      <section id="home" className="container max-w-6xl mx-auto px-4 py-24">
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Run technical interviews that{" "}
            <span className="bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent">
              feel real
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            TechMock brings live video, a shared code editor, and instant code execution
            into one room — so you can schedule, run, and review interviews without
            juggling three different tools.
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <ScrollLink to="features" className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>
              See features
            </ScrollLink>
            <ScrollLink to="about" className={cn(buttonVariants({ size: "lg" }))}>
              Learn more
            </ScrollLink>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mt-20">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <VideoIcon className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Live video calls</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Start an instant call or join with a link — powered by Stream Video.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Code2Icon className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Shared code editor</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Solve real coding questions together in Monaco, with multiple languages
              and instant code execution.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Scheduling & feedback</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Plan interviews ahead of time, then rate and comment on candidates from
              one dashboard.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-t">
        <ScrollReveal className="container max-w-3xl mx-auto px-4 py-24 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold">About TechMock</h2>
          <p className="text-muted-foreground leading-relaxed">
            TechMock is a video interview platform built for teams that hire engineers.
            Instead of switching between a video call, a separate code editor, and a
            spreadsheet of notes, everything happens in one shared room: the interviewer
            and candidate see the same call, the same code, and the same problem at the
            same time.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Interviewers can schedule interviews ahead of time, start an instant call, or
            join with a link. During the call, candidates work through coding questions in
            a real editor with live execution, so interviewers can watch problem-solving
            happen in real time rather than review a static submission afterwards.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            After the call, interviewers leave a rating and written feedback, and can mark
            the interview as passed or failed — all from a single dashboard that tracks
            every interview from scheduled to completed.
          </p>
        </ScrollReveal>
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
