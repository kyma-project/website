export interface PostQL {
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
