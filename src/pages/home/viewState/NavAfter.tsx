import { Flex, Spacer, Text } from "@dohyun-ko/react-atoms";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { getAddress } from "src/apis/geocoding-api";
import { getNavigation } from "src/apis/navigation-api";
import Icons from "src/assets/Icons";
import NavigationStepBottomSheet from "src/components/NavigationStepBottomSheet";
import { clickedLocationInfo, geoJsonPath, locationAtom } from "src/store";
import colorSet from "src/styles/colorSet";
import Fonts from "src/styles/fonts";
import QueryKeys from "src/types/queryKeys";
import styled from "styled-components";

interface NavAfterProps {
  goBackHome: () => void;
  goNavBefore: () => void;
}

const NavAfter = ({ goBackHome, goNavBefore }: NavAfterProps) => {
  const [location] = useAtom(locationAtom);
  const [clickedLocation] = useAtom(clickedLocationInfo);

  const [, setGeoJsonPathAtom] = useAtom(geoJsonPath);

  const [stepSheetOpen, setStepSheetOpen] = useState(false);

  useEffect(() => {
    getNavigation({
      fromlat: location!.coords.latitude,
      fromlng: location!.coords.longitude,
      tolat: clickedLocation!.lngLat.lat,
      tolng: clickedLocation!.lngLat.lng,
      setGeoJsonPath: setGeoJsonPathAtom,
    });
  });

  const { data: myLocationAddress } = useQuery(
    [
      QueryKeys.GET_ADDRESS,
      {
        latitude: location!.coords.latitude,
        longitude: location!.coords.longitude,
      },
    ],
    getAddress,
  );

  const { data: otherLocationAddress } = useQuery(
    [
      QueryKeys.GET_ADDRESS,
      {
        latitude: clickedLocation!.lngLat.lat,
        longitude: clickedLocation!.lngLat.lng,
      },
    ],
    getAddress,
  );

  return (
    <>
      <HeaderWrapper>
        <HeaderFlex
          alignItems="center"
          justifyContent="space-between"
          gap="10px"
        >
          <Icons.ArrowDown color={colorSet.primary} />
          <Flex
            flexDirection="column"
            justifyContent="center"
            style={{ flexGrow: "1" }}
          >
            <MyLocationContainer alignItems="center">
              <Text
                size="14px"
                font={Fonts.Regular}
                color={colorSet.secondaryText}
              >
                현재 위치 : {myLocationAddress}
              </Text>
            </MyLocationContainer>

            <Spacer height="5px" />

            <OtherLocationContainer
              alignItems="center"
              justifyContent="space-between"
            >
              <Text size="14px" font={Fonts.Medium} color={colorSet.primary}>
                {otherLocationAddress}
              </Text>
              <span onClick={goNavBefore}>
                <Icons.CloseThick color={colorSet.primary} size="12px" />
              </span>
            </OtherLocationContainer>
          </Flex>
          <Flex flexDirection="column" alignItems="start" onClick={goBackHome}>
            <Spacer height="10px" />
            <Icons.CloseThin color={colorSet.black} size="16px" />
          </Flex>
        </HeaderFlex>

        <Spacer height="10px" />

        <PathInfoFlex alignItems="center">
          <CarInfo alignItems="center" justifyContent="center">
            <Icons.Car color={colorSet.white} size="20px" />
            <Spacer width="5px" />
            <Text size="14px" font={Fonts.Bold} color={colorSet.white}>
              약 14분
            </Text>
            <Spacer width="5px" />
            <Text size="14px" font={Fonts.Regular} color={colorSet.white}>
              (1.8km)
            </Text>
          </CarInfo>

          <DashLine />

          <WrapIcon icon={<Icons.Group size="16px" color={colorSet.white} />} />
          <Spacer width="5px" style={{ flexGrow: "0" }} />
          <WrapIcon icon={<Icons.Knife size="16px" color={colorSet.white} />} />
          <Spacer width="10px" style={{ flexGrow: "0" }} />
          <Text size="16px" font={Fonts.Medium}>
            2개의 위협을 피한 경로
          </Text>
        </PathInfoFlex>

        <Spacer height="15px" />
      </HeaderWrapper>

      <NavigationStepBottomSheet
        open={stepSheetOpen}
        onDismiss={() => {
          setStepSheetOpen(false);
        }}
        steps={[]}
      />
    </>
  );
};

const WrapIcon = ({ icon }: { icon: React.ReactNode }) => {
  return (
    <div
      style={{
        width: "31px",
        height: "31px",
        position: "relative",
        backgroundColor: colorSet.black,
        borderRadius: "50%",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "7.5px",
          left: "7.5px",
        }}
      >
        {icon}
      </div>
    </div>
  );
};

const HeaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  background-color: ${colorSet.white};

  z-index: 1;
`;

const HeaderFlex = styled(Flex)`
  box-sizing: border-box;
  padding: 10px 15px;
`;

const MyLocationContainer = styled(Flex)`
  height: 40px;
  background-color: ${colorSet.deselected};
  border-radius: 5px;

  box-sizing: border-box;
  padding: 0 10px;
`;

const OtherLocationContainer = styled(Flex)`
  height: 40px;
  background-color: ${colorSet.white};
  border-radius: 5px;

  border: 1px solid ${colorSet.primary};

  box-sizing: border-box;
  padding: 0 10px;
`;

const PathInfoFlex = styled(Flex)`
  box-sizing: border-box;
  padding: 0 15px;
`;

const CarInfo = styled(Flex)`
  padding: 5px 10px;
  background-color: ${colorSet.black};
  border-radius: 50px;
`;

const DashLine = styled.hr`
  width: 20px;
  border-top: 1px dashed ${colorSet.black};
  margin: 0;
`;

export default NavAfter;
