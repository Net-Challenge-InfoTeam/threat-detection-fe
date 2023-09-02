export interface ThreatResponse {
  id: number;
  location: string;
  kind: string;
  count: number;
  acc: string[];
  detectedAt: string;
}

export const threatResponseToThreat = (
  threatResponse: ThreatResponse,
): Threat => {
  const location = threatResponse.location.replace(/[^0-9| ]/g, '"').split(" ");

  return {
    ...threatResponse,
    location: {
      latitude: Number(location[0]),
      longitude: Number(location[1]),
    },
    acc: threatResponse.acc.map((acc) => Number(acc.trim())),
    detectedAt: new Date(threatResponse.detectedAt),
  };
};

interface Threat {
  id: number;
  location: {
    latitude: number;
    longitude: number;
  };
  kind: string;
  count: number;
  acc: number[];
  detectedAt: Date;
}

export default Threat;
