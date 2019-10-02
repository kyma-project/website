declare global {
  interface Window {
    docsearch: any;
    decodeURI: (str: string) => string;
    __GATSBY_ROUTE_UPDATED: boolean;
    __GATSBY_IN_MODAL_PAGE: boolean;
    __GATSBY_INITIAL_RENDER_COMPLETE: boolean;
  }
}
export {};
