"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { CodeIcon } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import DasboardBtn from "./DasboardBtn";
import { cn } from "@/lib/utils";

function NavInner() {
  return (
    <>
      <Link href="/home" className="flex items-center gap-2 font-semibold font-mono shrink-0">
        <CodeIcon className="size-6 text-zinc-600 dark:text-zinc-300" />
        <span className="hidden sm:inline bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent">
          TechMock
        </span>
      </Link>

      <SignedIn>
        <div className="flex items-center gap-2 ml-auto shrink-0">
          <DasboardBtn />
          <ModeToggle />
          <UserButton />
        </div>
      </SignedIn>
    </>
  );
}

function Navbar() {
  const pathname = usePathname();
  // only float/overlay on the home page (which has the full-screen video hero);
  // every other page gets a normal in-flow bar that doesn't cover content
  const floating = pathname === "/home";

  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!floating) return;
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 80) setHidden(false);
      else if (currentY > lastY + 4) setHidden(true);
      else if (currentY < lastY - 4) setHidden(false);
      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [floating]);

  if (floating) {
    return (
      <header
        className={cn(
          "fixed top-3 left-1/2 z-50 w-[calc(100%-0.4rem)] max-w-9xl -translate-x-1/2 transition-transform duration-300 ease-out",
          hidden && "-translate-y-[200%]"
        )}
      >
        <nav className="flex h-14 items-center gap-3 rounded-lg bg-background/0 px-4 shadow-sm backdrop-blur-md sm:px-6">
          <NavInner />
        </nav>
      </header>
    );
  }

  // normal, in-flow navbar for all other pages
  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 items-center gap-3 px-4">
        <NavInner />
      </div>
    </nav>
  );
}
export default Navbar;
