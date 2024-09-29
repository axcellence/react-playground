import { useState } from "react";
import { usePermissions } from "./use-permissions";

function getGeolocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  }) as Promise<GeolocationPosition>;
}

export function useGeolocation() {
  const permissionStatus = usePermissions("geolocation");
  const [location, setLocation] = useState<GeolocationPosition["coords"]>();
  const [isLoading, setIsLoading] = useState(false);

  const requestLocationFunction = async () => {
    setIsLoading(true);

    getGeolocation().then((position) => {
      setLocation(position.coords);
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
      setIsLoading(false);
    });
  };

  return {
    requestLocation: requestLocationFunction,
    isLoading,
    isGranted: permissionStatus.isGranted,
    location,
  };
}
