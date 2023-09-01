import { Button, Flex, Text } from "@dohyun-ko/react-atoms";
import Icons from "src/assets/Icons";
import colorSet from "src/styles/colorSet";
import Safety from "src/types/safety";
import styled from "styled-components";

const backgroundColor = (safety: Safety) => {
  switch (safety) {
    case Safety.SAFE:
      return colorSet.background;
    case Safety.CAUTION:
      return colorSet.cautionBg;
    case Safety.THREAT:
      return colorSet.threat;
    default:
      return colorSet.secondaryText;
  }
};

interface SafetyIndicatorProps {
  safety: Safety;
}

const WrapperButton = styled(Button)<{
  safety: Safety;
}>`
  background-color: ${({ safety }) => backgroundColor(safety)};
  color: ${({ safety }) =>
    safety === Safety.SAFE ? colorSet.secondary : colorSet.white};

  height: 40px;
  border-radius: 20px;

  padding: 0 20px;
`; // TODO: 여기에 transition 애니메이션 넣으면 예쁠듯

const SafetyIndicator = ({ safety }: SafetyIndicatorProps) => {
  const text = (() => {
    switch (safety) {
      case Safety.SAFE:
        return "근처가 안전합니다!";
      case Safety.CAUTION:
        return "주의해야 할 요소가 발견되었습니다.";
      case Safety.THREAT:
        return "위협이 발견되었습니다!";
      default:
        return "정보가 없습니다.";
    }
  })();

  const icon = (() => {
    switch (safety) {
      case Safety.SAFE:
        return <Icons.Safe />;
      case Safety.CAUTION:
        return <Icons.Caution />;
      case Safety.THREAT:
        return <Icons.Threat />;
      default:
        return "Safe";
    }
  })();

  return (
    <WrapperButton safety={safety}>
      <Flex gap={"3px"}>
        {icon}
        <Text size={"15px"}>{text}</Text>
      </Flex>
    </WrapperButton>
  );
};

export default SafetyIndicator;
