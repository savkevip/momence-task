import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    primary: "#57B4BA",
    secondary: "#015551",
    background: "#FDFBEE",
    error: "#FE4F2D",
    white: "#FFFFFF",
    black: "#000000",
  },
  fonts: {
    main: "'Roboto', sans-serif",
  },
  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    laptop: "1024px",
    desktop: "1200px",
  },
};

export type ThemeType = typeof theme;
