declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.json" {
  const content: any;
  export default content;
}

declare module "*.js" {
  const content: any;
  export default content;
}

import MyInterface from "./MyInterface";

declare global {
  interface Window {
    docsearch: any;
  }
}

declare module "prism-react-renderer";
declare module "react-modal-hook";
declare module "get-video-id";
