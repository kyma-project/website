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

export interface ScrollSpyOffset {
  [key: string]: number;
}

export interface ScrollSpyNodes {
  [key: string]: ScrollSpyNode[];
}

export interface ScrollSpyActiveNodes {
  [key: string]: ScrollSpyNode;
}
