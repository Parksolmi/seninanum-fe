import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface TabContextType {
  tabMenuState: number;
  setTabMenuState: (menu: number) => void;
}

const TabMenu = create<TabContextType>()(
  devtools((set) => ({
    tabMenuState: 0,
    setTabMenuState: (menu: number) => set({ tabMenuState: menu }),
  }))
);
export default TabMenu;
