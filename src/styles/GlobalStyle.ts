import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const theme = {
  colors: {
    dong: '#FF314A',
    nari: '#FFAA0E',
    deepNari: '#F48400',
    deepGray: '#5B5B5B',
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
    --Primary-Deep-nari: ${theme.colors.deepNari};
    --Secondary-dong-2: #FFEDF0;
    --Secondary-nari-2: #ffebb2;
    --Base-Deep-Gray: ${theme.colors.deepGray};
  }
`;

export default GlobalStyle;
