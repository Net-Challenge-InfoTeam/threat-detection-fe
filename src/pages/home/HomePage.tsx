import { Area, Flex } from "@dohyun-ko/react-atoms";
import { useAtom } from "jotai";
import { useState } from "react";
import CameraButton from "src/components/CameraButton";
import SafetyIndicator from "src/components/SafetyIndicator";
import VectorButton from "src/components/VectorButton";
import useGPS from "src/hooks/useGPS";
import { bottomSheetAtom } from "src/store";
import Safety from "src/types/safety";
import styled from "styled-components";

interface HomePageProps {}

const HomePage = ({}: HomePageProps) => {
  const { location } = useGPS(); // location은 GeolocationPosition 타입임 위치 바뀔 때마다 실시간으로 업데이트 되는 거 같음
  const [safety, setSafety] = useState<Safety>(Safety.SAFE);
  const [bottomSheet, setBottomSheet] = useAtom(bottomSheetAtom);

  return (
    <Area
      style={{
        height: "100vh",
        position: "relative",
      }}
      backgroundColor={"#F5F5F5"}
    >
      {/* MAPBOX HERE */}

      {safety === Safety.THREAT && (
        <>
          <ThreatBlurLeft />
          <ThreatBlurRight />
        </>
      )}

      <SafetyIndicatorWrapper>
        <SafetyIndicator safety={safety} />
      </SafetyIndicatorWrapper>

      <ActionButtonsWrapper>
        <VectorButton safety={safety} />

        {location && <CameraButton safety={safety} location={location} />}
      </ActionButtonsWrapper>
    </Area>
  );
};

const SafetyIndicatorWrapper = styled(Flex)`
  position: absolute;
  top: 15px;
  left: 15px;
`;

const ActionButtonsWrapper = styled(Flex)`
  position: absolute;
  bottom: 44px;
  left: calc(50% - 88px);
  gap: 16px;
`;

const ThreatBlurLeft = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(50% - 88px);
  height: 100vh;
  background: linear-gradient(
    90deg,
    rgba(217, 77, 33, 15%) 0%,
    rgba(217, 77, 33, 0) 100%
  );
`;

const ThreatBlurRight = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: calc(50% - 88px);
  height: 100vh;
  background: linear-gradient(
    270deg,
    rgba(217, 77, 33, 15%) 0%,
    rgba(217, 77, 33, 0) 100%
  );
`;

export default HomePage;
