import { resolve } from "path";
import { PostGQL } from "./types";
import { CreatePageFn, CreateRedirectFn } from "../../../types";
import { BLOG_PATH_PREFIX, POSTS_PER_PAGE } from "../../../constants";

export interface CreateBlogPostsListArgs {
  createPage: CreatePageFn;
  createRedirect: CreateRedirectFn;
  posts: PostGQL[];
}

export const createSingleBlogPost = ({
  createPage,
  createRedirect,
  posts,
}: CreateBlogPostsListArgs) => {
  const blogPostsListTemplate: string = resolve(
    __dirname,
    "../../../../src/templates/BlogPostsList.tsx",
  );

  const numPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: !i ? `/${BLOG_PATH_PREFIX}` : `/${BLOG_PATH_PREFIX}/page/${i + 1}`,
      component: blogPostsListTemplate,
      context: {
        limit: POSTS_PER_PAGE,
        skip: i * POSTS_PER_PAGE,
      },
    });
  });
};
