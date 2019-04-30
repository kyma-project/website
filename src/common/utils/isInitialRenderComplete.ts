export const isInitialRenderComplete = (): boolean =>
  Boolean(window && (window as any).___GATSBYGRAM_INITIAL_RENDER_COMPLETE);
