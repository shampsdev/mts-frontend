import { create } from 'zustand';
import { Person } from '../interfaces/person.interface';

interface SelectedState {
  selected: Person | null;
  setSelected: (selected: Person | null) => void;
}

export const useSelectedStore = create<SelectedState>((set) => ({
  selected: null,
  setSelected: (selected: Person | null) => set({ selected }),
}));
