import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export function scrollToSection(hash: string) {
  gsap.to(window, {
    duration: 1,
    scrollTo: { y: hash, offsetY: 0 },
    ease: "power2.inOut",
  });
}
