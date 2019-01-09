export const tokenize = str => {
  if (!str) return "";

  return str
    .trim()
    .replace(/ /g, "-")
    .toLowerCase();
};
