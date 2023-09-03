import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { locationAtom } from "src/store";

const useGPS = () => {
  const [location, setLocation] = useAtom(locationAtom);
  const [error, setError] = useState<GeolocationPositionError>();

  useEffect(() => {
    const watchId = navigator.geolocation.getCurrentPosition(
      (position) => setLocation(position),
      (error) => setError(error),
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
      },
    );

    return () => {};
  }, [setLocation]);

  return { location, error };
};

export default useGPS;
