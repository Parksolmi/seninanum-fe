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
    src: local('NanumSquareB'), local('NanumSquareB');
        font-style: normal;
        src: url(${NanumSquareB}) format('woff');
    font-display: swap;
  }
  @font-face {
    font-family: Nanum_Square;
    font-style: normal;
    src: local('NanumSquareR'), local('NanumSquareR');
        font-style: normal;
        src: url(${NanumSquareR}) format('woff');
    font-display: swap;
  }
  @font-face {
    font-family: Nanum_Square;
    font-style: normal;
    src: local('NanumSquareL'), local('NanumSquareL');
        font-style: normal;
        src: url(${NanumSquareL}) format('woff');
    font-display: swap;
  }

  *, body {
    box-sizing: border-box;
    font-family: Nanum_Square;
    margin: 0 1.1rem;
  }
  div{
    font-family: Nanum_Square;
  }

  :root {
    --Primary-dong: ${theme.colors.dong};
    --Primary-nari: ${theme.colors.nari};
    --Secondary-dong-2: #FFEDF0;
    --Secondary-nari-2: #FFF8E3;
    --Base-Deep-Gray: ${theme.colors.deepGray};
  }
`;

export default GlobalStyle;
