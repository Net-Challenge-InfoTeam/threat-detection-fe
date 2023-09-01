import { apiGetter } from "./interceptor";

export const getAllThreats = async ({ queryKey }: { queryKey: [string] }) => {
  const [,] = queryKey;

  const { data } = await apiGetter(`/threat`);

  return data;
};

export const getNearbyThreats = async ({
  queryKey,
}: {
  queryKey: [
    string,
    {
      latitude: number;
      longitude: number;
      radius: number;
    },
  ];
}) => {
  const [, { latitude, longitude, radius }] = queryKey;

  const { data } = await apiGetter(
    `/threat/nearby?location=[${latitude}, ${longitude}]&radius=${radius}`,
  );

  return data;
};
