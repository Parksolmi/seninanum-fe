import { createGlobalStyle } from 'styled-components';

const theme = {
  colors: {
    dong: '#FF314A',
    nari: '#FFAA0E',
  },
  fonts: {
    code: "'Nanum Gothic Coding', monospace",
  },
  fontSizes: {
    title: '44px',
    subtitle: '32px',
    tag: '26px',
    larger: '20px',
    text: '18px',
  },
};

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: "Helvetica", "Arial", sans-serif;
    line-height: 1.5;
  }

  :root {
    --color-dong: ${theme.colors.dong};
    --color-nari: ${theme.colors.nari};

    --font-code: ${theme.fonts.code};

    --font-size-title: ${theme.fontSizes.title};
    --font-size-subtitle: ${theme.fontSizes.subtitle};
    --font-size-tag: ${theme.fontSizes.tag};
    --font-size-larger: ${theme.fontSizes.larger};
    --font-size-text: ${theme.fontSizes.text};
  }
`;

export default GlobalStyle;
