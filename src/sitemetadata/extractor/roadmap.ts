import { DocsPageContext } from "@components/docs/types";

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
