import {
  SourceWithOptions,
  Sources,
} from "@kyma-project/documentation-component";
import { DocsContentItem } from "@typings/docs";

export class DocsSerializer {
  private sources: SourceWithOptions[] = [];

  serializeDocs(
    docsContent: DocsContentItem,
    assetsPath: string,
  ): DocsSerializer {
    docsContent.docs.map(doc => {
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

    return this;
  }

  serializeBlogPost(postContent: string, assetsPath: string): DocsSerializer {
    this.sources.push({
      source: {
        type: "md",
        rawContent: postContent,
        data: {
          assetsPath,
        },
      },
    });

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

  clear(): void {
    this.sources = [];
  }
}

export const serializer = new DocsSerializer();
