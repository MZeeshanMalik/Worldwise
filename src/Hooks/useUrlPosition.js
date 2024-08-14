import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [serchParams] = useSearchParams();
  const lat = serchParams.get("lat");
  const lng = serchParams.get("lng");
  return [lat, lng];
}
