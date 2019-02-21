import { DocsContentDocs, DocsTypesLength } from "../types";

class DocsContentProcessor {
  docs: DocsContentDocs[] = [];
  docsTypesLength: DocsTypesLength = {};

  constructor(docs: DocsContentDocs[] = []) {
    this.docs = [...docs];
  }

  sortByOrder = () => {
    this.docs = this.docs.sort(this.sortFnByProperty("order"));
    return this;
  };

  sortByType = () => {
    let docsTypes: string[] = [];
    this.docs.map(doc => {
      if (!docsTypes.includes(doc.type || doc.title)) {
        docsTypes.push(doc.type || doc.title);
      }
      return doc;
    });

    let sortedDocs = [];
    for (const type of docsTypes) {
      for (const doc of this.docs) {
        if (type === doc.type || (!doc.type && type === doc.title)) {
          sortedDocs.push(doc);
        }
      }
    }
    this.docs = sortedDocs;

    return this;
  };

  sortFnByProperty = (sortBy: string) => {
    return (a: any, b: any) => {
      if (a[sortBy] && b[sortBy]) {
        const nameA = a[sortBy].toString().toLowerCase();
        const nameB = b[sortBy].toString().toLowerCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      }
      return 0;
    };
  };

  performDocsTypesLength = () => {
    let docsTypesLength: DocsTypesLength = {};

    this.docs.map(doc => {
      const type = doc.type || doc.title;
      if (!(type in docsTypesLength)) {
        docsTypesLength[type] = 0;
      }
      if (doc.title) docsTypesLength[type]++;

      return doc;
    });
    this.docsTypesLength = docsTypesLength;

    return this;
  };

  result() {
    return {
      newDocs: this.docs,
      docsTypesLength: this.docsTypesLength,
    };
  }
}

export default DocsContentProcessor;
