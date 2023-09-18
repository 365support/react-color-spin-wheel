import { useState } from "react";
import styled from "@emotion/styled";
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
      <WheelContainerStyle>
        <SpinWheel
          colors={wheelColors}
          lineWeight={4}
          onColorSelect={onColorSelect}
          // 휠의 시작 점을 바꾸는 방법
          initialRotationDegree={22}
          // 휠의 원하는 각도에서 색상을 추출하는 방법
          extractionDegrees={0}
        />
      </WheelContainerStyle>
      <div>{selectedWheelColor}</div>
    </div>
  );
}

const WheelContainerStyle = styled.div`
  width: 300px;
  height: 300px;
`;

export default App;
