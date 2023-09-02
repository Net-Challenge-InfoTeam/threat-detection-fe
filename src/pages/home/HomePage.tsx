import { Area, Flex } from "@dohyun-ko/react-atoms";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import CameraButton from "src/components/CameraButton";
import Mapviewer from "src/components/Mapviewer";
import SafetyIndicator from "src/components/SafetyIndicator";
import VectorButton from "src/components/VectorButton";
import { bottomSheetAtom } from "src/store";
import Safety from "src/types/safety";
import Threat, {
  ThreatResponse,
  threatResponseToThreat,
} from "src/types/threat";
import compareSafety, { classifySafety } from "src/utils/compare-safety";
import fetchJsonData from "src/utils/fetchJson";
import styled from "styled-components";

interface HomePageProps {}

const HomePage = ({}: HomePageProps) => {
  const [safety, setSafety] = useState<Safety>(Safety.SAFE);
  const [bottomSheet, setBottomSheet] = useAtom(bottomSheetAtom);
  const [markers, setMarkers] = useState<Threat[]>([]);
  const mapViewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchJsonData<ThreatResponse[]>("/dummy/dummyLocations.json").then((res) =>
      setMarkers(res.map(threatResponseToThreat)),
    );
  }, []);

  useEffect(() => {
    const value = markers.reduce(
      (acc, cur) =>
        compareSafety(acc, classifySafety(cur)) > 0 ? classifySafety(cur) : acc,
      Safety.SAFE,
    );

    setSafety(value);
  }, [markers]);

  const handleVectorButtonClick = () => {
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
      <Mapviewer markers={markers} ref={mapViewerRef} />

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
