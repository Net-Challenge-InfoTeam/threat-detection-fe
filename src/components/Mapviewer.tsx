import "mapbox-gl/dist/mapbox-gl.css";

import { useAtom } from "jotai";
import mapboxgl from "mapbox-gl";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createRoot } from "react-dom/client";
import Icons from "src/assets/Icons";
import { locationAtom } from "src/store";
import Threat from "src/types/threat";
import styled from "styled-components";

import MarkerGenerator, {
  CautionMarker,
  ThreatMarker,
} from "./MarkerGenerator";
import MonitorSidePanel from "./MonitorSidePanel";
import ThreatBottomSheet from "./ThreatBottomSheet";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2Fyb25hMjEiLCJhIjoiY2xsYzNrcmF5MGJyZjNxcW1mNWZsZW9ndSJ9.J4ziCDlgJHdTO-oc6QifMw";

const sourcdIds = [
  "threatSource0",
  "threatSource1",
  "threatSource2",
  "threatSource3",
  "threatSource4",
  "threatSource5",
  "threatSource6",
  "threatSource7",
  "threatSource8",
  "threatSource9",
];

const MapFrame = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;

  top: 0;
  left: 0;
`;

interface MapViewerProps {
  threats: Threat[];
}

const Mapviewer = forwardRef(({ threats }: MapViewerProps, ref) => {
  const mapContainer = useRef<null | HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(126.8443);
  const [lat, setLat] = useState(35.228);
  const [zoom, setZoom] = useState(16.52);

  const [location] = useAtom(locationAtom);

  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);

  const [currentMarkers, setCurrentMarkers] = useState<
    {
      id: number;
      marker: mapboxgl.Marker;
    }[]
  >([]);

  const markerClicked = (threat: Threat) => {
    setSelectedThreat(threat);
    setBottomSheetOpen(true);
  };

  useEffect(() => {
    console.log("mark current location");
    const markCurrentLocation = () => {
      if (!location) return;

      const element = document.createElement("div");
      createRoot(element).render(<Icons.MyLocation />);

      new mapboxgl.Marker(element)
        .setLngLat({
          lon: location.coords.longitude,
          lat: location.coords.latitude,
        })
        .addTo(map.current!);
    };

    markCurrentLocation();
  }, [location]);

  useEffect(() => {
    // currentMarkers.filter((marker) => {
    //   const found = threats.find((t) => t.id === marker.id);
    //   if (!found) {
    //     marker.marker.remove();
    //     return false;
    //   }
    //   return true;
    // });

    currentMarkers.forEach((marker) => {
      marker.marker.remove();
    });

    if (!map.current) {
      console.error("map.current is null");
      return;
    }

    const newMarkers: {
      id: number;
      marker: mapboxgl.Marker;
    }[] = [];

    threats.forEach((marker) => {
      const point = marker.location;
      console.log(point);
      if (!point) {
        console.error("Invalid point");
        return;
      }

      // --------------------------------------
      // Marker
      // --------------------------------------
      const element = document.createElement("div");

      switch (marker.kind) {
        case "담배":
          createRoot(element).render(
            <CautionMarker
              onClick={() => {
                markerClicked(marker);
              }}
            />,
          );
          break;
        case "칼":
          createRoot(element).render(
            <ThreatMarker
              onClick={() => {
                markerClicked(marker);
              }}
            />,
          );
          break;
        default:
          createRoot(element).render(
            <MarkerGenerator
              onClick={() => {
                markerClicked(marker);
              }}
            />,
          );
          break;
      }

      if (!map.current) {
        console.error("map.current is null", marker.id);
        return;
      }

      const newMark = new mapboxgl.Marker(element)
        .setLngLat({ lon: point.longitude, lat: point.latitude })
        .addTo(map.current!);

      newMarkers.push({ id: marker.id, marker: newMark });
    });

    setCurrentMarkers(newMarkers);
  }, [threats, location]);

  useEffect(() => {
    console.log("second useEffect");

    if (map.current) return; // initialize map only once
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/standard-beta",
      center: [lng, lat],
      zoom: zoom,
      antialias: true,
    });

    if (map.current) {
      const currentMap = map.current;

      currentMap.on("move", () => {
        setLng(parseFloat(currentMap.getCenter().lng.toFixed(4)));
        setLat(parseFloat(currentMap.getCenter().lat.toFixed(4)));
        setZoom(parseFloat(currentMap.getZoom().toFixed(2)));
      });
    }

    // map.current.on("style.load", () => {
    //   console.log("style loaded");

    //   map.current!.addSource(
    //     "cautionAreaSourc1",
    //     // @ts-ignore
    //     createGeoJSONCircle([126.8475, 35.2295], 0.2),
    //   );
    //   map.current!.addSource(
    //     "cautionAreaSourc2",
    //     // @ts-ignore
    //     createGeoJSONCircle([126.8432, 35.2333], 0.2),
    //   );

    //   map.current!.addLayer({
    //     id: "cautionArea1",
    //     type: "fill",
    //     source: "cautionAreaSourc1",
    //     layout: {},
    //     paint: {
    //       "fill-color": colorSet.threat,
    //       "fill-opacity": 0.3,
    //     },
    //   });

    //   map.current!.addLayer({
    //     id: "cautionArea2",
    //     type: "fill",
    //     source: "cautionAreaSourc2",
    //     layout: {},
    //     paint: {
    //       "fill-color": colorSet.caution,
    //       "fill-opacity": 0.3,
    //     },
    //   });
    // });
  }, []);

  const moveLocation = (longitude: number, latitude: number) => {
    if (map.current) {
      map.current.flyTo({
        center: [longitude, latitude],
        essential: true,
      });
    }
  };

  const moveToCurrentLocation = () => {
    console.log(location);
    if (location) {
      moveLocation(location.coords.longitude, location.coords.latitude);
    }
  };

  useImperativeHandle(ref, () => ({
    moveToCurrentLocation,
  }));

  return (
    <>
      <MapFrame ref={mapContainer} />

      {window.innerWidth < 768 ? (
        selectedThreat && (
          <ThreatBottomSheet
            threat={selectedThreat}
            open={bottomSheetOpen}
            onDismiss={() => setBottomSheetOpen(false)}
          />
        )
      ) : (
        <MonitorSidePanel
          selectedThreat={selectedThreat}
          setSelectedThreat={setSelectedThreat}
        />
      )}
    </>
  );
});

Mapviewer.displayName = "Mapviewer";

export default Mapviewer;

const createGeoJSONCircle = function (
  center: [number, number],
  radiusInKm: number,
  points = 64,
) {
  if (!points) points = 64;

  const coords = {
    latitude: center[1],
    longitude: center[0],
  };

  const km = radiusInKm;

  const ret = [];
  const distanceX = km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
  const distanceY = km / 110.574;

  let theta, x, y;
  for (let i = 0; i < points; i++) {
    theta = (i / points) * (2 * Math.PI);
    x = distanceX * Math.cos(theta);
    y = distanceY * Math.sin(theta);

    ret.push([coords.longitude + x, coords.latitude + y]);
  }
  ret.push(ret[0]);

  return {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [ret],
          },
        },
      ],
    },
  };
};
