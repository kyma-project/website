import {
  SourceWithOptions,
  Sources,
} from "@kyma-project/documentation-component";
import { DocsContentItem } from "@typings/docs";

export class DocsSerializer {
  private docsContent: DocsContentItem = {} as DocsContentItem;
  private sources: SourceWithOptions[] = [];

  setDocsContent(docsContent: DocsContentItem): DocsSerializer {
    this.docsContent = docsContent;
    this.clear();
    return this;
  }

  serialize(assetsPath: string): DocsSerializer {
    this.serializeMarkdownFiles(assetsPath);
    return this;
  }

  getSources(considerAsGroup: boolean = false): Sources {
    if (!considerAsGroup) {
      return this.sources;
    }
    return [
      {
        sources: this.sources,
      },
    ];
  }

  private serializeMarkdownFiles(assetsPath: string): void {
    this.docsContent.docs.map(doc => {
      this.sources.push({
        source: {
          type: "md",
          rawContent: doc.source,
          data: {
            frontmatter: {
              title: doc.title,
              type: doc.type,
            },
            assetsPath,
          },
        },
      });
    });
  }

  private clear(): void {
    this.sources = [];
  }
}

export const serializer = new DocsSerializer();
