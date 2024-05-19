import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

// Context에서 사용할 타입 정의
interface TabContextType {
  tabMenuState: number | null;
  setTabMenuState: Dispatch<SetStateAction<number | null>>;
}

// 기본값 정의
const defaultState: TabContextType = {
  tabMenuState: 0,
  setTabMenuState: () => {},
};

// Context 생성
export const TabContext = createContext<TabContextType>(defaultState);

// Provider 컴포넌트 타입 정의
interface TabProviderProps {
  children: ReactNode;
}

// Provider 컴포넌트 생성
export const TabProvider: React.FC<TabProviderProps> = ({ children }) => {
  const [tabMenuState, setTabMenuState] = useState<number | null>(null);

  return (
    <TabContext.Provider value={{ tabMenuState, setTabMenuState }}>
      {children}
    </TabContext.Provider>
  );
};
