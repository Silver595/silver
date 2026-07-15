"use client";

import Link from "next/link";
import { CodeIcon } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import ScrollLink from "./ScrollLink";

const NAV_LINKS = [
  { to: "home", label: "Home" },
  { to: "about", label: "About" },
  { to: "features", label: "Features" },
];

function MarketingNavbar() {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto gap-6">
        <ScrollLink
          to="home"
          className="flex items-center gap-2 font-semibold text-2xl font-mono hover:opacity-80 transition-opacity"
        >
          <CodeIcon className="size-8 text-zinc-600 dark:text-zinc-300" />
          <span className="bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent">
            TechMock
          </span>
        </ScrollLink>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {NAV_LINKS.map((link) => (
            <ScrollLink key={link.to} to={link.to} className="hover:text-foreground transition-colors">
              {link.label}
            </ScrollLink>
          ))}
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <ModeToggle />

          <SignedIn>
            <Link href="/home">
              <Button size="sm">Go to App</Button>
            </Link>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <SignInButton forceRedirectUrl="/home">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton forceRedirectUrl="/home">
              <Button size="sm">Sign Up</Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
export default MarketingNavbar;
