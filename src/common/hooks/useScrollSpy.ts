import { useState, useLayoutEffect } from "react";
import createUseContext from "constate";

interface ScrollSpyNode {
  id: string;
  offsetHeight: number;
  offsetTop: number;
}

interface ScrollSpyOffset {
  [key: string]: number;
}

interface ScrollSpyNodes {
  [key: string]: ScrollSpyNode[];
}

interface ScrollSpyActiveNodes {
  [key: string]: ScrollSpyNode;
}

interface ScrollSpyProps {
  rootElement: string;
  nodeTypes: string[];
  offset: ScrollSpyOffset;
}

const ScrollSpy = ({ rootElement, nodeTypes, offset }: ScrollSpyProps) => {
  const [nodes, setNodes] = useState<ScrollSpyNodes>({});
  const [activeNodes, setActiveNodes] = useState<ScrollSpyActiveNodes>({});

  const updateActiveNode = (n: ScrollSpyNode[], scrollTop: number) => {
    const [firstNode] = n;

    if (firstNode && scrollTop <= firstNode.offsetTop) return firstNode;
    return n
      .filter(node => node.offsetTop - scrollTop <= 0)
      .sort((a, b) => b.offsetTop - a.offsetTop)[0];
  };

  const handleResize = () => {
    const newNodes: ScrollSpyNodes = {};
    for (const type of nodeTypes) {
      newNodes[type] = [];
    }

    const rootNode = document.querySelector(rootElement);
    if (!rootNode) return;

    const nodesInRootNode = rootNode.querySelectorAll("*[id]");
    const dataScrollSpyNodeTypeAtr = "scrollspyNodeType";

    // tslint:disable-next-line
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
          newNodes[type].push(nodeWithInfo);
        }
      }
    }

    setNodes(newNodes);
  };

  const handleChangeHeight = (elm: any, callback: () => any) => {
    let lastHeight = elm.clientHeight;
    (function changeHeight() {
      const newHeight = elm.clientHeight;
      if (lastHeight !== newHeight) {
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

    const newActiveNodes: ScrollSpyActiveNodes = {};
    for (const type of nodeTypes) {
      const scrollTop: number =
        (doc.documentElement.scrollTop ||
          (doc as any).body.parentNode.scrollTop ||
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
  }, [nodes, activeNodes]);

  return { activeNodes, handleResize, handleScroll };
};

export const useScrollSpy = createUseContext(ScrollSpy);
