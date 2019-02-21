import Typography from "typography";

const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 1.6,
  scaleRatio: 5 / 2,
  headerFontFamily: [
    "Poppins",
    "Lato",
    "San Francisco",
    "Helvetica",
    "sans-serif",
  ],
  bodyFontFamily: [
    "Poppins",
    "Source Sans Pro",
    "San Francisco",
    "Helvetica",
    "sans-serif",
  ],
  bodyColor: "hsla(0,0%,0%,0.9)",
  headerWeight: 600,
  bodyWeight: 500,
  boldWeight: 700,
  overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => ({
    h1: {
      fontSize: "40px",
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "40px",
      lineHeight: 1.4,
      margin: "0 0 30px 0",
    },
    h3: {
      fontSize: "24px",
      lineHeight: 1.375,
    },
    h4: {
      fontSize: "20px",
      lineHeight: 1.3,
    },
    h5: {
      fontSize: "16px",
      lineHeight: 1.3,
    },
    h6: {
      fontSize: "16px",
      lineHeight: 1.3,
    },
    a: {
      textDecoration: "none",
    },
  }),
});

export default typography;
