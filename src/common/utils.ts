import config from "@config";

export const resolveSocialMedia = (media: keyof typeof config.socialMedia) =>
  config.socialMedia[media];

export const getActualYear = () => {
  const d = new Date();
  return d.getFullYear();
};

export const tokenize = (str?: string) => {
  if (!str) {
    return "";
  }

  return str
    .trim()
    .replace(/ /g, "-")
    .toLowerCase();
};

export const isDevelopmentMode = (): boolean =>
  Boolean(process.env.NODE_ENV && process.env.NODE_ENV === "development");

export const isProductionMode = (): boolean =>
  Boolean(process.env.NODE_ENV && process.env.NODE_ENV === "production");
