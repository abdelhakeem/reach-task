import { ReactNode, useEffect, useState } from "react";
import DeviceData from "./DeviceData";
import ErrorMsg from "./ErrorMsg";

type DeviceDataSectionProps = {
  deviceId: string;
};

const DeviceDataSection = ({ deviceId }: DeviceDataSectionProps) => {
  type Status = "idle" | "error" | "success";

  const [status, setStatus] = useState("idle" as Status);
  const [error, setError] = useState("");
  const [data, setData] = useState("");
  const [video, setVideo] = useState("");

  useEffect(() => {
    setStatus("idle");
    setError("");
    setData("");
    setVideo("");

    if (!deviceId) {
      return;
    }

    (async () => {
      try {
        const encodedId = encodeURIComponent(deviceId);
        const res = await fetch(`/api/devices/${encodedId}`);
        const responseData = await res.json();

        if (responseData.err) {
          throw new Error(responseData.err);
        }

        setStatus("success");
        setError("");
        setData(responseData.output.cvmdata);
        setVideo(responseData.output.videofiles);
      } catch (err: any) {
        setStatus("error");
        setError(err.message);
      }
    })();
  }, [deviceId]);

  const views: Record<Status, ReactNode> = {
    idle: deviceId ? <p>Loading Device {deviceId}...</p> : <p></p>,
    error: <ErrorMsg message={error} />,
    success: (
      <div>
        <h1 className="text-xl font-bold">{deviceId}</h1>
        <DeviceData data={data} video={video} />
      </div>
    ),
  };

  return <section>{views[status]}</section>;
};

export default DeviceDataSection;
