import { Button, Circle } from "@dohyun-ko/react-atoms";
import colorSet from "src/styles/colorSet";
import Safety from "src/types/safety";

interface VectorButtonProps {
  safety: Safety;
  onClick?: () => void;
  icon: React.ReactNode;
}

const VectorButton = ({ onClick, icon }: VectorButtonProps) => {
  return (
    <Button onClick={onClick}>
      <Circle diameter={"40px"} backgroundColor={colorSet.white}>
        {icon}
      </Circle>
    </Button>
  );
};

export default VectorButton;
