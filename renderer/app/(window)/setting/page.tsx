"use client";
import { useState } from "react";
import WindowComponent from "../../../components/window/window";
import AppInfo from "../../../components/setting/app-info";

const tabList: {
  name: "room" | "text-position-speed" | "text-color-size" | "app-info";
  label: string;
}[] = [
  { name: "room", label: "ルーム設定" },
  { name: "text-position-speed", label: "流れるテキストの位置と速度" },
  { name: "text-color-size", label: "流れるテキストの色とサイズ" },
  { name: "app-info", label: "アプリケーション情報" },
];

const SettingPage = () => {
  const [selectedTab, setSelectedTab] = useState<
    "room" | "text-position-speed" | "text-color-size" | "app-info"
  >("room");
  const onClickExit = () => {
    window.electron.exitApp();
  };
  return (
    <WindowComponent title="Setting" onClose={onClickExit}>
      <section className="tabs w-full">
        <menu role="tablist">
          {tabList.map(({ name, label }) => (
            <button
              role="tab"
              aria-controls={`tab-${name}`}
              aria-selected={selectedTab === name}
              onClick={() => setSelectedTab(name)}
              key={name}
            >
              {label}
            </button>
          ))}
        </menu>
        <article
          role="tabpanel"
          hidden={selectedTab !== "room"}
          className="min-h-[500px]"
        >
          <h3>ルーム設定</h3>
        </article>
        <article
          role="tabpanel"
          hidden={selectedTab !== "text-position-speed"}
          className="min-h-[500px]"
        >
          <h3>More...</h3>
          <p>This tab contains a GroupBox</p>
          <fieldset>
            <legend>Today's mood</legend>
          </fieldset>
        </article>
        <article
          role="tabpanel"
          hidden={selectedTab !== "text-color-size"}
          className="min-h-[500px]"
        >
          <h3>Disabling tabs</h3>
          <p>
            Simply add a <code>disabled</code> attribute on the tab.
          </p>
          <h3>Justified tabs</h3>
          <p>
            Add the <code>justified</code> class to the <code>tablist</code>{" "}
            menu to make the tabs, well, justified.
          </p>
        </article>
        <article
          role="tabpanel"
          hidden={selectedTab !== "app-info"}
          className="min-h-[500px]"
        >
          <AppInfo />
        </article>
      </section>
      <div className="flex justify-end w-full">
        <div className="justify-end ">
          <button onClick={onClickExit}>終了</button>
          <button onClick={onClickExit} className="ml-2">
            スタート
          </button>
        </div>
      </div>
    </WindowComponent>
  );
};

export default SettingPage;
