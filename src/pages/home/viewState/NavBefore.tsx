import { Flex, Spacer, Text } from "@dohyun-ko/react-atoms";
import { useAtom } from "jotai";
import mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";
import { clickedLocationInfo } from "src/store";
import colorSet from "src/styles/colorSet";
import Fonts from "src/styles/fonts";
import styled from "styled-components";

interface NavBeforeProps {
  goBackHome: () => void;
  goNavAfter: () => void;
}

const NavBefore = ({ goBackHome, goNavAfter }: NavBeforeProps) => {
  const [clickedLocationInfoAtom, setClickedLocationInfoAtom] =
    useAtom(clickedLocationInfo);
  useEffect(() => {
    if (clickedLocationInfoAtom) {
      console.log(clickedLocationInfoAtom);
      goNavAfter();
    }
  }, [clickedLocationInfoAtom, goBackHome]);

  return (
    <>
      <HeaderWrapper>
        <Spacer height="10px" />
        <Flex justifyContent="space-between" alignItems="center">
          <Text
            size="14px"
            style={{ marginLeft: "15px" }}
            color={colorSet.white}
          >
            취소
          </Text>
          <Flex
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Text size="16px" font={Fonts.Bold}>
              지도에서 목적지를 눌러 주세요
            </Text>
            <Text size="12px">출발지 : 현재 위치</Text>
          </Flex>
          <Text
            size="14px"
            style={{ marginRight: "15px" }}
            onClick={goBackHome}
          >
            취소
          </Text>
        </Flex>
        <Spacer height="10px" />
      </HeaderWrapper>
    </>
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

export default NavBefore;
