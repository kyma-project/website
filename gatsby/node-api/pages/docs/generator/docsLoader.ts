import { resolve } from "path";
import { readFileSync } from "fs-extra";
import { DocsConfig } from "../types";

const DOCS_FOLDER = "docs";
const VERSION_MANIFEST_YAML = "manifest.yaml";
const TOPIC_CONFIG_JSON = "docs.config.json";

export class DocsLoader {
  private version: string = "";

  constructor(version: string) {
    this.version = version;
  }

  loadManifest() {
    return readFileSync(this.createPath(VERSION_MANIFEST_YAML), "utf8");
  }

  loadTopicConfig(topic: string): DocsConfig {
    return this.load(`${topic}/${TOPIC_CONFIG_JSON}`);
  }

  private load(path: string): any | JSON {
    return require(this.createPath(path));
  }

  private createPath(path: string): string {
    return resolve(
      __dirname,
      `../../../../../content/${DOCS_FOLDER}/${this.version}/${path}`,
    );
  }
}
