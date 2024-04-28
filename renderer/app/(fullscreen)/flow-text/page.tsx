"use client";

import { useEffect, useState } from "react";
import { FlowTextOption } from "../../../interfaces";
import { useSearchParams } from "next/navigation";

const FlowTextPage = () => {
  const [option, setOption] = useState<FlowTextOption>();
  //クエリパラメーターからoptionを取得
  const searchParams = useSearchParams();
  const fontSize = parseInt(searchParams.get("fontSize") ?? "100");
  const fontColors = searchParams.get("fontColors")?.split(",");
  const flowAreas = searchParams.get("flowAreas")?.split(",");
  const [text, setText] = useState<string>("初期テキスト");
  const [key, setKey] = useState<number>(0);
  useEffect(() => {
    const timer = setInterval(() => {
      // ここで新しいテキストを設定
      setText("新しいテキスト " + new Date().toLocaleTimeString());
      setKey((prev) => prev + 1); // キーを更新してアニメーションをリセット
    }, 10000); // 10秒ごとにテキスト更新

    return () => clearInterval(timer);
  }, []);
  // 3秒後に画面を戻す
  useEffect(() => {
    setTimeout(() => {
      window.electron.backToSetting();
    }, 10000);
  }, []);
  return (
    <div
      key={key} // キーを更新することでアニメーションをリセット
      style={{
        position: "relative",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
      className="bg-green-200 w-full h-full"
    >
      <div
        className="bg-green-200"
        style={{ fontSize: `${fontSize}px`, color: "green" }}
      >
        HELLO
      </div>
      <div
        style={{
          position: "absolute",
          left: "100%",
          top: "20%",
          animation: "flow-text 10s linear",
          fontSize: `${fontSize}px`,
          color: "red",
          fontWeight: "bold",
        }}
      >
        {text}
      </div>
      <style>{`
        @keyframes flow-text {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-200%);
          }
        }
      `}</style>
    </div>
  );
};

export default FlowTextPage;
