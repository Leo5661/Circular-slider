import { useEffect, useState } from "react";

const useMousePosition = (global = false) => {
 const [mouseCoords, setMouseCoords] = useState({})
 const [mouseDown, setMouseState] = useState(fal)

 const handleCursorMovement = (event) => {
 let rect = event.target.getBoundingClientRect();
    setMouseCoords({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    });
  };
  useEffect(() => {
 if (global) {
  window.addEventListener("mousedown", () => (mouseDown = true));
  window.addEventListener("mouseup", () => (mouseDown = false));

 window.addEventListener("mousemove", handleCursorMovement);

 return () => {
 window.removeEventListener("mousemove", handleCursorMovement);
      };
    }
  }, [global]);

 return [mouseCoords, handleCursorMovement];
};

export default useMousePosition;