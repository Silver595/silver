"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CodeIcon } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import ScrollLink from "./ScrollLink";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { to: "home", label: "Home" },
  { to: "about", label: "About" },
  { to: "features", label: "Features" },
];

function MarketingNavbar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 80) {
        // near the very top — always visible
        setHidden(false);
      } else if (currentY > lastY + 4) {
        // scrolling down
        setHidden(true);
      } else if (currentY < lastY - 4) {
        // scrolling up
        setHidden(false);
      }
      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-3 left-1/2 z-50 w-[calc(100%-0.4rem)] max-w-9xl -translate-x-1/2 transition-transform duration-300 ease-out",
        hidden && "-translate-y-[200%]"
      )}
    >
      <nav className="flex h-14 items-center gap-3 rounded-lg bg-background/0 px-4 shadow-sm backdrop-blur-md sm:px-6">
        {/* LOGO */}
        <ScrollLink to="home" className="flex items-center gap-2 font-semibold font-mono shrink-0">
          <CodeIcon className="size-6 text-zinc-600 dark:text-zinc-300" />
          <span className="hidden sm:inline bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent">
            TechMock
          </span>
        </ScrollLink>

        {/* CENTER LINKS (hidden on small screens) */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-8 text-sm font-medium text-muted-foreground">
          {NAV_LINKS.map((link) => (
            <ScrollLink key={link.to} to={link.to} className="hover:text-foreground transition-colors">
              {link.label}
            </ScrollLink>
          ))}
        </div>

        {/* RIGHT CONTROLS */}
        <div className="flex items-center gap-2 ml-auto md:ml-0 shrink-0">
          <ModeToggle />

          <SignedIn>
            <Link href="/home">
              <Button size="sm">App</Button>
            </Link>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <SignInButton forceRedirectUrl="/home">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton forceRedirectUrl="/home">
              <Button size="sm">Sign Up</Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
}
export default MarketingNavbar;
