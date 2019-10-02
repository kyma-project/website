import { resolve } from "path";
import { readFileSync } from "fs-extra";
import { safeLoad } from "js-yaml";
import { DocsConfig } from "@typings/docs";
import { DOCS_SPECIFICATIONS_PATH } from "../../../../constants";

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

  loadSpecification(topic: string, specification: string): any {
    const path = `${topic}/${DOCS_SPECIFICATIONS_PATH}/${specification}`;

    let spec: any;
    // for YAML
    try {
      const data = readFileSync(this.createPath(path)).toString();
      spec = safeLoad(data);
    } catch (e) {} // tslint:disable-line

    // for JSON
    try {
      spec = this.load(path);
    } catch (e) {} // tslint:disable-line

    try {
      return JSON.parse(JSON.stringify(spec));
    } catch (e) {
      return;
    }
  }

  private load(path: string): any {
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
