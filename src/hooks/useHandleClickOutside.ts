import { useEffect, useRef } from "react";

export const useHandleClickOutside = (setIsOpen: (val: boolean) => void) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    const alertMessage = document.querySelector(".error-alert-message");
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target) &&
      ((alertMessage && !alertMessage.contains(event.target)) || !alertMessage)
    ) {
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
