import { useEffect, useRef } from "react";

export const useHandleClickOutside = (setIsOpen: (val: boolean) => void) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);
  return [containerRef];
};
