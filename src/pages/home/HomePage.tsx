import { Area, Flex } from "@dohyun-ko/react-atoms";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { getAllThreats } from "src/apis/threat-api";
import CameraButton from "src/components/CameraButton";
import Mapviewer from "src/components/Mapviewer";
import SafetyIndicator from "src/components/SafetyIndicator";
import VectorButton from "src/components/VectorButton";
import QueryKeys from "src/types/queryKeys";
import Safety from "src/types/safety";
import compareSafety, { classifySafety } from "src/utils/compare-safety";
import styled from "styled-components";

interface HomePageProps {}

const HomePage = ({}: HomePageProps) => {
  const [safety, setSafety] = useState<Safety>(Safety.SAFE);
  const mapViewerRef = useRef<HTMLDivElement>(null);

  const { data } = useQuery([QueryKeys.GET_ALL_THREATS], getAllThreats);

  useEffect(() => {
    if (!data) return;
    const value = data.reduce(
      (acc, cur) =>
        compareSafety(acc, classifySafety(cur)) > 0 ? classifySafety(cur) : acc,
      Safety.SAFE,
    );

    setSafety(value);
  }, [data]);

  const handleVectorButtonClick = () => {
    console.log("handle vector button click");
    // @ts-ignore
    mapViewerRef.current?.moveToCurrentLocation();
  };

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
      {data && <Mapviewer threats={data} ref={mapViewerRef} />}
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
        <VectorButton safety={safety} onClick={handleVectorButtonClick} />

        {location && <CameraButton safety={safety} />}
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
