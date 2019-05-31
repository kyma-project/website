import React, { useState, useEffect, useLayoutEffect } from "react";
import { globalHistory, HistoryLocation } from "@reach/router";
import has from "lodash/has";
import { TabProps } from "./Tab";
import { TabsWrapper, TabsHeader, TabsContent } from "./styled";

interface TabsProps {
  active?: number;
  children: any;
}

const Tabs: React.FunctionComponent<TabsProps> = ({ children, active = 0 }) => {
  const [activeTab, setActiveTab] = useState(active);
  const {
    location: { hash },
  } = useLocation();

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const content = [].concat(...(children as any)).filter(child => !!child);

  useEffect(() => {
    if (!hash) {
      return;
    }
    const hashData = hash.split("--").slice(1);
    if (hashData.length !== 3) {
      return;
    }

    content.forEach((elem: React.ReactElement<TabProps>, index: number) => {
      if (
        has(elem, "props.children.props.tabData.group") &&
        has(elem, "props.children.props.source") &&
        elem.props.children.props.tabData.group === hashData[0] &&
        elem.key === hashData[1] &&
        elem.props.children.props.source
          .toLowerCase()
          .trim()
          .replace(/[^a-zA-Z0-9\s#]/g, "")
          .includes(`# ${hashData[2].split("-").join(" ")}`)
      ) {
        handleTabClick(index);
      }
    });
  }, [hash]);

  useLayoutEffect(() => {
    if (!!document) {
      setTimeout(() => {
        const element = document.getElementById(hash.slice(1));
        if (!!element) {
          element.scrollIntoView({ behavior: "auto", block: "center" });
        }
      }, 0);
    }
  }, [hash]);

  const renderHeader = (ch: Array<React.ReactElement<TabProps>>) =>
    React.Children.map(ch, (child, index) =>
      React.cloneElement(child, {
        key: index,
        label: child.props.label,
        handleTabClick,
        tabIndex: index,
        isActive: index === activeTab,
      }),
    );

  const renderActiveTab = (ch: Array<React.ReactElement<TabProps>>) =>
    ch[activeTab] ? ch[activeTab].props.children : null;

  return (
    <TabsWrapper>
      <TabsHeader>{renderHeader(content)}</TabsHeader>
      <TabsContent>{renderActiveTab(content)}</TabsContent>
    </TabsWrapper>
  );
};

export default Tabs;

interface HookReturnVal {
  location: HistoryLocation;
}

const useLocation = (): HookReturnVal => {
  const initialState = {
    location: globalHistory.location,
  };

  const [state, setState] = useState(initialState);
  useEffect(() => {
    const removeListener = globalHistory.listen(params => {
      const { location } = params;
      const newState = Object.assign({}, initialState, { location });
      if (newState.location.hash !== state.location.hash) {
        setState(newState);
      }
    });
    return () => {
      removeListener();
    };
  }, []);
  return state;
};
