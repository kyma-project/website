import { createSingleBlogPost } from "./singlePostPage";
import { createRootPage } from "./rootPage";

import { getPosts } from "./helpers";
import {
  CreatePageFn,
  CreateRedirectFn,
  GraphQLFunction,
} from "../../../types";

export interface CreateBlogPages {
  graphql: GraphQLFunction;
  createPage: CreatePageFn;
  createRedirect: CreateRedirectFn;
  options?: {
    numberOfLatestPosts?: number;
  };
}

export const createBlogPages = async ({
  graphql,
  createPage,
  createRedirect,
  options,
}: CreateBlogPages) => {
  const posts = await getPosts(graphql, options && options.numberOfLatestPosts);

  createRootPage({ createPage, createRedirect, posts });
  createSingleBlogPost({ createPage, createRedirect, posts });
};
