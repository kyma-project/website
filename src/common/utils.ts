import config from "@config";

export const resolveSocialMedia = (media: string) => config.socialMedia[media];

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
