export const DOCS_PATH_NAME: string = "docs";

export const MOBILE_DEVICES_BREAKPOINT: number = 1024;
export const PHONE_RESPONSIVE_BREAKPOINT: number = 768;
export const DOCS_RESPONSIVE_BREAKPOINT: number = 768;

export const RICK_ROLLED = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

export const ALGOLIA = {
  API_KEY:
    "e55c0e91d299036ba9171a8961e05c88" ||
    process.env.ALGOLIA_API_KEY ||
    "25626fae796133dc1e734c6bcaaeac3c",
  INDEX_NAME: "kyma-project" || process.env.ALGOLIA_INDEX_NAME || "docsearch",
};
