import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { locationAtom } from "src/store";

const useGPS = () => {
  const [location, setLocation] = useAtom(locationAtom);
  const [error, setError] = useState<GeolocationPositionError>();

  useEffect(() => {
    const watchId = navigator.geolocation.getCurrentPosition(
      (position) => {
        const already = {
          coords: {
            accuracy: 11.0,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            latitude: 35.2277932,
            longitude: 126.8406592,
            speed: null,
          },
          timestamp: 1698580728366,
        };

        console.log("watchId", position);
        setLocation(position);
      },
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
