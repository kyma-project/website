import React from "react";

import {
  ScrollSpyNode,
  ScrollSpyNodeType,
  ScrollSpyNodes,
  ScrollSpyActiveNodes,
  ScrollSpyOffset,
} from "@components/docs/navigation/types";

interface ScrollSpyProps {
  rootElement: string;
  offset: ScrollSpyOffset;
  endOffset?: string;
  onUpdate: (arg: any) => any;
}

interface ScrollSpyState {
  nodes: ScrollSpyNodes;
  groupOfDocumentsNodes: any[];
  documentNodes: any[];
  headerNodes: any[];
  activeNodes: ScrollSpyActiveNodes;
  activeGroupOfDocumentsNode: any;
  activeDocumentNode: any;
  activeHeaderNode: any;
}

class ScrollSpy extends React.Component<ScrollSpyProps, ScrollSpyState> {
  nodeTypes: string[] = ["groupOfDocuments", "document", "header"];

  static get defaultProps() {
    return {
      rootElement: "scrollspy",
      nodeTypes: [],
      componentTag: "ul",
      offset: 0,
      endOffset: 0,
      onUpdate() {
        return undefined;
      },
    };
  }

  state: any = {
    nodes: {},
    groupOfDocumentsNodes: [],
    documentNodes: [],
    headerNodes: [],
    activeNodes: (() => {
      const activeNodes: ScrollSpyNode & { groupOfDocuments: any } = {
        groupOfDocuments: null,
        document: null,
        header: null,
      };

      return activeNodes;
    })(),
    activeGroupOfDocumentsNode: "",
    activeDocumentNode: "",
    activeHeaderNode: "",
  };

  componentDidMount() {
    this.onResize();
    setTimeout(
      () => {
        this.onResize();
      },
      process.env.NODE_ENV ? 1500 : 750,
    );

    window.addEventListener("resize", this.onResize);
    window.addEventListener("orientationchange", this.onResize);
    window.addEventListener("scroll", this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("orientationchange", this.onResize);
    window.removeEventListener("scroll", this.onScroll);
  }

  componentDidUpdate(prevProps: ScrollSpyProps, prevState: ScrollSpyState) {
    const {
      props: { onUpdate },
      state: { activeNodes },
    } = this;

    for (const type of this.nodeTypes) {
      if (activeNodes[type] !== prevState.activeNodes[type]) {
        onUpdate(activeNodes);
        break;
      }
    }
  }

  onResize = () => {
    this.collectNodes();
    this.handleScroll();
  };

  onScroll = () => {
    this.handleScroll();
  };

  collectNodes = () => {
    const { rootElement } = this.props;

    const nodes: ScrollSpyNodes = {};
    for (const type of this.nodeTypes) {
      nodes[type] = [];
    }

    const rootNode = document.querySelector(rootElement);
    if (!rootNode) {
      return;
    }

    const nodesInRootNode = rootNode.querySelectorAll("*[id]");
    const dataScrollSpyNodeTypeAtr = "scrollspyNodeType";
    // tslint:disable-next-line
    for (let i = 0; i < nodesInRootNode.length; i++) {
      const node = nodesInRootNode[i] as any;
      const nodeType = node.dataset[dataScrollSpyNodeTypeAtr];

      if (!nodeType) {
        continue;
      }

      const nodeWithInfo = {
        id: node.id,
        offsetTop: node.offsetTop,
        offsetHeight: node.offsetHeight,
      };

      for (const type of this.nodeTypes) {
        if (nodeType === type) {
          nodes[type].push(nodeWithInfo);
        }
      }
    }
    this.setState({ nodes });
  };

  updateActiveNode = (nodes: ScrollSpyNode[], scrollTop: number) => {
    const [firstNode] = nodes;

    if (firstNode && scrollTop <= firstNode.offsetTop) {
      return firstNode;
    }
    return nodes
      .filter(node => node.offsetTop - scrollTop <= 0)
      .sort((a, b) => b.offsetTop - a.offsetTop)[0];
  };

  handleScroll = (event?: any) => {
    const {
      props: { offset },
      state: { nodes, activeNodes },
    } = this;

    const doc = document;

    if (!nodes || !Object.keys(nodes).length) {
      return;
    }

    const newActiveNodes: ScrollSpyActiveNodes = {};
    for (const type of this.nodeTypes) {
      const scrollTop =
        (doc.documentElement.scrollTop ||
          doc.body.parentNode.scrollTop ||
          doc.body.scrollTop) + (offset[type] ? offset[type] : 0);
      const newActiveNode = this.updateActiveNode(nodes[type], scrollTop);

      if (newActiveNode !== activeNodes[type]) {
        newActiveNodes[type] = newActiveNode;
      }
    }

    if (Object.keys(newActiveNodes).length) {
      this.setState({
        activeNodes: {
          ...activeNodes,
          ...newActiveNodes,
        },
      });
    }
  };

  render() {
    return null;
  }
}

export default ScrollSpy;
