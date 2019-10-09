import config from "@config";

export const resolveSocialMedia = (media: keyof typeof config.socialMedia) =>
  config.socialMedia[media];
