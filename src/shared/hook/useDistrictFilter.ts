import { useMemo } from "react";
import koreaDistricts from "@/shared/const/korea-districts.json";

function useDistrictFilter(searchText: string) {
  return useMemo(() => {
    if (!searchText) return [];

    const searchWords = searchText
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0)
      .map((word) => word.replace(/[\s-]/g, ""));

    return koreaDistricts.filter((district: string) => {
      const normalizedDistrict = district.replace(/[\s-]/g, "");
      return searchWords.every((word) => normalizedDistrict.includes(word));
    });
  }, [searchText]);
}

export default useDistrictFilter;
