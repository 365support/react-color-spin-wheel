import React from "react";
import { useState } from "react";
import { SpinWheel } from "./lib";

const wheelColors = [
  "red",
  "green",
  "blue",
  "black",
  "skyblue",
  "gray",
  "purple",
];

function App() {
  const [selectedWheelColor, setSelectedWheelColor] = useState("---");

  const onColorSelect = (color: string) => {
    setSelectedWheelColor(color);
  };

  return (
    <div>
      <SpinWheel
        size={200}
        colors={wheelColors}
        lineWeight={4}
        onColorSelect={onColorSelect}
        // 휠의 시작 점을 바꾸는 방법
        initialRotationDegree={22}
        // 휠의 원하는 각도에서 색상을 추출하는 방법
        extractionDegrees={0}
      />
      <div>{selectedWheelColor}</div>
    </div>
  );
}

export default App;
