export class DocsProcessor {
  constructor(docs = []) {
    this.docs = [...docs];
  }

  replaceImagePaths = ({ type, id, version }) => {
    this.docs = this.docs.map(doc => {
      if (doc.source.search(/.?\/?assets/g) !== -1) {
        doc.source = doc.source.replace(
          /src="\.?\/?assets/g,
          `src="/documentation/${version}/${type}/${id}/assets`,
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
