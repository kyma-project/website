export interface ActiveNav {
  id: string;
  type: string;
  hash: string;
}

export type ScrollSpyNodeType = "groupOfDocuments" | "document" | "header";

export interface ScrollSpyNode {
  id: string;
  offsetHeight: number;
  offsetTop: number;
}

export type ScrollSpyOffset = {
  [key: string]: number;
};

export type ScrollSpyNodes = {
  [key: string]: ScrollSpyNode[];
};

export type ScrollSpyActiveNodes = {
  [key: string]: ScrollSpyNode;
};
