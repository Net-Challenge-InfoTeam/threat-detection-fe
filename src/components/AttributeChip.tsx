import { Flex, Text } from "@dohyun-ko/react-atoms";
import colorSet from "src/styles/colorSet";
import Fonts from "src/styles/fonts";
import Safety from "src/types/safety";

interface AttributeChipProps {
  safety: Safety;
  text: string;
}

const getTextColor = (safety: Safety) => {
  switch (safety) {
    case Safety.SAFE:
      return colorSet.secondary;
    case Safety.CAUTION:
      return colorSet.cautionText;
    case Safety.THREAT:
      return colorSet.threat;
    default:
      return colorSet.black;
  }
};

const getBackgroundColor = (safety: Safety) => {
  switch (safety) {
    case Safety.SAFE:
      return colorSet.primary;
    case Safety.CAUTION:
      return colorSet.cautionLightBg;
    case Safety.THREAT:
      return colorSet.threatBg;
    default:
      return colorSet.deselected;
  }
};

const AttributeChip = ({ safety, text }: AttributeChipProps) => {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      style={{
        backgroundColor: getBackgroundColor(safety),
        borderRadius: "5px",
        padding: "4px 8px",
      }}
    >
      <Text size={"10px"} font={Fonts.Medium} color={getTextColor(safety)}>
        {text}
      </Text>
    </Flex>
  );
};

export default AttributeChip;
