import { createSingleBlogPost } from "./singlePostPage";
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
}

export const createBlogPages = async ({
  graphql,
  createPage,
  createRedirect,
}: CreateBlogPages) => {
  const posts = await getPosts(graphql);

  createSingleBlogPost({ createPage, createRedirect, posts });
};
