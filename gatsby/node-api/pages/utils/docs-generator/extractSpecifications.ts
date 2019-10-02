import { ContentLoader } from "./contentLoader";
import { Specification } from "@typings/docs";

export const extractSpecifications = (
  contentLoader: ContentLoader,
  topic: string,
  specifications?: Specification[],
): Specification[] => {
  if (!specifications) {
    return [];
  }

  return specifications.map(specification => {
    const spec = contentLoader.loadSpecification(
      topic,
      specification.assetPath,
    );

    return {
      ...specification,
      info: spec.info || {},
      spec,
    };
  });
};
