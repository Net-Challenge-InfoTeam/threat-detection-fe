import { Area } from "@dohyun-ko/react-atoms";
import { useRef, useState } from "react";
import Mapviewer from "src/components/Mapviewer";
import Safety from "src/types/safety";

const data = [
  {
    id: 1,
    location: {
      longitude: 126.84096217263814,
      latitude: 35.228096665528106,
    },
    kind: "칼",
    count: 3,
    acc: [0.5, 0.6, 0.7],
    detectedAt: new Date("2023-09-01T14:58:58.000Z"),
  },
  {
    id: 1,
    location: {
      longitude: 126.84157217263814,
      latitude: 35.2283966655281,
    },
    kind: "담배",
    count: 3,
    acc: [0.5, 0.6, 0.7],
    detectedAt: new Date("2023-09-01T14:58:58.000Z"),
  },
];

interface MonitorPageProps {}

const MonitorPage = ({}: MonitorPageProps) => {
  const [safety, setSafety] = useState<Safety>(Safety.SAFE);
  const mapViewerRef = useRef<HTMLDivElement>(null);

  return (
    <Area> {data && <Mapviewer threats={data} ref={mapViewerRef} />}</Area>
  );
};

export default MonitorPage;
