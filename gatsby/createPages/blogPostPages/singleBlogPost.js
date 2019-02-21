const { resolve } = require("path");

module.exports = ({ createPage, createRedirect, posts }) => {
  const singleBlogPostTemplate = resolve(
    __dirname,
    "../../../src/templates/BlogPost.tsx",
  );

  posts.map((post, index) => {
    const slug = post.node.fields.slug;
    const assetsPath = post.node.fields.assetsPath;

    const redirectFrom = post.node.frontmatter.redirectFrom;
    const postFileName = post.node.fields.postInfo.postFileName;

    if (redirectFrom && Array.isArray(redirectFrom)) {
      redirectFrom.map(redirect => {
        createRedirect({
          fromPath: redirect.startsWith("/") ? redirect : `/${redirect}`,
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

    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: slug,
      component: singleBlogPostTemplate,
      context: {
        slug,
        assetsPath,
        previous,
        next,
      },
    });
  });
};
