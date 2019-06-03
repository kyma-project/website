import React, { useState, useEffect } from "react";
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

  const isAppropriateElement = (
    elem: React.ReactElement<TabProps>,
    hashParts: string[],
  ) =>
    !!hashParts &&
    hashParts.length === 3 &&
    has(elem, "props.children.props.tabData.group") &&
    has(elem, "props.children.props.source") &&
    (elem as any).props.children.props.tabData.group === hashParts[0] &&
    elem.key === hashParts[1] &&
    (elem as any).props.children.props.source
      .toLowerCase()
      .trim()
      .replace(/[^a-zA-Z0-9\s#]/g, "")
      .includes(`# ${hashParts[2].split("-").join(" ")}`);

  useEffect(() => {
    if (!hash) {
      return;
    }
    const hashData = hash.split("--").slice(1);
    if (hashData.length !== 3) {
      return;
    }

    content.forEach((elem: React.ReactElement<TabProps>, index: number) => {
      if (isAppropriateElement(elem, hashData)) {
        handleTabClick(index);
        setTimeout(() => {
          if (!!document) {
            const element = document.getElementById(hash.slice(1));
            if (!!element) {
              element.scrollIntoView(true);
            }
          }
        }, 100);
      }
    });
  }, [hash]);

  const renderHeader = (ch: Array<React.ReactElement<TabProps>>) =>
    React.Children.map(ch, (child, index) =>
      React.cloneElement(child, {
        key: index,
        label: child.props.label,
        parentCallback: handleTabClick,
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
