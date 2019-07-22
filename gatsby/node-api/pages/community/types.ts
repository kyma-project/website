export interface CommunityFileQL {
  rawMarkdownBody: string;
  fields: {
    docInfo: {
      id: string;
      type: string;
      version: string;
      fileName: string;
    };
    slug: string;
  };
  frontmatter: {
    title: string;
    type: string;
  };
}
