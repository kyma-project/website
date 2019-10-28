export interface PageContext<T> {
  pageContext: T;
}

export interface IntlPageContext {
  locale: string;
}

export interface PreviewPageContext {
  inPreview: boolean;
}

export enum BuildFor {
  WEBSITE = "website",
  DOCS_PREVIEW = "docs-preview",
  COMMUNITY_PREVIEW = "community-preview",
}
