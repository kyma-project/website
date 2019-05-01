export const isInitialRenderComplete = (): boolean =>
  Boolean(
    typeof window !== "undefined" &&
      (window as any).__GATSBY_INITIAL_RENDER_COMPLETE,
  );
