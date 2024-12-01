import { create } from 'zustand';

interface SelectedState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useCommandStore = create<SelectedState>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));
