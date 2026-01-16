import { useMemo } from "react";
import { getDistricts } from "../api/districts.api";

function useDistrictFilter(searchText: string) {
  const koreaDistricts = getDistricts();
  return useMemo(() => {
    if (!searchText) return koreaDistricts;

    const searchWords = searchText
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0)
      .map((word) => word.replace(/[\s-]/g, ""));

    return koreaDistricts.filter((district: string) => {
      const normalizedDistrict = district.replace(/[\s-]/g, "");
      return searchWords.every((word) => normalizedDistrict.includes(word));
    });
  }, [searchText, koreaDistricts]);
}

export default useDistrictFilter;
