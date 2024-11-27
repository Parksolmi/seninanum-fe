import { create } from 'zustand';

interface fieldState {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

// Zustand store 생성
const useEventSelectedField = create<fieldState>()((set) => ({
  selectedIndex: 0,
  setSelectedIndex: (index: number) => set({ selectedIndex: index }),
}));

export { useEventSelectedField };
