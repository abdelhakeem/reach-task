type FrameDetailsProps = {
  frameNumber: number;
  frameData: any;
};

const FrameDetails = ({ frameNumber, frameData }: FrameDetailsProps) => {
  if (!frameData) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col gap-2 mb-2 text-lg">
      <p>
        <strong>Frame Number:</strong> {frameNumber}
      </p>
      <p className="flex flex-row items-center gap-4">
        <strong>RGB:</strong>{" "}
        <span
          className="inline-block w-8 h-8 rounded-lg"
          style={{
            background: `rgb(${frameData.avgR}, ${frameData.avgG}, ${frameData.avgB}`,
          }}
        ></span>
      </p>
      <p><strong>Histogram Difference:</strong> {frameData.histDiff}</p>
    </div>
  );
};

export default FrameDetails;
