import { useEffect, useState } from "react";

const useGPS = () => {
  const [location, setLocation] = useState<GeolocationPosition>();
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
