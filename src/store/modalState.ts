import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ModalState {
  modal: JSX.Element | null;
  setModal: (modal: JSX.Element | null) => void;
}

// Zustand store 생성
const useModalState = create<ModalState>()(
  devtools((set) => ({
    modal: null,
    setModal: (modal) => set({ modal: modal }),
  }))
);

export { useModalState };
