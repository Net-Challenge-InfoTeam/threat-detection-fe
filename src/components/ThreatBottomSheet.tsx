import { Area, Content, Flex, Spacer, Text } from "@dohyun-ko/react-atoms";
import { useQuery } from "@tanstack/react-query";
import { BottomSheet } from "react-spring-bottom-sheet";
import { getAddress } from "src/apis/geocoding-api";
import colorSet from "src/styles/colorSet";
import Fonts from "src/styles/fonts";
import QueryKeys from "src/types/queryKeys";
import Safety from "src/types/safety";
import Threat from "src/types/threat";

import AttributeChip from "./AttributeChip";

interface ThreatBottomSheetProps {
  open: boolean;
  onDismiss?: () => void;
  threat: Threat;
}

const ThreatBottomSheet = ({
  open,
  onDismiss,
  threat,
}: ThreatBottomSheetProps) => {
  const { data } = useQuery(
    [
      QueryKeys.GET_ADDRESS,
      {
        latitude: threat.location.latitude,
        longitude: threat.location.longitude,
      },
    ],
    getAddress,
  );

  return (
    <BottomSheet open={open} onDismiss={onDismiss}>
      <Area>
        <Content>
          <Spacer height="8px" />

          <Text size={"12px"} color={colorSet.secondaryText}>
            {threat.detectedAt.toLocaleString("ko-KR")}
          </Text>

          <Spacer height="4px" />

          <Text size={"20px"} font={Fonts.Bold}>
            {data}
          </Text>

          <Spacer height="8px" />

          <Flex gap={"8px"}>
            <AttributeChip
              safety={threat.kind === "칼" ? Safety.THREAT : Safety.CAUTION}
              text={
                threat.kind === "칼"
                  ? "위협이 발견됨"
                  : "주의해야 할 요소 발견됨"
              }
            />

            <AttributeChip
              safety={threat.kind === "칼" ? Safety.THREAT : Safety.CAUTION}
              text={threat.kind}
            />
          </Flex>

          <Spacer height="20px" />
        </Content>
      </Area>
    </BottomSheet>
  );
};

export default ThreatBottomSheet;
