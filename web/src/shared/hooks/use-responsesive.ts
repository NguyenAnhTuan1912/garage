import { useEffect, useState } from "react";

export function useResponsive() {
  const [size, setSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)");
    const tablet = window.matchMedia(
      "(min-width: 768px) and (max-width: 1023px)"
    );
    const desktop = window.matchMedia("(min-width: 1024px)");

    const update = () =>
      setSize({
        isMobile: mobile.matches,
        isTablet: tablet.matches,
        isDesktop: desktop.matches,
      });

    update();

    mobile.addEventListener("change", update);
    tablet.addEventListener("change", update);
    desktop.addEventListener("change", update);

    return () => {
      mobile.removeEventListener("change", update);
      tablet.removeEventListener("change", update);
      desktop.removeEventListener("change", update);
    };
  }, []);

  return size;
}
