import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export const useAppVersion = () => {
  const [version, setVersion] = useState<string | undefined>();
  const [latestVersion, setLatestVersion] = useState<string | undefined>();
  const [requiredUpdateStatus, setRequiredUpdateStatus] = useState<
    "loading" | "required" | "not-required" | "available" | "unkown"
  >("loading");
  const checkRequiredUpdate = useCallback(
    (currentVersion, latestVersion): "loading" | "required" | "not-required" | "available" | "unkown" => {
    if (!version || !latestVersion) return "loading";
    if (currentVersion == latestVersion) return "not-required";
    if (
      parseInt(currentVersion.split(".")[0]) <
      parseInt(latestVersion.split(".")[0])
    )
      return "required";
    const versionNumber =
      parseInt(currentVersion.split(".")[0]) * 10000 +
      parseInt(currentVersion.split(".")[1]) * 100 +
      parseInt(currentVersion.split(".")[2]);
    const latestVersionNumber =
      parseInt(latestVersion.split(".")[0]) * 10000 +
      parseInt(latestVersion.split(".")[1]) * 100 +
      parseInt(latestVersion.split(".")[2]);
    if (versionNumber < latestVersionNumber) return "available";
    return "unkown";
  }, [version]);
  useEffect(() => {
    (async () => {
      const currentVersionInfo = await axios.get<{ version: string }>(
        "/api/version"
      );
      setVersion(currentVersionInfo.data.version);
      const latestVersionInfo = await axios.get<{
        version: string;
      }>(
        "https://raw.githubusercontent.com/MogamiTsuchikawa/bolide2-desktop-client/main/package.json"
      );
      setLatestVersion(latestVersionInfo.data.version);
    })();
  }, []);
  useEffect(() => {
    setRequiredUpdateStatus(checkRequiredUpdate(version, latestVersion));
  }, [version, latestVersion]);

  return {
    version,
    latestVersion,
    requiredUpdateStatus,
  };
};
