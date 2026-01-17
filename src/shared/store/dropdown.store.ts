import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Dropdown {
  isOpen: boolean;
  searchText: string;
}

interface DropdownProps extends Dropdown {
  toggle: () => void;
  setSearchText: (text: string) => void;
  handleOpenChange: (open: boolean) => void;
}

const INIT = {
  isOpen: false,
  searchText: "",
};

export const useDropdownStore = create<DropdownProps>()(
  persist(
    (set) => ({
      ...INIT,
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),
      setSearchText: (text: string) => set({ searchText: text }),
      handleOpenChange: (open: boolean) =>
        set({ isOpen: open, ...(open ? {} : { searchText: "" }) }),
    }),
    {
      name: "dropdown-storage",
    }
  )
);