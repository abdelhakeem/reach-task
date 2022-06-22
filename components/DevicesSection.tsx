import styles from "../styles/DevicesSection.module.css";

type DevicesSectionProps = {
  deviceIds: string[];
  selectHandler: Function;
};

const DevicesSection = ({ deviceIds, selectHandler }: DevicesSectionProps) => {
  const DevicesList = deviceIds.length ? (
    <ul>
      {deviceIds.map((deviceId) => (
        <li key={deviceId} onClick={() => selectHandler(deviceId)}>
          {deviceId}
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-center">No Devices To Show</p>
  );

  return (
    <section className={`w-full max-w-lg ${styles.devicesSection}`}>
      {DevicesList}
    </section>
  );
};

export default DevicesSection;
