export type Read = (path: string) => Promise<any>;

export const memoizeRead = (f: Read) => {
  const cache: any = {};
  return async (path: string) => {
    const cachedResult = cache[path];
    if (!cachedResult) {
      cache[path] = f(path);
    }
    return cache[path];
  };
};
