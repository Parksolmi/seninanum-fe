import { useEffect } from 'react';

export const useStatusBarColor = () => {
  //상태바 색상 변경
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', '#FF314A');
    }
  }, []);
};
