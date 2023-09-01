import {
  Area,
  Button,
  Circle,
  Content,
  Flex,
  Spacer,
  Text,
} from "@dohyun-ko/react-atoms";
import { useEffect, useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import Icons from "src/assets/Icons";
import colorSet from "src/styles/colorSet";
import Fonts from "src/styles/fonts";

interface ImageReportBottomSheetProps {
  image: File;
  open: boolean;
  onDismiss?: () => void;
}

const ImageReportBottomSheet = ({
  image,
  open,
  onDismiss,
}: ImageReportBottomSheetProps) => {
  const [isThreat, setIsThreat] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    return () => {
      image && URL.revokeObjectURL(URL.createObjectURL(image));
    };
  }, [image]);

  const handleSubmit = () => {};

  return (
    <BottomSheet open={open}>
      <Area>
        <Content>
          <img
            src={image && URL.createObjectURL(image)}
            alt={"captured"}
            style={{
              width: "calc(100% - 8px)",
              maxHeight: "36vh",
              objectFit: "contain",
              borderRadius: "8px",
              border: `4px solid ${colorSet.secondaryText}`,
            }}
          />

          <Spacer height={"16px"} />

          <Flex justifyContent={"space-between"}>
            <Text font={Fonts.Bold} size={"20px"}>
              워험도
            </Text>

            <Text
              font={Fonts.Medium}
              size={"20px"}
              color={isThreat ? colorSet.threat : colorSet.caution}
            >
              {isThreat ? "위협" : "주의"}
            </Text>
          </Flex>

          <Flex justifyContent={"center"} gap={"24px"}>
            <Button onClick={() => setIsThreat(false)}>
              <Flex flexDirection={"column"} gap={"5px"}>
                <Circle
                  diameter={"58px"}
                  backgroundColor={
                    isThreat ? colorSet.white : colorSet.cautionBg
                  }
                  style={{
                    boxShadow: `0px 0px 0px 1px ${colorSet.cautionBg}`, // 이상하게 border가 안 먹어서 boxShadow로 대체함
                  }}
                >
                  <Icons.Caution
                    color={isThreat ? colorSet.caution : colorSet.white}
                    size={"30px"}
                  />
                </Circle>

                <Text color={colorSet.cautionBg}>주의</Text>
              </Flex>
            </Button>

            <Button onClick={() => setIsThreat(true)}>
              <Flex flexDirection={"column"} gap={"5px"}>
                <Circle
                  diameter={"58px"}
                  backgroundColor={isThreat ? colorSet.threat : colorSet.white}
                  style={{
                    boxShadow: `0px 0px 0px 1px ${colorSet.threat}`,
                  }}
                >
                  <Icons.Threat
                    color={isThreat ? colorSet.white : colorSet.threat}
                    size={"30px"}
                  />
                </Circle>

                <Text color={colorSet.threat}>위협</Text>
              </Flex>
            </Button>
          </Flex>

          <Spacer height={"16px"} />

          <Text font={Fonts.Bold} size={"20px"}>
            설명
          </Text>

          <Spacer height={"8px"} />

          <textarea
            style={{
              width: "calc(100% - 18px)",
              height: "100px",
              borderRadius: "8px",
              border: `1px solid ${colorSet.secondaryText}`,
              padding: "8px",
              resize: "none",
            }}
            placeholder={"어떤 일이 있었나요?"}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />

          <Spacer height={"16px"} />

          <Flex justifyContent={"center"} gap={"10px"}>
            <Button
              backgroundColor={colorSet.primary}
              borderRadius={"10px"}
              style={{
                padding: "7px 16px",
              }}
              onClick={handleSubmit}
            >
              <Text font={Fonts.Medium} color={colorSet.white}>
                제출하기
              </Text>
            </Button>
            <Button
              borderRadius={"10px"}
              style={{
                padding: "7px 16px",
              }}
              onClick={onDismiss}
            >
              <Text font={Fonts.Medium} color={colorSet.secondaryText}>
                취소
              </Text>
            </Button>
          </Flex>

          <Spacer
            style={{
              padding: "20px",
            }}
          />
        </Content>
      </Area>
    </BottomSheet>
  );
};

export default ImageReportBottomSheet;
