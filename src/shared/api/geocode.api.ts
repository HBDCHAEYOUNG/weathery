import type { GeocodeResponse } from "@/shared/model/geocode.schema";
import { convertLatLonToGrid } from "../lib/grid-converter";

const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;

async function fetchGeocodeApi(
  district: string
): Promise<GeocodeResponse | null> {
  const response = await fetch(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${district}`,
    {
      headers: {
        Authorization: `KakaoAK ${REST_API_KEY}`,
      },
    }
  );

  if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

  const data = await response.json();
  if (data.documents && data.documents.length > 0) {
   
     const lng= data.documents[0].x;
     const lat= data.documents[0].y;
    return convertLatLonToGrid(lat,lng);
  }
  return null;
}

export default fetchGeocodeApi;
