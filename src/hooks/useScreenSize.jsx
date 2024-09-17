import { useEffect, useState } from "react";
import {
  LARGE_SCREEN_BREAKPOINT,
  MEDIUM_SCREEN_BREAKPOINT_MAX,
  MEDIUM_SCREEN_BREAKPOINT_MIN,
  SMALL_SCREEN_BREAKPOINT,
} from "../core/constants/breakpoints";

const useScreenSize = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isLargeScreen = windowWidth >= LARGE_SCREEN_BREAKPOINT;
  const isMediumScreen =
    windowWidth > MEDIUM_SCREEN_BREAKPOINT_MIN &&
    windowWidth < MEDIUM_SCREEN_BREAKPOINT_MAX;
  const isSmallScreen = windowWidth <= SMALL_SCREEN_BREAKPOINT;

  return { isLargeScreen, isMediumScreen, isSmallScreen };
};

export default useScreenSize;
