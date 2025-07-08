// theme.js

const baseFonts = {
  heading: "'Baloo 2', cursive",
  body:    "'Inter', sans-serif",
};

const baseSpacing = {
  pagePadding:  "2rem",    // aligns with --space-lg
  cardPadding:  "1rem",    // aligns with --space-md
  borderRadius: "0.75rem", // aligns with .container, .card
};

const baseShadows = {
  card: "0 2px 8px rgba(0,0,0,0.1)",
};

export const lightTheme = {
  colors: {
    primary:             "#8e44ad",  // your main purple
    primaryDark:         "#6c3483",  // darker hover/focus
    background:          "#ffffff",
    secondaryBackground: "#f9f9f9",
    cardBackground:      "#f9f9f9",
    text:                "#222222",
    accent:              "#69F0AE",  // mint accent
  },
  fonts:    baseFonts,
  spacing:  baseSpacing,
  shadows:  baseShadows,
};

export const darkTheme = {
  colors: {
    primary:             "#8e44ad",
    primaryDark:         "#6c3483",
    background:          "#181818",  // true dark background
    secondaryBackground: "#222222",
    cardBackground:      "#222222",
    text:                "#f9f9f9",
    accent:              "#69F0AE",
  },
  fonts:    baseFonts,
  spacing:  baseSpacing,
  shadows:  baseShadows,
};

export const theme = { light: lightTheme, dark: darkTheme };
