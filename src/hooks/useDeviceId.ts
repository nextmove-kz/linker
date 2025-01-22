export const useDeviceId = () => {
  if (typeof window === "undefined") return;
  const deviceId = document.cookie
    .split("; ")
    .find((item) => item.startsWith("device_id="))
    ?.split("=")[1];
  return deviceId;
};
