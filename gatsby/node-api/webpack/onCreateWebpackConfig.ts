import { CreateWebpackConfigArgs } from "gatsby";
import { resolve } from "path";

export const onCreateWebpackConfig = ({ actions }: CreateWebpackConfigArgs) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@components": resolve(__dirname, "../../../src/components"),
        "@common": resolve(__dirname, "../../../src/common"),
        "@config": resolve(__dirname, "../../../config.json"),
        "@content": resolve(__dirname, "../../../content"),
        "@static": resolve(__dirname, "../../../static"),
        "@styled": resolve(__dirname, "../../../src/common/styled"),
        "@root": resolve(__dirname, "../../../src/root"),
        "@typings": resolve(__dirname, "../../../src/types"),
        "@views": resolve(__dirname, "../../../src/views"),
      },
    },
  });
};
