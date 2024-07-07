import { create } from 'zustand';

interface ProgressState {
  status: number;
  setStatus: (newStatus: number) => void;
}

const progressStore = create<ProgressState>((set) => ({
  status: 1,
  setStatus: (newStatus) => set({ status: newStatus }),
}));

export default progressStore;
