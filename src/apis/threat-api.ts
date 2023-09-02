import { ThreatResponse, threatResponseToThreat } from "src/types/threat";

import { apiGetter } from "./interceptor";

export const getAllThreats = async ({ queryKey }: { queryKey: [string] }) => {
  const [,] = queryKey;

  const { data } = await apiGetter<ThreatResponse[]>(`/threat`);

  return data.map((threatResponse) => threatResponseToThreat(threatResponse));
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

  const { data } = await apiGetter<ThreatResponse[]>(
    `/threat/nearby?location=[${latitude}, ${longitude}]&radius=${radius}`,
  );

  return data.map((threatResponse) => threatResponseToThreat(threatResponse));
};
