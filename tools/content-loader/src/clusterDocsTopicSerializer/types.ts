export const CLUSTER_DOCS_TOPIC: string = "ClusterDocsTopic";

export const GROUP_NAME_LABEL: string = "cms.kyma-project.io/group-name";
export const ORDER_LABEL: string = "cms.kyma-project.io/order";

export interface ClusterDocsTopic {
  kind: string;
  metadata: {
    labels: {
      [key: string]: string;
    };
    name: string;
  };
  spec: {
    displayName: string;
    description: string;
    sources: Array<{
      type: string;
      name: string;
      mode: string;
      url: string;
      filter: string;
    }>;
  };
}

export interface ManifestItem {
  displayName: string;
  id: string;
}

export interface Manifest {
  spec: {
    [group: string]: ManifestItem[];
  };
}

export interface DocsConfigs {
  [topics: string]: DocsConfig;
}

export interface DocsConfig {
  spec: DocsConfigSpec;
  dir?: string;
}

export interface DocsConfigSpec {
  id: string;
  displayName: string;
  description: string;
  type: string;
}
