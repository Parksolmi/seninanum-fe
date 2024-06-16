import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface FieldState {
  field: number;
}
interface FieldStateType {
  fieldState: FieldState;
  setFieldState: (field: number) => void;
}

const useFieldState = create<FieldStateType>()(
  devtools(
    persist(
      (set) => ({
        fieldState: {
          field: 0,
        },
        setFieldState: (field) =>
          set((state) => ({
            fieldState: { ...state.fieldState, field },
          })),
      }),
      {
        name: 'fieldState',
      }
    )
  )
);

export default useFieldState;
