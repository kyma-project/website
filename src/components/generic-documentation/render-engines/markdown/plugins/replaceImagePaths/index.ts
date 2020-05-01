import { Plugin, PluginType } from "@kyma-project/documentation-component";
import { LayoutType } from "@components/generic-documentation";
import { replaceImagePaths } from "./mutationPlugin";

const replaceImagePathsMutationPlugin = (layout: LayoutType): Plugin => ({
  name: "replace-image-paths-mutation",
  type: PluginType.MUTATION,
  sourceTypes: ["markdown", "md"],
  fn: replaceImagePaths(layout),
});

export { replaceImagePathsMutationPlugin };
