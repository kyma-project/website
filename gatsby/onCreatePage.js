const { createIntlPage } = require("./helpers");

module.exports = async ({ page, actions }) => {
  const createPage = createIntlPage({ actions });
  const { deletePage } = actions;

  return new Promise(resolve => {
    deletePage(page);
    createPage(page);
    resolve();
  });
};
