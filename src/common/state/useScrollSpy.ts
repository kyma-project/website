import { useState, useEffect, useLayoutEffect } from "react";
import createContainer from "constate";

interface ScrollSpyNode {
  id: string;
  offsetHeight: number;
  offsetTop: number;
}

type ScrollSpyOffset = {
  [key: string]: number;
};

type ScrollSpyNodes = {
  [key: string]: ScrollSpyNode[];
};

type ScrollSpyActiveNodes = {
  [key: string]: ScrollSpyNode;
};

interface ScrollSpyProps {
  rootElement: string;
  nodeTypes: string[];
  offset: ScrollSpyOffset;
}

interface ScrollSpyState {
  nodes: ScrollSpyNodes;
  activeNodes: ScrollSpyActiveNodes;
}

const useScrollSpy = ({ rootElement, nodeTypes, offset }: ScrollSpyProps) => {
  const [nodes, setNodes] = useState({} as ScrollSpyNodes);
  const [activeNodes, setActiveNodes] = useState({} as ScrollSpyActiveNodes);

  const updateActiveNode = (nodes: ScrollSpyNode[], scrollTop: number) => {
    const [firstNode] = nodes;

    if (firstNode && scrollTop <= firstNode.offsetTop) return firstNode;
    return nodes
      .filter(node => node.offsetTop - scrollTop <= 0)
      .sort((a, b) => b.offsetTop - a.offsetTop)[0];
  };

  const handleResize = () => {
    let nodes: ScrollSpyNodes = {};
    for (const type of nodeTypes) {
      nodes[type] = [];
    }

    const rootNode = document.querySelector(rootElement);
    if (!rootNode) return;

    const nodesInRootNode = rootNode.querySelectorAll("*[id]");
    const dataScrollSpyNodeTypeAtr = "scrollspyNodeType";

    for (let i = 0; i < nodesInRootNode.length; i++) {
      const node = nodesInRootNode[i] as any;
      const nodeType = node.dataset[dataScrollSpyNodeTypeAtr];

      if (!nodeType) continue;

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

    setNodes(nodes);
  };

  const handleChangeHeight = (elm: any, callback: Function) => {
    var lastHeight = elm.clientHeight,
      newHeight;
    (function changeHeight() {
      newHeight = elm.clientHeight;
      if (lastHeight != newHeight) {
        callback();
      }
      lastHeight = newHeight;

      if (elm.onElementHeightChangeTimer) {
        clearTimeout(elm.onElementHeightChangeTimer);
      }

      elm.onElementHeightChangeTimer = setTimeout(changeHeight, 200);
    })();
  };

  const handleScroll = () => {
    const doc = document;

    if (!nodes || !Object.keys(nodes).length) return;

    let newActiveNodes: ScrollSpyActiveNodes = {};
    for (const type of nodeTypes) {
      const scrollTop =
        (doc.documentElement.scrollTop ||
          doc.body.parentNode.scrollTop ||
          doc.body.scrollTop) + (offset[type] ? offset[type] : 0);
      const newActiveNode = updateActiveNode(nodes[type], scrollTop);

      if (newActiveNode !== activeNodes[type]) {
        newActiveNodes[type] = newActiveNode;
      }
    }

    if (Object.keys(newActiveNodes).length) {
      setActiveNodes({ ...activeNodes, ...newActiveNodes });
    }
  };

  useLayoutEffect(() => {
    handleResize();
    handleChangeHeight(document.body, handleResize);

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  useLayoutEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [nodes]);

  return { activeNodes, handleResize, handleScroll };
};

export default createContainer(useScrollSpy);
