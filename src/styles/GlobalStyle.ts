import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const theme = {
  colors: {
    dong: '#FF314A',
    nari: '#FFAA0E',
    nari2: '#FFD111',
    nariText: '#464646',
    deepNari: '#F48400',
    deepGray: '#5B5B5B',
    lightGray: '#8E8E8E',
  },
};

const GlobalStyle = createGlobalStyle`

  ${reset}

  *, body {
    box-sizing: border-box;
    font-family: 'Nanum_Square';
  }

  :root {
    --Primary-dong: ${theme.colors.dong};
    --Primary-nari: ${theme.colors.nari};
    --Nari-1: ${theme.colors.nari2};
    --Primary-Deep-nari: ${theme.colors.deepNari};
    --Secondary-dong-2: #FFEDF0;
    --Secondary-nari-2: #ffebb2;
    --Base-Deep-Gray: ${theme.colors.deepGray};
    --Base-Gray-3: ${theme.colors.lightGray};
    --Nari-Nari-Text: ${theme.colors.nariText};
  }
`;

export default GlobalStyle;
