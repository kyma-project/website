import {
  CapabilityQL,
  RoadmapNavigationNode,
  CapabilityDisplayNameReferencesToId,
} from "./types";

export const getCapabilities = async (
  graphql: Function,
): Promise<CapabilityQL[]> => {
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [fields___slug] }
        filter: { fileAbsolutePath: { regex: "/roadmap/capabilities/" } }
      ) {
        edges {
          node {
            frontmatter {
              displayName
              epicsLabels
              id
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    throw new Error(result.errors);
  }

  return sortCapabilities(result.data.allMarkdownRemark.edges.map(
    (e: any) => e.node,
  ) as CapabilityQL[]);
};

const sortCapabilities = (capabilities: CapabilityQL[]): CapabilityQL[] => {
  return capabilities.sort((a, b) => {
    const orderA = a.frontmatter.displayName.toLowerCase();
    const orderB = b.frontmatter.displayName.toLowerCase();

    if (orderA > orderB) {
      return 1;
    }
    if (orderA < orderB) {
      return -1;
    }
    return 0;
  });
};

export const generateCapabilitiesNavigation = (
  capabilities: CapabilityQL[],
): RoadmapNavigationNode[] => {
  const navigation: RoadmapNavigationNode[] = [];

  capabilities.map(capability => {
    navigation.push({
      displayName: capability.frontmatter.displayName,
      id: capability.frontmatter.id,
    });
  });

  return navigation;
};

export const generateMapOfDisplayNameToId = (
  capabilities: CapabilityQL[],
): CapabilityDisplayNameReferencesToId => {
  const map: CapabilityDisplayNameReferencesToId = {};

  capabilities.map(capability => {
    map[capability.frontmatter.displayName] = capability.frontmatter.id;
  });

  return map;
};
