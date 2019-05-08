export const getUnique = <T>(arr: T[], comp: string) =>
  arr
    .map(e => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(e => arr[e])
    .map(e => arr[e]);
