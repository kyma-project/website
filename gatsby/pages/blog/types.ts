import { CreatePageFn, CreateRedirectFn } from "../../types";

export interface CreateBlogPages {
  graphql: Function;
  createPage: CreatePageFn;
  createRedirect: CreateRedirectFn;
}

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
