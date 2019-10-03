export const getUnique = <T extends { [key: string]: any }>(
  arr: T[],
  comp: string,
): T[] =>
  arr
    .map(e => e[comp])
    .map((e, i, final) => (final.indexOf(e) === i && i) as number)
    .filter(e => arr[e])
    .map(e => arr[e]);
