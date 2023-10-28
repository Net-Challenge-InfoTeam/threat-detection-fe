import { Flex } from "@dohyun-ko/react-atoms";
import { BottomSheet } from "react-spring-bottom-sheet";
import Icons from "src/assets/Icons";
import colorSet from "src/styles/colorSet";
import styled from "styled-components";

interface NavigationStepBottomSheetProps {
  open: boolean;
  onDismiss?: () => void;
  steps: string[];
}

const NavigationStepBottomSheet = ({
  open,
  onDismiss,
  steps,
}: NavigationStepBottomSheetProps) => {
  return (
    <BottomSheet open={open} onDismiss={onDismiss}>
      <SheetFlex>
        <CircleIcon>
          <Icons.Navigation color={colorSet.white} size="20px" />
        </CircleIcon>
      </SheetFlex>
    </BottomSheet>
  );
};

const SheetFlex = styled(Flex)`
  width: 100%;

  box-sizing: border-box;
  gap: 15px;

  padding: 15px;

  align-items: center;

  border-bottom: 0.5px solid ${colorSet.deselected};
`;

const CircleIcon = styled.div`
  width: 40px;
  height: 40px;

  border-radius: 50%;
  background-color: ${colorSet.black};

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default NavigationStepBottomSheet;
