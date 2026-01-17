export interface WeatherParams {
  serviceKey: string;
  numOfRows?: number;
  pageNo?: number;
  dataType?: "JSON" | "XML";
  base_date?: string;
  base_time?: string;
  nx: number;
  ny: number;
}

export interface WeatherItem {
  baseDate: string;
  baseTime: string;
  category: string;
  nx: number;
  ny: number;
  obsrValue: string;
}

export interface WeatherResponse {
  dataType: string;
  items: {
    item: WeatherItem[];
  };
  numOfRows: number;
  pageNo: number;
  totalCount: number;
}

export interface ForecastItem {
  baseDate: string;
  baseTime: string;
  category: string;
  nx: number;
  ny: number;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
}

export interface ForecastResponse {
  dataType: string;
  items: {
    item: ForecastItem[];
  };
  numOfRows: number;
  pageNo: number;
  totalCount: number;
}

//클라이언트에서 사용할 파라미터 타입들 (serviceKey 제외)
export type WeatherRequestParams = Omit<WeatherParams, "serviceKey">;
