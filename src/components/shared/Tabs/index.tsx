import React, { useState, useEffect } from "react";

import { useLocation } from "@common/hooks/useLocation";
import { scrollIntoViewOfAnchor } from "@common/utils/scrollIntoViewOfAnchor";

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

    const formatStr = (str?: string): string =>
      (str || "").toLowerCase().trim();
    React.Children.map(
      content,
      (child: React.ReactElement<TabProps>, index) => {
        const group = formatStr(child.props.group);
        const hashGroup = formatStr(hashData[0]);

        const label = formatStr(child.props.label);
        const hashLabel = formatStr(hashData[1]);

        if (group === hashGroup && label === hashLabel) {
          handleTabClick(child.props.tabIndex || index);
          scrollIntoViewOfAnchor(hash);
        }
      },
    );
  }, [hash]);

  const renderHeader = (ch: Array<React.ReactElement<TabProps>>) =>
    React.Children.map(ch, (child, index) =>
      React.cloneElement(child, {
        key: index,
        group: child.props.group,
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
