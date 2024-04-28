"use client";
import { useAppVersion } from "../../hook/app-version";

const AppInfo = () => {
  const { version, latestVersion, requiredUpdateStatus } = useAppVersion();
  return (
    <div>
      <div className="flex">
        <table>
          <tbody>
            <tr>
              <td>現在のバージョン:</td>
              <td>{version ?? "Loading"}</td>
            </tr>
            <tr>
              <td>最新のバージョン:</td>
              <td>{latestVersion ?? "Loading"}</td>
            </tr>
          </tbody>
        </table>
        <div className="ml-6">
          <UpdateInfo requiredUpdateStatus={requiredUpdateStatus} />
        </div>
      </div>
    </div>
  );
};

export default AppInfo;

type UpdateInfoProps = {
  requiredUpdateStatus: string;
};
const UpdateInfo = ({ requiredUpdateStatus }: UpdateInfoProps) => {
  switch (requiredUpdateStatus) {
    case "available":
      return (
        <div>
          <h4 className="text-orange-500">最新版の取得可能</h4>
        </div>
      );
    case "required":
      return (
        <div>
          <h4 className="text-red-500">更新が必須</h4>
        </div>
      );
    case "not-required":
      return (
        <div>
          <h4 className="text-green-500">最新版です</h4>
        </div>
      );
    default:
      return (
        <div>
          <h4 className="text-gray-500">アップデート情報不明</h4>
        </div>
      );
  }
};
