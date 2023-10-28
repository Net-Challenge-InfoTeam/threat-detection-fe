import { atom } from "jotai";
import React from "react";

export const bottomSheetAtom = atom<React.ReactNode | null>(null);
export const locationAtom = atom<GeolocationPosition | null>(null);

import mapboxgl from "mapbox-gl";

export const clickedLocationInfo = atom<mapboxgl.MapMouseEvent | null>(null);
export const geoJsonPath = atom<GeoJSON.FeatureCollection | null>(null);

export const MapboxAccessToken =
  "pk.eyJ1IjoiY2Fyb25hMjEiLCJhIjoiY2xsYzNrcmF5MGJyZjNxcW1mNWZsZW9ndSJ9.J4ziCDlgJHdTO-oc6QifMw";
