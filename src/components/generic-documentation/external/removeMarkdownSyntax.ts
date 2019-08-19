// Code is taken from https://github.com/stiang/remove-markdown/blob/master/index.js with only needed regular expressions

export function removeMarkdownSyntax(
  markdown: string,
  removeHTMLTags: boolean = true,
): string {
  if (!markdown) {
    return markdown;
  }

  const content = removeHTMLTags ? markdown.replace(/<[^>]*>/g, "") : markdown;

  return (
    content
      // Remove images
      .replace(/\!\[(.*?)\][\[\(].*?[\]\)]/g, "")
      // Remove inline links
      .replace(/\[(.*?)\][\[\(].*?[\]\)]/g, "$1")
      // Remove blockquotes
      .replace(/^\s{0,3}>\s?/g, "")
      // Remove emphasis (repeat the line to remove double emphasis)
      .replace(/([\*_]{1,3})(\S.*?\S{0,1})\1/g, "$2")
      .replace(/([\*_]{1,3})(\S.*?\S{0,1})\1/g, "$2")
      // Remove inline code
      .replace(/`(.+?)`/g, "$1")
      // Strikethrough
      .replace(/~~/g, "")
  );
}
