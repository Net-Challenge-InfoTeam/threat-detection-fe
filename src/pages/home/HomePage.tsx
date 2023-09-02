import { Area, Flex } from "@dohyun-ko/react-atoms";
import { useAtom } from "jotai";
import { useState } from "react";
import CameraButton from "src/components/CameraButton";
import Mapviewer from "src/components/Mapviewer";
import SafetyIndicator from "src/components/SafetyIndicator";
import VectorButton from "src/components/VectorButton";
import { bottomSheetAtom } from "src/store";
import Safety from "src/types/safety";
import styled from "styled-components";

interface HomePageProps {}

const HomePage = ({}: HomePageProps) => {
  const [safety, setSafety] = useState<Safety>(Safety.SAFE);
  const [bottomSheet, setBottomSheet] = useAtom(bottomSheetAtom);

  return (
    <Area
      style={{
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
      backgroundColor={"#F5F5F5"}
    >
      {/* MAPBOX HERE */}
      <Mapviewer />

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

  z-index: 1;
`;

const ActionButtonsWrapper = styled(Flex)`
  position: absolute;
  bottom: 44px;
  left: calc(50% - 88px);
  gap: 16px;

  z-index: 1;
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

  z-index: 1;
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

  z-index: 1;
`;

export default HomePage;
