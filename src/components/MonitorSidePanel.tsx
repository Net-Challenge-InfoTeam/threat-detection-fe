import {
  Area,
  Button,
  Circle,
  Flex,
  Spacer,
  Text,
} from "@dohyun-ko/react-atoms";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import { getAddress } from "src/apis/geocoding-api";
import ExampleImage from "src/assets/example-img.jpg";
import Icons from "src/assets/Icons";
import MonitorCctv from "src/assets/monitor-cctv.svg";
import MonitorPolice from "src/assets/monitor-police.svg";
import MonitorSummary from "src/assets/monitor-summary.svg";
import MonitorUser from "src/assets/monitor-user.svg";
import PoliceCard from "src/assets/police-card.png";
import colorSet from "src/styles/colorSet";
import Fonts from "src/styles/fonts";
import QueryKeys from "src/types/queryKeys";
import Safety from "src/types/safety";
import Threat from "src/types/threat";
import { formatDate } from "src/utils/format-date";

import AttributeChip from "./AttributeChip";

interface MonitorSidePanelProps {
  selectedThreat: Threat | null;
  setSelectedThreat: Dispatch<SetStateAction<Threat | null>>;
}

const MonitorSidePanel = ({
  selectedThreat,
  setSelectedThreat,
}: MonitorSidePanelProps) => {
  return (
    <Area
      backgroundColor={"#F7F7F7"}
      style={{
        padding: "8px",
        position: "absolute",
        top: "10px",
        right: "10px",
        width: "400px",
        height: "calc(100vh - 20px)",
        borderRadius: "20px",
        justifyContent: "start",
        overflow: "scroll",
      }}
    >
      <Flex
        justifyContent={"center"}
        style={{
          padding: "10px 0",
        }}
      >
        <Text size={"12px"}>{formatDate(new Date())}</Text>
      </Flex>
      {selectedThreat ? (
        <SidePanelThreatInfo
          threat={selectedThreat}
          onBack={() => setSelectedThreat(null)}
        />
      ) : (
        <Flex gap={"10px"}>
          <img src={MonitorSummary} width={"100%"} />
          <img src={MonitorCctv} width={"100%"} />
          <img src={MonitorUser} width={"100%"} />
          <img src={MonitorPolice} width={"100%"} />
        </Flex>
      )}

      <Spacer height={"50px"} />
    </Area>
  );
};

export default MonitorSidePanel;

interface SidePanelThreatInfoProps {
  threat: Threat;
  onBack?: () => void;
}

const SidePanelThreatInfo = ({ threat, onBack }: SidePanelThreatInfoProps) => {
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

  const isThreat = threat.kind === "knife";

  const [isPoliceCalled, setIsPoliceCalled] = useState<boolean>(false);

  return (
    <Flex
      flexDirection={"column"}
      style={{
        backgroundColor: "white",
        padding: "20px",
        width: "calc(100% - 40px)",
        borderRadius: "15px",
      }}
      gap={"10px"}
    >
      <Flex>
        <Button onClick={onBack}>
          <Icons.RightArrow />
        </Button>
      </Flex>

      <Flex alignItems={"center"} gap={"10px"}>
        {isThreat ? (
          <Circle diameter={"30px"} backgroundColor={colorSet.threat}>
            <Icons.Threat size="20px" color={colorSet.white} />
          </Circle>
        ) : (
          <Circle diameter={"30px"} backgroundColor={colorSet.caution}>
            <Icons.Caution size="20px" color={colorSet.white} />
          </Circle>
        )}
        <Text
          color={isThreat ? colorSet.threat : colorSet.caution}
          font={Fonts.Bold}
          size={"14px"}
        >
          위협 요인
        </Text>
      </Flex>

      <SidebarSection title={"주소"}>
        <Text size={"14px"}>{data}</Text>
      </SidebarSection>

      <SidebarSection title={"주변 환경"}>
        <Flex gap={"5px"}>
          <AttributeChip safety={Safety.NONE} text={"아파트"} />
          <AttributeChip safety={Safety.NONE} text={"상가"} />
        </Flex>
      </SidebarSection>

      <SidebarSection title={"제보된 사진"}>
        <Flex
          style={{
            padding: "5px",
            borderRadius: "10px",
            backgroundColor: isThreat ? colorSet.threat : colorSet.caution,
            overflow: "hidden",
          }}
        >
          <img
            src={ExampleImage}
            style={{
              borderRadius: "5px",
              width: "100%",
              height: "100%",

              objectFit: "cover",
            }}
          />
        </Flex>
      </SidebarSection>

      <SidebarSection title={"설명"}>
        <Text size={"14px"}>
          파란색 바람막이에 검정 바지를 입었고 식칼같아 보이는 칼을 들고 거리를
          활보하고 있습니다.... 지금은 풍영로 안길 쪽으로 더 들어간 것 같은데
          어디인지 확인이 안됩니다... 부디 주의하세요
        </Text>
      </SidebarSection>

      <Flex>
        <Button
          backgroundColor={colorSet.police}
          borderRadius={"20px"}
          onClick={() => {
            setTimeout(() => {
              setIsPoliceCalled(true);
            }, 200); // Wait for 0.2 seconds (200 milliseconds)
          }}
        >
          <Text
            size={"12px"}
            font={Fonts.Bold}
            color={colorSet.white}
            style={{
              padding: "6px 20px",
            }}
          >
            {isPoliceCalled
              ? "경찰이 호출되었습니다."
              : "해당 위치에 경찰 호출하기"}
          </Text>
        </Button>
      </Flex>

      <Flex flexDirection={"column"}>
        <img src={PoliceCard} width={"100%"} />
      </Flex>
    </Flex>
  );
};

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
}

const SidebarSection = ({ title, children }: SidebarSectionProps) => {
  return (
    <Flex flexDirection={"column"} gap={"5px"}>
      <Text font={Fonts.Bold} size={"14px"}>
        {title}
      </Text>
      {children}
    </Flex>
  );
};
