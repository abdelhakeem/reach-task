import type { NextPage } from "next";
import { useState } from "react";
import DeviceDataSection from "../components/DeviceDataSection";
import DevicesSection from "../components/DevicesSection";
import ErrorMsg from "../components/ErrorMsg";
import LoginSection from "../components/LoginSection";

const Home: NextPage = () => {
  const [deviceIds, setDeviceIds] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (userId: string, orgId: string) => {
    setDeviceIds([]);
    setSelectedDevice("");
    setError("");

    try {
      const encodedUserId = encodeURIComponent(userId);
      const encodedOrgId = encodeURIComponent(orgId);
      const queryParams = `userId=${encodedUserId}&orgId=${encodedOrgId}`;
      const res = await fetch(`/api/devices?${queryParams}`);
      const responseData = await res.json();

      if (responseData.err) {
        throw new Error(responseData.err);
      }

      setDeviceIds(responseData.output);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSelect = (deviceId: string) => {
    setSelectedDevice(deviceId);
  };

  return (
    <main className="container mx-auto flex flex-col min-h-screen justify-center
                     items-center gap-4">
      <ErrorMsg message={error} />
      <LoginSection submitHandler={handleSubmit} />
      <DevicesSection deviceIds={deviceIds} selectHandler={handleSelect} />
      <DeviceDataSection deviceId={selectedDevice} />
    </main>
  );
};

export default Home;
