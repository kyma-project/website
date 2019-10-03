export const getUnique = <T extends { [key: string]: any }>(
  arr: T[],
  comp: string,
): T[] => <T[]>arr
    .map(e => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(e => typeof e === "number" && arr[e])
    .map(e => (typeof e === "number" ? arr[e] : undefined))
    .filter(e => typeof e !== "undefined");
