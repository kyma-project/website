import { resolve } from "path";
import { PostGQL } from "./types";
import { CreatePageFn, CreateRedirectFn } from "../../../types";

export interface CreateSingleBlogPostArgs {
  createPage: CreatePageFn;
  createRedirect: CreateRedirectFn;
  posts: PostGQL[];
}

export const createSingleBlogPost = ({
  createPage,
  createRedirect,
  posts,
}: CreateSingleBlogPostArgs) => {
  const singleBlogPostTemplate: string = resolve(
    __dirname,
    "../../../../src/views/blog/single/index.tsx",
  );

  posts.map((post, index) => {
    const slug = post.fields.slug;
    const assetsPath = post.fields.assetsPath;

    const redirectFrom = post.frontmatter.redirectFrom;
    const postFileName = post.fields.postInfo.fileName;

    if (redirectFrom && Array.isArray(redirectFrom)) {
      redirectFrom.map(redirect => {
        const data = redirect.endsWith("/") ? redirect.slice(0, -1) : redirect;
        createRedirect({
          fromPath: data.startsWith("/") ? `${data}` : `/${data}`,
          redirectInBrowser: true,
          toPath: slug,
        });
        createRedirect({
          fromPath: data.startsWith("/") ? `${data}/` : `/${data}/`,
          redirectInBrowser: true,
          toPath: slug,
        });
      });
    }

    createRedirect({
      fromPath: `/${postFileName}`,
      redirectInBrowser: true,
      toPath: slug,
    });

    const previous = index === posts.length - 1 ? null : posts[index + 1];
    const next = index === 0 ? null : posts[index - 1];

    createPage({
      path: slug,
      component: singleBlogPostTemplate,
      context: {
        slug,
        post,
        assetsPath,
        previous,
        next,
      },
    });
  });
};
