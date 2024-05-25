import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import NanumSquareL from '../fonts/NanumSquareL.woff';
import NanumSquareR from '../fonts/NanumSquareR.woff';
import NanumSquareB from '../fonts/NanumSquareB.woff';

const theme = {
  colors: {
    dong: '#FF314A',
    nari: '#FFAA0E',
    deepGray: '#5B5B5B',
  },
};

const GlobalStyle = createGlobalStyle`

  ${reset}

  @font-face {
    font-family: Nanum_Square;
    font-style: normal;
    line-height: 1;
    src: local('NanumSquareB'), local('NanumSquareB');
        font-style: normal;
        src: url(${NanumSquareB}) format('woff');
  }
  @font-face {
    font-family: Nanum_Square;
    font-style: normal;
    line-height: 1;
    src: local('NanumSquareR'), local('NanumSquareR');
        font-style: normal;
        src: url(${NanumSquareR}) format('woff');
  }
  @font-face {
    font-family: Nanum_Square;
    font-style: normal;
    line-height: 1;
    src: local('NanumSquareL'), local('NanumSquareL');
        font-style: normal;
        src: url(${NanumSquareL}) format('woff');
  }

  *, body {
    box-sizing: border-box;
    font-family: Nanum_Square;
    margin: 0 1.1rem;
  }

  :root {
    --Primary-dong: ${theme.colors.dong};
    --Primary-nari: ${theme.colors.nari};
    --Base-Deep-Gray: ${theme.colors.deepGray};
  }
`;

export default GlobalStyle;
