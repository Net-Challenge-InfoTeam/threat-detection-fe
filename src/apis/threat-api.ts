import { ThreatResponse, threatResponseToThreat } from "src/types/threat";

import { apiGetter, apiPoster } from "./interceptor";

export const getAllThreats = async ({ queryKey }: { queryKey: [string] }) => {
  const [,] = queryKey;

  const { data } = await apiGetter<ThreatResponse[]>(`/threat/get`);

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
    `/threat/nearby?location=[${longitude}, ${latitude}]&radius=${radius}`,
  );

  return data.map((threatResponse) => threatResponseToThreat(threatResponse));
};

export const postReport = async (props: {
  latitude: number;
  longitude: number;
  capturedAt: Date;
  image: File;
}) => {
  const { latitude, longitude, capturedAt, image } = props;

  const formData = new FormData();
  const fileExtension = image.name.split(".").pop();

  // Create a new file with the modified name
  const fileName = `(${longitude},${latitude})_${capturedAt.toISOString()}.${fileExtension}`;
  const modifiedFile = new File([image], fileName, { type: image.type });

  formData.append("image", modifiedFile);

  const { data } = await apiPoster("/report", formData);

  return data;
};
