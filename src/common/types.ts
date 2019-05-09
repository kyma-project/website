/* AllMarkdownRemark */
export interface AllMarkdownRemark<T> {
  data: {
    allMarkdownRemark: {
      edges: Array<AllMarkdownRemarkNode<T>>;
    };
  };
}

export interface AllMarkdownRemarkNode<T> {
  node: T;
}

/* MarkdownRemark */
export interface MarkdownRemark<T> {
  data: {
    markdownRemark: T;
  };
}

/* AllFile */
export interface AllFile<T> {
  data: {
    allFile: {
      edges: Array<AllFileNode<T>>;
    };
  };
}

export interface AllFileNode<T> {
  node: T;
}

/* AllFile Images */
export type AllFileImages = Array<AllFileNode<AllFileImage>>;

export interface AllFileImage {
  dir: string;
  name: string;
  extension: string;
  childImageSharp: any;
}

/* PageContext */
export interface PageContext<T> {
  pageContext: T;
}

export interface IntlPageContext {
  locale: string;
}

/* Location */
export interface Location {
  location: any;
}
