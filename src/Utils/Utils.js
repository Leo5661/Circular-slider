export function circleXY(r, theta) {
    // Convert angle to radians
    theta = (theta * Math.PI) / 180;

    return { x: r * Math.cos(theta), y: -r * Math.sin(theta) };
  }

export function convertPiAngle(angle) {
    const deg = (angle * 180) / Math.PI;
    return deg;
  }

export const isPointerOnKnob = (mouseX, mouseY, knobX, knobY, knobRadius) => {
    const distance = Math.sqrt(
      (mouseX - knobX) * (mouseX - knobX) + (mouseY - knobY) * (mouseY - knobY)
    );

    return distance < knobRadius;
  };