import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Dropdown {
  isOpen: boolean;
  searchText: string;
}

interface DropdownProps extends Dropdown {
  toggle: () => void;
  setSearchText: (text: string) => void;
}

const INIT = {
  isOpen: false,
  searchText: "",
};

export const useDropdownStore = create<DropdownProps>()(
  persist(
    (set) => ({
      ...INIT,
      toggle: () => set((state) => ({ isOpen: !state.isOpen, searchText: "" })),
      setSearchText: (text: string) => set({ searchText: text }),
    }),
    {
      name: "dropdown-storage",
    }
  )
);