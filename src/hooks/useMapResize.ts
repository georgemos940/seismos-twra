// hooks/useMapResize.ts
import { useCallback } from "react";

export function useMapResize(
  isMobile: boolean,
  setMapWidth: (w: number) => void,
  setMapHeight: (h: number) => void
) {
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const onMove = (ev: MouseEvent) => {
      if (isMobile) {
        const h = (ev.clientY / window.innerHeight) * 100;
        setMapHeight(Math.min(80, Math.max(30, h)));
      } else {
        const w = (ev.clientX / window.innerWidth) * 100;
        setMapWidth(Math.min(80, Math.max(20, w)));
      }
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [isMobile, setMapHeight, setMapWidth]); 

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const onMove = (ev: TouchEvent) => {
      if (isMobile) {
        const h = (ev.touches[0].clientY / window.innerHeight) * 100;
        setMapHeight(Math.min(80, Math.max(30, h)));
      } else {
        const w = (ev.touches[0].clientX / window.innerWidth) * 100;
        setMapWidth(Math.min(80, Math.max(20, w)));
      }
    };
    const onEnd = () => {
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
    };
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onEnd);
  }, [isMobile, setMapHeight, setMapWidth]); 

  return { onMouseDown, onTouchStart };
}
