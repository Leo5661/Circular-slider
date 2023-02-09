import { useEffect, useState } from "react";

const useMousePosition = (global = false) => {
  const [mouseCoords, setMouseCoords] = useState({});
  const [mouseState, setMouseState] = useState(false);

  const handleCursorMovement = (event) => {
    let rect = event.target.getBoundingClientRect();
    setMouseCoords({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };
  useEffect(() => {
    if (global) {
      window.addEventListener("mousedown", () => setMouseState(!mouseState));
      window.addEventListener("mouseup", () => setMouseState(!mouseState));

      if (mouseState) {
        window.addEventListener("mousemove", handleCursorMovement);
      }
    }
  }, [global]);

  return [mouseCoords, handleCursorMovement];
};

export default useMousePosition;
