import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { locationAtom } from "src/store";

const useGPS = () => {
  const [location, setLocation] = useAtom(locationAtom);
  const [error, setError] = useState<GeolocationPositionError>();

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => setLocation(position),
      (error) => setError(error),
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return { location, error };
};

export default useGPS;
