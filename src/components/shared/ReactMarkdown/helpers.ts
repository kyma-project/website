const tabsBlockRegex = /<div\s+tabs\s*?(name=('|").+('|"))?\s*?>(.|\n)*?<\/div>/g;
// Regex for removing blank lines for correct parsing toggle in ReactMarkdown component
const blankLinesRegex = /^\s*$(?:\r\n?|\n)/gm;
const codeBlocksRegex = /^(([ \t]*`{3,4})([^\n]*)([\s\S]+?)(^[ \t]*\2))/gm;
const lessThanChar = "&#60;";

export const removeBlankLines = (source: string) =>
  source.replace(blankLinesRegex, "");

export const removeBlankLinesFromTabsBlock = (source?: string) =>
  source &&
  source.replace(tabsBlockRegex, occurrence => removeBlankLines(occurrence));

export const replaceAllLessThanChars = (source?: string) =>
  source &&
  source.replace(codeBlocksRegex, occurrence =>
    occurrence.replace(/</gm, lessThanChar),
  );
