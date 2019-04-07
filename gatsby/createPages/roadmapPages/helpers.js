
const getCapabilities = async graphql => {
  const result = await graphql(`
  {
    allMarkdownRemark(
      sort: { order: DESC, fields: [fields___slug] }
      filter: { fileAbsolutePath: { regex: "/roadmap\/capabilities/" } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            order
            displayName
            epicsLabels
          }
        }
      }
    }
  }
  `);
  if (result.errors) {
    throw new Error(result.errors);
  }

  return sortCapabilities(result.data.allMarkdownRemark.edges);
};

const sortCapabilities = capabilities => {
  return capabilities.sort((a, b) => {
    const orderA = a.node.frontmatter.order;
    const orderB = b.node.frontmatter.order;

    return orderA - orderB;
  });
}

module.exports = {
  getCapabilities,
};
