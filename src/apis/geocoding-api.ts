import Geocode from "react-geocode";

export const getAddress = async ({
  queryKey,
}: {
  queryKey: [string, { latitude: number; longitude: number }];
}) => {
  const [, { latitude, longitude }] = queryKey;

  const response = await Geocode.fromLatLng(
    latitude.toString(),
    longitude.toString(),
  );

  return response.results[0].formatted_address;
};
