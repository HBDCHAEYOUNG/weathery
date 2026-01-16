import { useEffect, useState } from "react";

interface Location {
  loaded: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
  error?: {
    code: GeolocationPositionError["code"];
    message: string;
  };
}

function useCurrentLocation() {
  const [location, setLocation] = useState<Location>({
    loaded: false,
    coordinates: { lat: 0, lng: 0 },
  });

  const handleSuccess = (location: {
    coords: { latitude: number; longitude: number };
  }) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const handleError = (error: GeolocationPositionError) => {
    let errorMessage = "";
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMessage = "위치 정보 접근 권한이 거부되었습니다.";
        break;
      case error.POSITION_UNAVAILABLE:
        errorMessage = "위치 정보를 사용할 수 없습니다.";
        break;
      case error.TIMEOUT:
        errorMessage = "위치 정보 요청 시간이 초과되었습니다.";
        break;
      default:
        errorMessage =
          error.message || "위치 정보를 가져오는 중 오류가 발생했습니다.";
    }
    setLocation({
      loaded: true,
      error: {
        code: error.code,
        message: errorMessage,
      },
    });
  };

  useEffect(() => {
    const { geolocation } = navigator;
    if (!geolocation) {
      setLocation({
        loaded: false,
        error: {
          code: 0,
          message: "이 브라우저는 위치 정보를 지원하지 않습니다.",
        },
      });
      return;
    }
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);
  return location;
}

export default useCurrentLocation;
