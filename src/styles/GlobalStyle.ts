import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const theme = {
  colors: {
    dong: '#FF314A',
    nari: '#FFAA0E',
    deepGray: '#5B5B5B',
  },
};

const GlobalStyle = createGlobalStyle`

  ${reset}

  *, body {
    margin-left: 1rem;
    margin-right: 1rem;
    box-sizing: border-box;
    font-family: 'Nanum_Square';
    /* margin: 0 1.1rem; */
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
