export const removeHTMLComments = (text: string) => {
  const regex = new RegExp(
    "<!--[\\s\\S]*?(?:-->)?" +
    "<!---+>?" + // A comment with no body
      "|<!(?![dD][oO][cC][tT][yY][pP][eE]|\\[CDATA\\[)[^>]*>?" +
      "|<[?][^>]*>?", // A pseudo-comment
    "g",
  );

  return text.replace(regex, "");
};
