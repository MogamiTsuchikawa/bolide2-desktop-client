"use client";

type ConnectionSettingProps = {
  url: string;
  onChange: (url: string) => void;
};

const ConnectionSetting = ({ onChange, url }: ConnectionSettingProps) => {
  const readUrlFromClipboard = () => {
    //const { clipboard } = require("electron");
    //const text = clipboard.readText();
    //onChange(text);
  };
  return (
    <div>
      <div className="field-row">
        <label htmlFor="server-url-text">接続先URL</label>
        <input
          id="server-url-text"
          type="text"
          className="w-[300px]"
          onChange={(e) => onChange(e.target.value)}
          value={url}
        />
        <button onClick={readUrlFromClipboard}>URLを貼付</button>
      </div>
    </div>
  );
};

export default ConnectionSetting;
