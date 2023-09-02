import "mapbox-gl/dist/mapbox-gl.css";

import { useAtom } from "jotai";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { locationAtom } from "src/store";
import fetchJsonData from "src/utils/fetchJson";
import parsePoint from "src/utils/parsePoint";
import styled from "styled-components";

import MarkerGenerator, {
  CautionMarker,
  ThreatMarker,
} from "./MarkerGenerator";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2Fyb25hMjEiLCJhIjoiY2xsYzNrcmF5MGJyZjNxcW1mNWZsZW9ndSJ9.J4ziCDlgJHdTO-oc6QifMw";

const MapFrame = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;

  top: 0;
  left: 0;
`;

interface Marker {
  id: number;
  location: string;
  kind: string;
  count: number;
  acc: string[];
  detectedAt: string;
}

const Mapviewer = ({}) => {
  const mapContainer = useRef<null | HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(126.8443);
  const [lat, setLat] = useState(35.228);
  const [zoom, setZoom] = useState(16.52);

  const [markers, setMarkers] = useState<Marker[]>([]);

  const [location] = useAtom(locationAtom);

  useEffect(() => {
    console.log(location);
    fetchJsonData<Marker[]>("/dummy/dummyLocations.json").then(setMarkers);
  }, [setMarkers, location]);

  const markerClicked = (text: string) => {
    window.alert(text);
  };

  useEffect(() => {
    markers.forEach((marker) => {
      const point = parsePoint(marker.location);
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
                markerClicked(marker.kind);
              }}
            />,
          );
          break;
        case "칼":
          createRoot(element).render(
            <ThreatMarker
              onClick={() => {
                markerClicked(marker.kind);
              }}
            />,
          );
          break;
        default:
          createRoot(element).render(
            <MarkerGenerator
              onClick={() => {
                markerClicked(marker.kind);
              }}
            />,
          );
          break;
      }

      new mapboxgl.Marker(element)
        .setLngLat({ lon: point.longitude, lat: point.latitude })
        .addTo(map.current!);
    });
  });

  useEffect(() => {
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

    map.current.on("style.load", () => {
      const layers = map.current!.getStyle().layers;
      const labelLayerId = layers!.find(
        (layer) => layer.type === "symbol" && layer.layout!["text-field"],
      )!.id;

      map.current!.addLayer(
        {
          id: "add-3d-buildings",
          source: "composite",
          "source-layer": "building",
          filter: ["==", "extrude", "true"],
          type: "fill-extrusion",
          minzoom: 15,
          paint: {
            "fill-extrusion-color": "#aaa",
            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "height"],
            ],
            "fill-extrusion-base": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "min_height"],
            ],
            "fill-extrusion-opacity": 0.6,
          },
        },
        labelLayerId,
      );

      // Add a symbol layer
      map.current!.addLayer({
        id: "points",
        type: "symbol",
        source: "points",
        layout: {
          "icon-image": "custom-marker",
          // get the title name from the source's "title" property
          "text-field": ["get", "title"],
          "text-font": ["Pretendard"],
          "text-offset": [0, 1.25],
          "text-anchor": "top",
        },
      });
    });
  });

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

  return (
    <>
      <MapFrame ref={mapContainer} />
    </>
  );
};

export default Mapviewer;
