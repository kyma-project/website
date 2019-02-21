const { resolve } = require("path");

module.exports = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@components": resolve(__dirname, "../src/components"),
        "@common": resolve(__dirname, "../src/common"),
        "@static": resolve(__dirname, "../static"),
        "@styled": resolve(__dirname, "../src/common/styled"),
      },
    },
  });
};
