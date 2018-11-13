export const tokenize = name => {
  return name
    .trim()
    .replace(/ /g, "-")
    .toLowerCase();
};
