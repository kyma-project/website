export interface PostGQL {
  excerpt: string;
  rawMarkdownBody: string;
  fields: {
    slug: string;
    assetsPath: string;
    postInfo: {
      fileName: string;
    };
  };
  frontmatter: {
    title: string;
    redirectFrom: string[];
  };
}
