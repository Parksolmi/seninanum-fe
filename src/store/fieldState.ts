import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface FieldState {
  field: number;
}
interface FieldStateType {
  fieldState: FieldState;
  setFieldState: (field: number) => void;
}

const useFieldState = create<FieldStateType>()(
  devtools((set) => ({
    fieldState: {
      field: 0,
    },
    setFieldState: (field) =>
      set((state) => ({
        fieldState: { ...state.fieldState, field },
      })),
  }))
);

export default useFieldState;
