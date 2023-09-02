import "react-spring-bottom-sheet/dist/style.css";

import { Button, Circle } from "@dohyun-ko/react-atoms";
import { useRef, useState } from "react";
import Icons from "src/assets/Icons";
import colorSet from "src/styles/colorSet";
import Safety from "src/types/safety";

import ImageReportBottomSheet from "./ImageReportBottomSheet";

interface CameraButtonProps {
  safety: Safety;
  location: GeolocationPosition;
}

const getCircleColor = (safety: Safety) => {
  switch (safety) {
    case Safety.SAFE:
      return colorSet.primary;
    case Safety.CAUTION:
      return colorSet.caution;
    case Safety.THREAT:
      return colorSet.threat;
    default:
      return colorSet.secondaryText;
  }
};

const CameraButton = ({ safety, location }: CameraButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<File>();
  const [capturedAt, setCapturedAt] = useState<Date>();

  const onCameraButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    } else {
      console.error("inputRef is null");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) return;

    const file = files[0];

    if (!file) return;

    setCapturedImage(file);
    setCapturedAt(new Date());
    setBottomSheetOpen(true);
  };

  return (
    <>
      <Button onClick={onCameraButtonClick}>
        <Circle diameter={"64px"} backgroundColor={getCircleColor(safety)}>
          <Icons.Camera
            color={safety === Safety.SAFE ? colorSet.secondary : colorSet.white}
          />
        </Circle>
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          style={{
            display: "none",
          }}
          onChange={handleFileChange}
        />
        {capturedImage && capturedAt && (
          <ImageReportBottomSheet
            image={capturedImage}
            open={bottomSheetOpen}
            onDismiss={() => setBottomSheetOpen(false)}
            latitude={location.coords.latitude}
            longitude={location.coords.longitude}
            capturedAt={capturedAt}
          />
        )}
      </Button>
    </>
  );
};

export default CameraButton;
