import { Button, Flex } from "@dohyun-ko/react-atoms";
import Icons from "src/assets/Icons";
import CameraButton from "src/components/CameraButton";
import SafetyIndicator from "src/components/SafetyIndicator";
import VectorButton from "src/components/VectorButton";
import Safety from "src/types/safety";
import getIconColor from "src/utils/get-icon-color";
import styled from "styled-components";

interface HomeProps {
  safety: Safety;
  handleMyLocationClick: () => void;
  goToNavigation: () => void;
}

const Home = ({ safety, handleMyLocationClick, goToNavigation }: HomeProps) => {
  return (
    <>
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
        <VectorButton
          safety={safety}
          onClick={handleMyLocationClick}
          icon={<Icons.Location color={getIconColor(safety)} />}
        />

        {location && <CameraButton safety={safety} />}

        {/* navigation */}
        <VectorButton
          safety={safety}
          onClick={goToNavigation}
          icon={<Icons.Navigation color={getIconColor(safety)} />}
        />
      </ActionButtonsWrapper>

      <Button
        style={{
          height: "100px",
          width: "100px",
          position: "fixed",
          bottom: "20px",
          right: "20px",
        }}
        onClick={() => {
          setTimeout(() => {
            // @ts-ignore
            window.Threat.postMessage("message");
          }, 3000); // Wait for 3 seconds (3000 milliseconds)
        }}
      ></Button>
    </>
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
  pointer-events: none;

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
  pointer-events: none;

  z-index: 1;
`;

export default Home;
