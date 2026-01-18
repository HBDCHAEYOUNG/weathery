import { useQuery } from "@tanstack/react-query";
import { fetchGeocodeApi, fetchReverseGeocodeApi } from "@/shared/api/geocode.api";

function useGeocodeQuery(district: string) {
  const query = useQuery({
    queryKey: ["geocode", district],
    queryFn: () => fetchGeocodeApi(district),
  });

  return query;
}

function useReverseGeocodeQuery(lng: number, lat: number) {
  const query = useQuery({
    queryKey: ["reverseGeocode"],
    queryFn: () => fetchReverseGeocodeApi(lng, lat),
    enabled: !!lng && !!lat,
  });
  return query;
}

export { useGeocodeQuery, useReverseGeocodeQuery };