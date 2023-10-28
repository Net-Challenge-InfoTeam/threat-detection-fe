import axios from "axios";
import { useAtom, useAtomValue } from "jotai";
import { accessToken } from "mapbox-gl";
import { geoJsonPath } from "src/store";

interface IGetNavigation {
  fromlng: number;
  fromlat: number;
  tolng: number;
  tolat: number;
  setGeoJsonPath: (geoJsonPath: GeoJSON.FeatureCollection) => void;
}

export const getNavigation = async (navigationInfo: IGetNavigation) => {
  const traffic = "driving";
  const location = `${navigationInfo.fromlng},${navigationInfo.fromlat};${navigationInfo.tolng},${navigationInfo.tolat}`;

  const requestUrl =
    `https://api.mapbox.com/directions/v5/mapbox` +
    `/${traffic}/${location}` +
    `?alternatives=false` +
    `&geometries=geojson` +
    `&language=ko-KR` +
    `&overview=full` +
    `&steps=true` +
    `&access_token=${accessToken}`;

  await axios
    .get(requestUrl)
    .then((res) => {
      navigationInfo.setGeoJsonPath(res.data.routes[0].geometry.coordinates);
    })
    .catch((err) => {
      console.log(err);
    });
};
