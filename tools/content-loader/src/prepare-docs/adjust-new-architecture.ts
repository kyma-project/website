import to from "await-to-js";
import { VError } from "verror";

import {
  getFilesPaths,
  readYaml,
  writeToYaml,
  writeToJson,
  removeDir,
  copyResources,
} from "../helpers";

const CLUSTER_DOCS_TOPIC: string = "ClusterDocsTopic";
const KYMA_DOCS: string = "kyma-docs";

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
    };
    name: string;
  };
  spec: {
    displayName: string;
    description: string;
  };
}

interface ManifestItem {
  displayName: string;
  id: string;
}

interface Manifest {
  metadata: {
    name: string;
  };
  spec: {
    root: ManifestItem[];
    components: ManifestItem[];
  };
}

interface DocsConfigs {
  [topics: string]: DocsConfig;
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

  do = async (source: string, docsDir: string, output: string) => {
    this.clearClusterDocsTopic();

    let err: Error | null;
    [err] = await to(this.loadAllClusterDocsTopics(source));
    if (err) {
      throw err;
    }
    if (!this.clusterDocsTopics.length) return;

    const manifest = this.prepareManifest();
    const configs = this.prepareDocsConfigs();

    [err] = await to(this.copyDocsPerTopic(docsDir, output, configs));
    if (err) {
      throw err;
    }

    [err] = await to(this.writeManifest(output, manifest));
    if (err) {
      throw err;
    }
  };

  private copyDocsPerTopic = async (
    docsDir: string,
    output: string,
    configs: DocsConfigs,
  ) => {
    for (const topic of Object.keys(configs)) {
      let err: Error | null;

      [err] = await to(
        this.copyDocs(`${docsDir}/${topic}`, `${output}/${topic}/docs`),
      );
      if (err) {
        throw new VError(err, `while copying docs for ${topic}`);
      }

      [err] = await to(
        writeToJson(`${output}/${topic}/docs.config.json`, configs[topic]),
      );
      if (err) {
        throw new VError(err, `while copying config for ${topic}`);
      }
    }
  };

  private copyDocs = async (source: string, output: string) => {
    const allowedFilesRegex = /(md|png|jpg|gif|jpeg|svg|yaml|yml|json)$/;
    const [err] = await to(copyResources(source, output, allowedFilesRegex));
    if (err) {
      throw err;
    }
  };

  private prepareManifest = (): Manifest => {
    const sortedCdtsForRoot: ClusterDocsTopic[] = this.extractClusterDocsTopics(
      GroupNames.ROOT,
    );
    const sortedCdtsForComponents: ClusterDocsTopic[] = this.extractClusterDocsTopics(
      GroupNames.COMPONENTS,
    );

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
        })),
      },
    };
    return manifest;
  };

  private writeManifest = async (output: string, manifest: Manifest) => {
    const [err] = await to(writeToYaml(`${output}/manifest.yaml`, manifest));
    if (err) {
      throw new VError(err, "while writing manifest");
    }
  };

  private prepareDocsConfigs = (): DocsConfigs => {
    const configs: DocsConfigs = {};
    for (const cdt of this.clusterDocsTopics) {
      configs[cdt.metadata.name] = this.prepareDocsConfig(cdt);
    }
    return configs;
  };

  private prepareDocsConfig = (cdt: ClusterDocsTopic): DocsConfig => {
    const groupName: string = cdt.metadata.labels[GROUP_NAME_LABEL];
    const spec: DocsConfigSpec = {
      id: cdt.metadata.name,
      displayName: cdt.spec.displayName,
      description: cdt.spec.description,
      type: `${groupName.charAt(0).toUpperCase()}${groupName.slice(1)}`,
    };

    const docsConfig: DocsConfig = {
      spec,
    };
    return docsConfig;
  };

  private extractClusterDocsTopics = (groupName: string): ClusterDocsTopic[] =>
    this.clusterDocsTopics
      .filter(cdt => cdt.metadata.labels[GROUP_NAME_LABEL] === groupName)
      .sort((a, b) =>
        Number(a.metadata.labels[ORDER_LABEL]) >
        Number(b.metadata.labels[ORDER_LABEL])
          ? 1
          : -1,
      );

  private loadAllClusterDocsTopics = async (source: string) => {
    let err: Error | null;
    let files;

    [err, files] = await to(getFilesPaths(source));
    if (err) {
      throw new VError(err, `while getting files paths for clusterDocsTopics`);
    }

    const cdtRegex = /(cdt\.(yaml|yml))$/;
    files = files.filter(file => Boolean(cdtRegex.exec(file)));

    for (const file of files) {
      let cdt: ClusterDocsTopic;
      [err, cdt] = await to<ClusterDocsTopic>(readYaml(file));
      if (err) {
        throw new VError(err, `while reading yaml ${file}`);
      }

      if (cdt.kind === CLUSTER_DOCS_TOPIC) {
        this.clusterDocsTopics.push(cdt);
      }
    }
  };

  private clearClusterDocsTopic = (): void => {
    this.clusterDocsTopics = [];
  };
}

export default new AdjustNewArchitecture();
