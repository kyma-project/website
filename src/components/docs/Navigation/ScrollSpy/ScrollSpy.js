import React from "react";
import PropTypes from "prop-types";

class ScrollSpy extends React.Component {
  static get propTypes() {
    return {
      rootElement: PropTypes.string.isRequired,
      nodeTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
      componentTag: PropTypes.string,
      offset: PropTypes.object,
      endOffset: PropTypes.number,
      onUpdate: PropTypes.func,
    };
  }

  static get defaultProps() {
    return {
      rootElement: "scrollspy",
      nodeTypes: [],
      componentTag: "ul",
      offset: 0,
      endOffset: 0,
      onUpdate() {},
    };
  }

  state = {
    nodes: {},
    groupOfDocumentsNodes: [],
    documentNodes: [],
    headerNodes: [],
    activeNodes: (() => {
      let activeNodes = {};
      for (const type of this.props.nodeTypes) {
        activeNodes[type] = "";
      }
      return activeNodes;
    })(),
    activeGroupOfDocumentsNode: null,
    activeDocumentNode: null,
    activeHeaderNode: null,
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

  componentDidUpdate(prevProps, prevState) {
    const {
      props: { nodeTypes, onUpdate },
      state: { activeNodes },
    } = this;

    if (typeof onUpdate === "function") {
      for (const type of nodeTypes) {
        if (activeNodes[type] !== prevState.activeNodes[type]) {
          onUpdate(activeNodes);
          break;
        }
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
    const { rootElement, nodeTypes } = this.props;

    let nodes = {};
    for (const type of nodeTypes) {
      nodes[type] = [];
    }

    const rootNode = document.querySelector(rootElement);
    const nodesInRootNode = rootNode.querySelectorAll("*[id]");
    const dataScrollSpyNodeTypeAtr = "scrollspyNodeType";

    for (let node of nodesInRootNode) {
      const nodeType = node.dataset[dataScrollSpyNodeTypeAtr];

      if (nodeType) {
        const nodeWithInfo = {
          id: node.id,
          offsetTop: node.offsetTop,
          offsetHeight: node.offsetHeight,
        };

        for (const type of nodeTypes) {
          if (nodeType === type) {
            nodes[type].push(nodeWithInfo);
          }
        }
      }
    }
    this.setState({ nodes });
  };

  updateActiveNode = (nodes, scrollTop) => {
    const [firstNode] = nodes;

    let activeNode;
    if (firstNode && scrollTop <= firstNode.offsetTop) {
      activeNode = firstNode;
    } else {
      activeNode = nodes
        .filter(node => node.offsetTop - scrollTop <= 0)
        .sort((a, b) => b.offsetTop - a.offsetTop)[0];
    }
    return activeNode;
  };

  handleScroll = event => {
    const {
      props: { nodeTypes, offset },
      state: { nodes, activeNodes },
    } = this;

    const doc = document;

    if (!nodes || !Object.keys(nodes).length) return;

    let newActiveNodes = {};
    for (const type of nodeTypes) {
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

  goToActiveNodes = () => {
    // const { props: { offset }, state: { activeNodes } } = this;
    // const nodes = Object.keys(activeNodes)
    // const length = nodes.length - 2;
    // for (let i = length; i > -1; i--) {
    //     if (activeNodes[nodes[i]]) {
    //         console.log(activeNodes[nodes[i]])
    //         window.scrollTo(0, activeNodes[nodes[i]].offsetTop - 16);
    //         break;
    //     }
    // }
  };

  render() {
    return this.props.children;
  }
}

export default ScrollSpy;
