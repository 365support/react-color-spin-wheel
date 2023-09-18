import styled from "@emotion/styled";

const Palette = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: inline-block;
  overflow: hidden;
`;

const Common = styled.div<{ lineWeight: number; clipDegree: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: ${({ lineWeight }) => `${lineWeight * 10}px solid var(--c, red)`};
  border-radius: 50%;
  clip-path: polygon(
    50% 50%,
    50% 0%,
    ${({ clipDegree }) => `${50 + 50 * clipDegree}%`} 0%,
    50% 50%
  );
`;

const Color = styled(Common)<{ degree: number; color: string }>`
  transform: rotate(${({ degree }) => `${degree}deg`});
  --c: ${({ color }) => color};
`;

const calculateTanFromDegrees = (degrees: number) => {
  return Math.tan((degrees * Math.PI) / 180);
};

interface WheelProps {
  colors: string[];
  lineWeight: number;
}

const Wheel: React.FC<WheelProps> = ({ colors, lineWeight }) => {
  const clipDegree = calculateTanFromDegrees(360 / colors.length);
  const xPosition = Math.round(clipDegree * 1000) / 1000;

  return (
    <Palette>
      {colors.map((color, index) => (
        <Color
          lineWeight={lineWeight}
          clipDegree={xPosition}
          key={color}
          color={color}
          degree={(360 / colors.length) * index}
        />
      ))}
    </Palette>
  );
};

export default Wheel;
