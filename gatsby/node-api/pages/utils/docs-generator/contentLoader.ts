import { resolve } from "path";
import { readFileSync } from "fs-extra";
import { DocsConfig } from "./types";

const MANIFEST_YAML = "manifest.yaml";
const TOPIC_CONFIG_JSON = "docs.config.json";

export class ContentLoader {
  private version: string = "";
  private folder: string = "";

  setVersion(version: string) {
    this.version = version;
  }

  setFolder(folder: string) {
    this.folder = folder;
  }

  loadManifest() {
    return readFileSync(this.createPath(MANIFEST_YAML), "utf8");
  }

  loadTopicConfig(topic: string): DocsConfig {
    return this.load(`${topic}/${TOPIC_CONFIG_JSON}`);
  }

  private load(path: string): any | JSON {
    return require(this.createPath(path));
  }

  private createPath(path: string): string {
    const withVersion: string = this.version ? `${this.version}/` : "";

    return resolve(
      __dirname,
      `../../../../../content/${this.folder}/${withVersion}${path}`,
    );
  }
}
