import { Area, Flex } from "@dohyun-ko/react-atoms";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { getAllThreats } from "src/apis/threat-api";
import Mapviewer from "src/components/Mapviewer";
import threatData from "src/mock/threat-data";
import Safety from "src/types/safety";
import compareSafety, { classifySafety } from "src/utils/compare-safety";
import styled from "styled-components";

import Home from "./viewState/Home";
import NavAfter from "./viewState/NavAfter";
import NavBefore from "./viewState/NavBefore";

enum ViewState {
  HOME,
  NAVIGATION_BEFORE,
  NAVIGATION_AFTER,
}

const HomePage = () => {
  const [safety, setSafety] = useState<Safety>(Safety.SAFE);
  const mapViewerRef = useRef<HTMLDivElement>(null);
  const [viewState, setViewState] = useState<ViewState>(ViewState.HOME);

  // const { data: notNow } = useQuery(
  //   [QueryKeys.GET_ALL_THREATS],
  //   getAllThreats,
  //   {
  //     refetchInterval: 5000,
  //   },
  // );

  const data = threatData;

  useEffect(() => {
    if (!data) return;
    const value = data.reduce(
      (acc, cur) =>
        compareSafety(acc, classifySafety(cur)) > 0 ? classifySafety(cur) : acc,
      Safety.SAFE,
    );

    setSafety(value);
  }, [data]);

  const goToMyLocation = () => {
    // @ts-ignore
    mapViewerRef.current?.moveToCurrentLocation();
  };

  return (
    <Area
      style={{
        height: "100vh",
        position: "absolute",
        overflow: "hidden",
        top: "0",
        left: "0",
      }}
    >
      {/* render map, threat state */}
      {data && <Mapviewer threats={data} ref={mapViewerRef} />}

      {/* home */}
      {viewState === ViewState.HOME && (
        <Home
          safety={safety}
          handleMyLocationClick={goToMyLocation}
          goToNavigation={() => {
            setViewState(ViewState.NAVIGATION_BEFORE);
            goToMyLocation();
          }}
        />
      )}

      {/* navigation_before */}
      {viewState === ViewState.NAVIGATION_BEFORE && (
        <NavBefore
          goBackHome={() => {
            setViewState(ViewState.HOME);
          }}
          goNavAfter={() => {
            setViewState(ViewState.NAVIGATION_AFTER);
          }}
        />
      )}

      {/* navigation_after */}
      {viewState === ViewState.NAVIGATION_AFTER && (
        <NavAfter
          goBackHome={() => {
            setViewState(ViewState.HOME);
          }}
          goNavBefore={() => {
            setViewState(ViewState.NAVIGATION_BEFORE);
          }}
        />
      )}
    </Area>
  );
};

export default HomePage;
