export const toKebabCase = (str: string): string => {
  if (!str) {
    return "";
  }
  const data = str.match(
    /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
  );
  if (!data) {
    return "";
  }
  return data.map(x => x.toLowerCase()).join("-");
};
