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
