"use client";

import { scrollToSection } from "@/lib/scrollTo";

function ScrollLink({
  to,
  className,
  children,
}: {
  to: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={`#${to}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        scrollToSection(`#${to}`);
        history.replaceState(null, "", `#${to}`);
      }}
    >
      {children}
    </a>
  );
}
export default ScrollLink;
