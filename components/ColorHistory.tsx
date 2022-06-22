import { useRef } from "react";

type ColorHistoryProps = {
  frameNumber: number;
  frames: any;
};

const ColorHistory = ({ frameNumber, frames }: ColorHistoryProps) => {
  const historyCanvas = useRef<HTMLCanvasElement>(null);
  const canvasHeight = 20;

  if (historyCanvas.current) {
    const ctx = historyCanvas.current.getContext("2d");

    if (!ctx) {
      return <div></div>;
    }

    const frameCount = Object.keys(frames).length;
    const frameWidth = historyCanvas.current.width / frameCount;

    for (const frame in frames) {
      const { avgR, avgG, avgB } = frames[frame];
      ctx.fillStyle = `rgb(${avgR}, ${avgG}, ${avgB})`;
      ctx.fillRect(parseInt(frame) * frameWidth, 0, frameWidth, canvasHeight);
    }

    ctx.fillStyle = "black";
    ctx.fillRect(
      frameNumber * frameWidth,
      canvasHeight / 2,
      frameWidth,
      canvasHeight / 2
    );
  }

  return (
    <div className="flex flex-row w-full justify-center">
      <canvas
        ref={historyCanvas}
        height={canvasHeight}
        className="w-full"
      ></canvas>
    </div>
  );
};

export default ColorHistory;
