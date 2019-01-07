export class DocsProcessor {
  constructor(docs = []) {
    this.docs = [...docs];
  }

  replaceImagePaths = ({ type, id, version, versions }) => {
    const isVersionLatest = version === "latest";
    const currentVersion = isVersionLatest ? versions.releases[0] : version;

    this.docs = this.docs.map(doc => {
      if (doc.source.search(/.?\/?assets/g) !== -1) {
        doc.source = doc.source.replace(
          /src="\.?\/?assets/g,
          `src="/documentation/${currentVersion}/${type}/${id}/assets`,
        );
      }

      return doc;
    });

    return this;
  };

  sortByOrder = () => {
    this.docs = this.docs.sort(this.sortFnByProperty("order"));
    return this;
  };

  sortByType = () => {
    let docsTypes = [];
    this.docs.map(doc => {
      if (!docsTypes.includes(doc.type || doc.title))
        docsTypes.push(doc.type || doc.title);
      return doc;
    });

    let sortedDocs = [];
    for (const type of docsTypes) {
      for (const doc of this.docs) {
        if (type === doc.type || (!doc.type && type === doc.title)) {
          sortedDocs.push(doc);
          continue;
        }
      }
    }
    this.docs = sortedDocs;

    return this;
  };

  sortFnByProperty = sortBy => {
    return (a, b) => {
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

  filterExternal = () => {
    this.docs = this.docs.filter(item => !item.internal);
    return this;
  };

  result() {
    return this.docs;
  }
}
