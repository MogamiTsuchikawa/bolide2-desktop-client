"use client";
import WindowComponent from "../../../components/window/window";

const SettingPage = () => {
  const onClickExit = () => {
    window.electron.exitApp();
  };
  return (
    <WindowComponent title="Setting" onClose={onClickExit}>
      Setting
    </WindowComponent>
  );
};

export default SettingPage;
