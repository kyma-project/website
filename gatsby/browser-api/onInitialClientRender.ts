import { getTargetOffset } from "./helpers";

export const onInitialClientRender = (): void => {
  setTimeout(() => {
    window.__GATSBY_INITIAL_RENDER_COMPLETE = true;
  }, 10);

  requestAnimationFrame(() => {
    const offset = getTargetOffset(window.location.hash);
    if (offset !== null) {
      setTimeout(() => window.scrollTo(0, offset), 10);
    }
  });
};
