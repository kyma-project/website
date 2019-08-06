import { Plugin, PluginType } from "@kyma-project/documentation-component";
import { replaceImagePaths } from "./mutationPlugin";

const replaceImagePathsMutationPlugin: Plugin = {
  name: "replace-image-paths-mutation",
  type: PluginType.MUTATION,
  sourceTypes: ["markdown", "md"],
  fn: replaceImagePaths,
};

export { replaceImagePathsMutationPlugin };
