export const markdownTypes: string[] = ["markdown", "md"];
export const types: Set<string> = new Set<string>();
export let hideTitleHeader: boolean = false;

export function setHideTitleHeader(b: boolean) {
  hideTitleHeader = b;
}
