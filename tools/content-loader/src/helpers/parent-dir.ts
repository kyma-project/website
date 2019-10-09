import { sep } from "path";

export const parentDir = (p: string) => {
  if (!p) {
    return "";
  }
  const parent = p.substring(0, p.lastIndexOf(sep));
  return parent ? parent : "";
};
