import { useRef, useState } from "react";

// 3rd party
import { debounce } from "lodash-es";
import styled from "@emotion/styled";

// project imports
import Wheel from "./index";

const SpinCircle = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  touch-action: none;
`;

const WheelContainer = styled.div<{ rotation: number }>`
  width: 100%;
  height: 100%;
  transform: ${({ rotation }) => `rotate(${rotation}deg)`};
`;

const WheelContainerStyle = styled.div<{ size?: number }>`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
`;

interface SpinWheelProps {
  colors: string[];
  onColorSelect: (color: string) => void;
  lineWeight?: number;
  initialRotationDegree?: number;
  extractionDegrees?: number;
  size: number;
}

type ReactEvent =
  | React.MouseEvent<HTMLDivElement>
  | React.TouchEvent<HTMLDivElement>;

const DEGREE_IN_CIRCLE = 360;
const R2D = 180 / Math.PI;

export default function SpinWheel({
  colors,
  onColorSelect,
  lineWeight = 2,
  initialRotationDegree = 0,
  extractionDegrees = 0,
  size = 300,
}: SpinWheelProps) {
  const degreesPerColor = DEGREE_IN_CIRCLE / colors.length;
  const rotateRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(initialRotationDegree);
  const [rotateActive, setRotateActive] = useState({
    active: false,
    initialAngle: 0,
  });

  const debouncedHandleColorChange = debounce(onColorSelect, 500);

  const getEventCoordinates = (e: ReactEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    return { clientX, clientY };
  };

  const calculateCurrentAngle = (
    clientX: number,
    clientY: number,
    rect: DOMRect
  ) => {
    const x = clientX - (rect.left + rect.width / 2);
    const y = clientY - (rect.top + rect.height / 2);
    return R2D * Math.atan2(y, x);
  };

  const calculateRotationAndColor = (
    currentAngle: number,
    prevAngle: number
  ) => {
    const newRotation = rotation + currentAngle - prevAngle;
    let adjustedRotation = newRotation % DEGREE_IN_CIRCLE;

    adjustedRotation =
      DEGREE_IN_CIRCLE - (adjustedRotation - extractionDegrees);
    if (adjustedRotation < 0) adjustedRotation += DEGREE_IN_CIRCLE;

    const colorIndex =
      Math.floor(adjustedRotation / degreesPerColor) % colors.length;
    debouncedHandleColorChange(colors[colorIndex]);

    setRotation(newRotation);
  };

  const handleRotateStart = (e: ReactEvent) => {
    if (!rotateRef.current) return;

    const { clientX, clientY } = getEventCoordinates(e);
    const rect = rotateRef.current.getBoundingClientRect();
    const initialAngle = calculateCurrentAngle(clientX, clientY, rect);

    setRotateActive({ active: true, initialAngle });
  };

  const handleRotateMove = (e: ReactEvent) => {
    if (!rotateRef.current || !rotateActive.active) return;

    const { clientX, clientY } = getEventCoordinates(e);
    const rect = rotateRef.current.getBoundingClientRect();

    const currentAngle = calculateCurrentAngle(clientX, clientY, rect);

    calculateRotationAndColor(currentAngle, rotateActive.initialAngle);
    setRotateActive({ active: true, initialAngle: currentAngle });
  };

  const handleRotateStop = () => {
    setRotateActive({ active: false, initialAngle: 0 });
  };

  return (
    <WheelContainerStyle size={size}>
      <SpinCircle
        ref={rotateRef!}
        onMouseDown={handleRotateStart}
        onMouseMove={handleRotateMove}
        onMouseUp={handleRotateStop}
        onMouseLeave={handleRotateStop}
        onTouchStart={handleRotateStart}
        onTouchMove={handleRotateMove}
        onTouchEnd={handleRotateStop}
      >
        <WheelContainer rotation={rotation}>
          <Wheel lineWeight={lineWeight} colors={colors} />
        </WheelContainer>
      </SpinCircle>
    </WheelContainerStyle>
  );
}
