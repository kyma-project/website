import { CreateBlogPages } from "./types";
import { getPosts } from "./helpers";

import { createSingleBlogPost } from "./singlePostPage";

export const createBlogPages = async ({
  graphql,
  createPage,
  createRedirect,
}: CreateBlogPages) => {
  const posts = await getPosts(graphql);

  createSingleBlogPost({ createPage, createRedirect, posts });
};
