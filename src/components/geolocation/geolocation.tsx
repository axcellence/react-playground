import { Button } from "../ui/button";
import { useGeolocation } from "./use-geolocation";

export function Geolocation() {
  const { requestLocation, isLoading, location } = useGeolocation();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Button onClick={requestLocation}>Request Permission</Button>
      <pre>{JSON.stringify(location, null, 2)}</pre>
    </div>
  );
}
