import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import NanumSquareL from '../fonts/NanumSquareL.woff';
import NanumSquareR from '../fonts/NanumSquareR.woff';
import NanumSquareB from '../fonts/NanumSquareB.woff';

const theme = {
  colors: {
    dong: '#FF314A',
    nari: '#FFAA0E',
  },
};

const GlobalStyle = createGlobalStyle`

  ${reset}

  @font-face {
    font-family: Nanum_Square;
    src: local('NanumSquareB'), local('NanumSquareB');
        font-style: normal;
        src: url(${NanumSquareB}) format('woff');
  }
  @font-face {
    font-family: Nanum_Square;
    src: local('NanumSquareR'), local('NanumSquareR');
        font-style: normal;
        src: url(${NanumSquareR}) format('woff');
  }
  @font-face {
    font-family: Nanum_Square;
    src: local('NanumSquareL'), local('NanumSquareL');
        font-style: normal;
        src: url(${NanumSquareL}) format('woff');
  }

  *, body {
    box-sizing: border-box;
    font-family: Nanum_Square;
  }

  :root {
    --color-dong: ${theme.colors.dong};
    --color-nari: ${theme.colors.nari};
  }
`;

export default GlobalStyle;
