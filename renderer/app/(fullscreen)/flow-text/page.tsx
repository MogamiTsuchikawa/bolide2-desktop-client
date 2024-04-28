"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
type FlowText = {
  id: string;
  text: string;
  color: string;
  line: number;
};

const FlowTextPage = () => {
  //クエリパラメーターからoptionを取得
  const searchParams = useSearchParams();
  const fontSize = parseInt(searchParams.get("fontSize") ?? "100");
  const fontColors = searchParams.get("fontColors")?.split(",");
  const flowAreas = searchParams.get("flowAreas")?.split(",").map(parseFloat);
  const windowHight = parseInt(searchParams.get("windowHight") ?? "1000") - 50;
  const windowWidth = parseInt(searchParams.get("windowWidth") ?? "1000");
  const testMode = searchParams.get("testMode") === "true";
  const [flowTexts, setFlowTexts] = useState<FlowText[]>([]);
  const getRandomArea = () => {
    const unusedLines = flowAreas.filter(
      (area) =>
        flowTexts.filter((flowText) => flowText.line === area).length === 0
    );
    if (unusedLines.length === 0)
      return flowAreas[Math.floor(Math.random() * flowAreas.length)];
    return unusedLines[Math.floor(Math.random() * (unusedLines.length + 1))];
  };
  const genFlowText = (text: string, lineIndex?: number) => {
    const flowText = {
      id: crypto.randomUUID(),
      text,
      color:
        fontColors[
          (flowTexts.length + Math.floor(Math.random() * 100)) %
            fontColors.length
        ],
      line: lineIndex ? flowAreas[lineIndex] : getRandomArea(),
    };
    return flowText;
  };
  useEffect(() => {
    if (flowTexts.length !== 0 || !testMode) return;
    let testFlow = [];
    for (let i = 0; i < flowAreas.length; i++) {
      testFlow.push(genFlowText("TEST" + i, i));
    }
    setFlowTexts(testFlow);
  }, []);

  // testModeでは10秒後に画面を戻す
  useEffect(() => {
    if (!testMode) return;
    setTimeout(() => {
      window.electron.backToSetting();
    }, 10000);
  }, []);
  return (
    <div // キーを更新することでアニメーションをリセット
      style={{
        position: "relative",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
      className="w-full h-full"
    >
      <div style={{ height: `${windowHight}px` }}></div>
      {flowTexts.map((flowText) => (
        <div key={flowText.id}>
          <div
            style={{
              position: "absolute",
              left: "100%",
              top: `${flowText.line}%`,
              animation: `flow-text-${flowText.id} 10s linear`,
              fontSize: `${fontSize}px`,
              color: flowText.color,
              fontWeight: "bold",
            }}
          >
            {windowHight + flowText.text}
          </div>
          <style>{`
        @keyframes flow-text-${flowText.id} {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-${windowWidth * 2}px);
          }
        }
      `}</style>
        </div>
      ))}
    </div>
  );
};

export default FlowTextPage;
