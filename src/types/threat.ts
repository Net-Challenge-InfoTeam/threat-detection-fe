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
  const match = threatResponse.location.match(/POINT\((\d+\.\d+) (\d+\.\d+)\)/);

  if (!match) {
    throw new Error(`Invalid location: ${threatResponse.location}`);
  }

  const [, latitude, longitude] = match;

  return {
    ...threatResponse,
    location: {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
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
