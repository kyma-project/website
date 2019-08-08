import { DocsPageContext } from "@components/generic-documentation/types";

function getPageTitle(): string {
  return `Roadmap`;
}

export function extractRoadmapMetadata(): {
  pageTitle: string;
} {
  return {
    pageTitle: getPageTitle(),
  };
}
