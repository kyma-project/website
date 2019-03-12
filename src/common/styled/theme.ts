interface Colors {
  text: {
    primary: string;
    secondary: string;
  };
  background: {
    primary: string;
    secondary: string;
    third: string;
    fourth: string;
    fifth: string;
    sixth: string;
  };
  link: {
    primary: string;
    secondary: string;
  };
  border: {
    primary: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
  };
}

type BaseSizeType = "base" | "sm" | "reg" | "md" | "lg";
type SizeType = "base" | "xs" | "sm" | "reg" | "md" | "lg" | "xl";

type FontSize = { [key in SizeType]: string };
type LineHeight = { [key in BaseSizeType]: string };
type Padding = { [key in SizeType]: string };

type WeightType = "light" | "reg" | "md" | "semi" | "bold";

type FontWeight = { [key in WeightType]: number };

export type TimingFunction =
  | "ease"
  | "linear"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "step-start"
  | "step-end";

interface Animation {
  duration: string;
  delay: string;
}

export interface BaseTheme {
  fontSize: FontSize;
  lineHeight: LineHeight;
  fontWeight: FontWeight;
  padding: Padding;
  animation: Animation;
}

export interface Theme extends BaseTheme {
  colors: Colors;
}

const defaultTheme: BaseTheme = {
  fontSize: {
    base: "16px",
    xs: "12px",
    sm: "14px",
    reg: "16px",
    md: "20px",
    lg: "24px",
    xl: "40px",
  },
  lineHeight: {
    base: "1.5",
    sm: "1.625",
    reg: "1.5",
    md: "1.375",
    lg: "1.2",
  },
  fontWeight: {
    light: 300,
    reg: 400,
    md: 500,
    semi: 600,
    bold: 700,
  },
  padding: {
    base: "4px",
    xs: "8px",
    sm: "12px",
    reg: "20px",
    md: "32px",
    lg: "40px",
    xl: "52px",
  },
  animation: {
    duration: ".2s",
    delay: "0",
  },
};

const lightTheme: Theme = {
  ...defaultTheme,
  colors: {
    text: {
      primary: "#485766",
      secondary: "#fff",
    },
    background: {
      primary: "#fff",
      secondary: "#0098ff",
      third: "#0073e6",
      fourth: "#004085",
      fifth: "#5800eb",
      sixth: "#00ee00",
    },
    link: {
      primary: "#0073e6",
      secondary: "#fff",
    },
    border: {
      primary: "#0073e6",
      secondary: "#fff",
      tertiary: "#49C7A0",
      quaternary: "#DD0000",
    },
  },
};

export { lightTheme };
