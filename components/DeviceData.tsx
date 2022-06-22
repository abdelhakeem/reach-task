import {
  ReactElement,
  ReactEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import ColorHistory from "./ColorHistory";
import ErrorMsg from "./ErrorMsg";
import FrameDetails from "./FrameDetails";

type DeviceDataProps = {
  data: string;
  video: string;
};

const DeviceData = ({ data, video }: DeviceDataProps) => {
  const [cvmdata, setCvmdata] = useState(null as any);
  const [error, setError] = useState("");
  const [frame, setFrame] = useState(0);

  const videoElement = useRef<HTMLVideoElement>(null);
  const videoCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setCvmdata(null);
    setError("");
    setFrame(0);

    (async () => {
      try {
        const encodedDataPath = encodeURIComponent(data);
        const res = await fetch(`/api/data?path=${encodedDataPath}`);

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const responseData = await res.json();
        setCvmdata(responseData);
      } catch (err: any) {
        setError(err.message);
      }
    })();
  }, [data]);

  const handleTimeUpdate: ReactEventHandler<HTMLVideoElement> = (e) => {
    const newFrame = Math.floor(
      (e.currentTarget.currentTime / e.currentTarget.duration) *
        Object.keys(cvmdata.frame_data).length
    );
    setFrame(newFrame);

    if (videoElement.current === null || videoCanvas.current === null) {
      return;
    }

    const { RoI } = cvmdata;

    videoCanvas.current.getContext("2d")?.drawImage(
      videoElement.current,
      RoI[0], RoI[1],
      RoI[2], RoI[3],
      0, 0,
      RoI[2], RoI[3],
    )
  };

  if (cvmdata === null) {
    return <div></div>;
  }

  const { RoI } = cvmdata;

  const canvasWidth = RoI[2];
  const canvasHeight = RoI[3];

  return (
    <section className="flex flex-col justify-start items-start gap-4">
      <ErrorMsg message={error} />
      <video
        ref={videoElement}
        controls
        className="max-w-[600px]"
        onTimeUpdate={handleTimeUpdate}
      >
        <source src={video} type="video/mp4" />
      </video>
      <ColorHistory frameNumber={frame} frames={cvmdata.frame_data} />
      <canvas
        ref={videoCanvas}
        width={canvasWidth}
        height={canvasHeight}
      ></canvas>
      <FrameDetails frameNumber={frame} frameData={cvmdata.frame_data[frame]} />
    </section>
  );
};

export default DeviceData;
