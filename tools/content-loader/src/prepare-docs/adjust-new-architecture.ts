import to from "await-to-js";
import { VError } from "verror";

import { getFilesPaths, readYaml } from "../helpers";

const CLUSTER_DOCS_TOPIC: string = "ClusterDocsTopic";
const KYMA_DOCS: string = "kyma-docs";

const VIEW_CONTEXT_LABEL: string = "cms.kyma-project.io/view-context";
const GROUP_NAME_LABEL: string = "cms.kyma-project.io/group-name";
const ORDER_LABEL: string = "cms.kyma-project.io/order";

enum GroupNames {
  ROOT = "root",
  COMPONENTS = "components",
}

interface ClusterDocsTopic {
  kind: string;
  metadata: {
    labels: {
      [key: string]: string;
    },
    name: string;
  },
  spec: {
    displayName: string;
    description: string;
  }
}

interface ManifestItem {
  displayName: string;
  id: string;
}

interface Manifest {
  metadata: {
    name: string;
  },
  spec: {
    root: ManifestItem[];
    components: ManifestItem[];
  }
}

interface DocsConfig {
  spec: DocsConfigSpec;
}

interface DocsConfigSpec {
  id: string;
  displayName: string;
  description: string;
  type: string;
}

export class AdjustNewArchitecture {
  private clusterDocsTopics: ClusterDocsTopic[] = [];

  do = async (docsPath: string) => {

  }

  private prepareManifest = (): Manifest => {
    const sortedCdtsForRoot: ClusterDocsTopic[] = this.extractClusterDocsTopics(GroupNames.ROOT);
    const sortedCdtsForComponents: ClusterDocsTopic[] = this.extractClusterDocsTopics(GroupNames.COMPONENTS);

    const manifest: Manifest = {
      metadata: {
        name: KYMA_DOCS,
      },
      spec: {
        root: sortedCdtsForRoot.map(cdt => ({
          displayName: cdt.spec.displayName,
          id: cdt.metadata.name,
        })),
        components: sortedCdtsForComponents.map(cdt => ({
          displayName: cdt.spec.displayName,
          id: cdt.metadata.name,
        }))
      }
    };

    return manifest;
  }

  private prepareDocsConfig = (groupName: string, id: string): DocsConfig => {
    const cdt: ClusterDocsTopic = this.clusterDocsTopics.find(cdt => cdt.metadata.labels[GROUP_NAME_LABEL] === groupName && cdt.metadata.name === id);
    const spec: DocsConfigSpec = {
      id,
      displayName: cdt.spec.displayName,
      description: cdt.spec.description,
      type: `${groupName.charAt(0).toUpperCase()}${groupName.slice(1)}`,
    }

    const docsConfig: DocsConfig = {
      spec,
    }
    return docsConfig;
  }

  private extractClusterDocsTopics = (groupName: string): ClusterDocsTopic[] => {
    return this.clusterDocsTopics
      .filter(cdt => cdt.metadata.labels[GROUP_NAME_LABEL] === groupName)
      .sort((a, b) => (a.metadata.labels[ORDER_LABEL] > b.metadata.labels[ORDER_LABEL]) ? 1 : -1)
  }

  private loadAllClusterDocsTopics = async (source: string) => {
    let err: Error | null;
    let files;

    [err, files] = await to(getFilesPaths(source));
    if (err) {
      throw new VError(err, `while getting files paths for clusterDocsTopics`);
    }

    const cdtRegex = /cdt\.(yaml|yml)$/;
    files = files.filter(file => Boolean(cdtRegex.exec(file)));

    this.loadClusterDocsTopic(files);
  }

  private loadClusterDocsTopic = (files: string[]) => {
    for (const file of files) {
      const cdt = readYaml(file) as ClusterDocsTopic;

      if (cdt.kind === CLUSTER_DOCS_TOPIC) {
        this.clusterDocsTopics.push(cdt);
      }
    }
  }
}

export default new AdjustNewArchitecture();