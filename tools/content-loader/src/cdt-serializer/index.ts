import to from "await-to-js";
import { VError } from "verror";

import {
  getFilesPaths,
  readYaml,
  writeToYaml,
  writeToJson,
  copyResources,
} from "../helpers";
import {
  ClusterDocsTopic,
  DocsConfigs,
  Manifest,
  DocsConfigSpec,
  DocsConfig,
  CLUSTER_DOCS_TOPIC,
  GROUP_NAME_LABEL,
  GROUP_ORDER_LABEL,
  ORDER_LABEL,
} from "./types";

interface Options {
  copyRegex?: string;
  docsVersion?: string;
}

export class ClusterDocsTopicSerializer {
  private clusterDocsTopics: ClusterDocsTopic[] = [];
  private docsVersion: string = "";

  do = async (source: string, output: string, options?: Options) => {
    this.clearClusterDocsTopic();

    const { copyRegex, docsVersion } = options;
    if (docsVersion) {
      this.docsVersion = docsVersion;
    }

    let err: Error | null;
    [err] = await to(this.loadAllClusterDocsTopics(source));
    if (err) {
      throw err;
    }
    if (!this.clusterDocsTopics.length) return;

    const manifest = this.prepareManifest();
    const configs = this.prepareDocsConfigs();

    [err] = await to(
      this.copyContentPerTopic(source, output, configs, copyRegex),
    );
    if (err) {
      throw err;
    }

    [err] = await to(this.writeManifest(output, manifest));
    if (err) {
      throw err;
    }
  };

  private copyContentPerTopic = async (
    source: string,
    output: string,
    configs: DocsConfigs,
    copyRegex?: string,
  ) => {
    for (const topic of Object.keys(configs)) {
      let err: Error | null;
      const dir = configs[topic].dir;

      [err] = await to(
        this.copyContent(
          `${source}/${dir}`,
          `${output}/${topic}/docs`,
          copyRegex,
        ),
      );
      if (err) {
        throw new VError(err, `while copying content for ${output}/${topic}`);
      }

      delete configs[topic].dir;
      [err] = await to(
        writeToJson(`${output}/${topic}/docs.config.json`, configs[topic]),
      );
      if (err) {
        throw new VError(err, `while copying config for ${output}/${topic}`);
      }
    }
  };

  private copyContent = async (
    source: string,
    output: string,
    copyRegex?: string,
  ) => {
    const allowedFilesRegex = copyRegex
      ? `${source}/${copyRegex}`
      : /(md|png|jpg|gif|jpeg|svg|yaml|yml|json)$/;
    const [err] = await to(
      copyResources(source, output, new RegExp(allowedFilesRegex)),
    );
    if (err) {
      throw err;
    }
  };

  private prepareManifest = (): Manifest => {
    const groupNames = this.extractGroupNames();
    const manifest: Manifest = {
      spec: {},
    };

    groupNames.map(group => {
      const sortedCdts: ClusterDocsTopic[] = this.filterAndSortClusterDocsTopics(
        group,
      );

      manifest.spec[group] = sortedCdts.map(cdt => ({
        displayName: cdt.spec.displayName,
        id: cdt.metadata.name,
      }));
    });
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

    const markdownTypes = ["markdown", "md"];
    const markdownSource = cdt.spec.sources.find(s =>
      markdownTypes.includes(s.type),
    );
    let dir: string =
      markdownSource && markdownSource.filter.replace(/^\/?|\/?$/, "");

    // fix bug with service-catalog cdt in 1.2, 1.3 and 1.4 version
    if (
      spec.id === "service-catalog" &&
      ["1.2", "1.3", "1.4"].includes(this.docsVersion)
    ) {
      dir = "docs/service-catalog/";
    }

    const docsConfig: DocsConfig = {
      spec,
      dir,
    };
    return docsConfig;
  };

  private filterAndSortClusterDocsTopics = (
    groupName: string,
  ): ClusterDocsTopic[] =>
    this.clusterDocsTopics
      .filter(cdt => cdt.metadata.labels[GROUP_NAME_LABEL] === groupName)
      .sort((a, b) =>
        Number(a.metadata.labels[ORDER_LABEL]) >
        Number(b.metadata.labels[ORDER_LABEL])
          ? 1
          : -1,
      );

  private extractGroupNames = (): string[] => {
    const groupNames: Set<string> = new Set<string>();
    const order: { [group: string]: number } = {};

    this.clusterDocsTopics.map(cdt => {
      const groupName = cdt.metadata.labels[GROUP_NAME_LABEL];
      groupNames.add(groupName);
      if (!order[groupName]) {
        order[groupName] = Number(cdt.metadata.labels[GROUP_ORDER_LABEL]);
      }
    });

    return Array.from(groupNames).sort((first, sec) => {
      const orderFirst = order[first];
      const orderSec = order[sec];

      if (orderFirst < orderSec) {
        return -1;
      }
      if (orderFirst > orderSec) {
        return 1;
      }
      return 0;
    });
  };

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

      if (cdt.kind && cdt.kind === CLUSTER_DOCS_TOPIC) {
        this.clusterDocsTopics.push(cdt);
      }
    }
  };

  private clearClusterDocsTopic = (): void => {
    this.clusterDocsTopics = [];
  };
}

export default new ClusterDocsTopicSerializer();
