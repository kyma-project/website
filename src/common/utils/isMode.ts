export const isDevelopmentMode = (): boolean =>
  Boolean(process.env.NODE_ENV && process.env.NODE_ENV === "development");

export const isProductionMode = (): boolean =>
  Boolean(process.env.NODE_ENV && process.env.NODE_ENV === "production");
