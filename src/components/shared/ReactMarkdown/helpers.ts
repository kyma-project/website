const tabsBlockRegex = /<div tabs>(.|\n)*?<\/div>/gm;
const blankLinesRegex = /^\s*$(?:\r\n?|\n)/gm;

export const removeBlankLines = (source: string) =>
  source.replace(blankLinesRegex, "");

export const removeBlankLinesFromTabsBlock = (source?: string) =>
  source &&
  source.replace(tabsBlockRegex, occurrence => {
    let result = removeBlankLines(occurrence);

    return result;
  });
