import { Button, Circle } from "@dohyun-ko/react-atoms";
import Icons from "src/assets/Icons";
import colorSet from "src/styles/colorSet";
import Safety from "src/types/safety";

interface VectorButtonProps {
  safety: Safety;
}

const getIconColor = (safety: Safety) => {
  switch (safety) {
    case Safety.SAFE:
      return colorSet.primary;
    case Safety.CAUTION:
      return colorSet.caution;
    case Safety.THREAT:
      return colorSet.threat;
    default:
      return colorSet.secondaryText;
  }
};

const VectorButton = ({ safety }: VectorButtonProps) => {
  const onVectorButtonClick = () => {};

  return (
    <Button onClick={onVectorButtonClick}>
      <Circle diameter={"40px"} backgroundColor={colorSet.white}>
        <Icons.Vector color={getIconColor(safety)} />
      </Circle>
    </Button>
  );
};

export default VectorButton;
