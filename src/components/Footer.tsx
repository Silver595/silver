import { CodeIcon } from "lucide-react";
import ScrollLink from "./ScrollLink";

function Footer() {
  return (
    <footer className="border-t mt-24">
      <div className="container mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <ScrollLink to="home" className="flex items-center gap-2 font-semibold font-mono">
          <CodeIcon className="size-5 text-zinc-600 dark:text-zinc-300" />
          <span className="bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent">
            TechMock
          </span>
        </ScrollLink>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <ScrollLink to="home" className="hover:text-foreground transition-colors">
            Home
          </ScrollLink>
          <ScrollLink to="about" className="hover:text-foreground transition-colors">
            About
          </ScrollLink>
          <ScrollLink to="features" className="hover:text-foreground transition-colors">
            Features
          </ScrollLink>
        </div>

        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} TechMock. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
export default Footer;
