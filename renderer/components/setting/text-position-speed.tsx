"use client";

import { useEffect, useState } from "react";

type TextPositionSpeedSettingProps = {
  onChangePositions: (values: number[]) => void;
  currentPositions: number[];
};

const TextPositionSpeedSetting = ({
  onChangePositions,
  currentPositions,
}: TextPositionSpeedSettingProps) => {
  const [positions, setPositions] = useState(currentPositions);
  useEffect(() => {
    setPositions(currentPositions);
  }, [currentPositions]);
  const handleChange = (index: number, value: string) => {
    if (Number.isNaN(Number(value))) return;
    const newPositions = [...positions];
    newPositions[index] = Number(value);
    setPositions([...newPositions]);
    onChangePositions([...newPositions]);
  };
  return (
    <div>
      <p>文字を流す位置を画面上部からのパーセンテージで入力してください</p>
      <ul>
        {positions.map((position, index) => (
          <li key={index}>
            <input
              type="number"
              value={position}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          setPositions([...positions, 0]);
          onChangePositions([...positions, 0]);
        }}
      >
        追加
      </button>
    </div>
  );
};

export default TextPositionSpeedSetting;
