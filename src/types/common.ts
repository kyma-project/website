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
  WEBSITE_PREVIEW = "website-preview",
  DOCS_PREVIEW = "docs-preview",
  COMMUNITY_PREVIEW = "community-preview",
}
