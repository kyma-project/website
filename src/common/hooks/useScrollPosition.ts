import { useEffect, useState } from "react";

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    let lastKnownScrollPosition = 0;
    let ticking = false;
    const handleScroll = (_: Event) => {
      lastKnownScrollPosition = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollPosition(lastKnownScrollPosition);
          ticking = false;
        });

        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return scrollPosition;
}
