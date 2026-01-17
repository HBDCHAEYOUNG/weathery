import { useQuery } from "@tanstack/react-query";
import fetchGeocodeApi from "@/shared/api/geocode.api";

function useGeocodeQuery(district: string) {
  const query = useQuery({
    queryKey: ["geocode", district],
    queryFn: () => fetchGeocodeApi(district),
  });

  return query;
}

export default useGeocodeQuery;
