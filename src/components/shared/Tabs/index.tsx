import React, { useState } from "react";

import { TabProps } from "./Tab";

import { TabsWrapper, TabsHeader, TabsContent } from "./styled";

interface TabsProps {
  className?: string;
  active?: number;
}

const Tabs: React.FunctionComponent<TabsProps> = ({
  className = "",
  active = 0,
  children,
}) => {
  const [activeTab, setActiveTab] = useState(active);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const renderHeader = (ch: Array<React.ReactElement<TabProps>>) =>
    React.Children.map(ch, (child, index) => {
      const c = child as React.ReactElement<TabProps>;
      return React.cloneElement(c, {
        key: index,
        label: c.props.label,
        parentCallback: handleTabClick,
        tabIndex: index,
        isActive: index === activeTab,
      });
    });

  const renderActiveTab = (ch: Array<React.ReactElement<TabProps>>) =>
    ch[activeTab] ? ch[activeTab].props.children : null;

  const content = []
    .concat(...(children as any))
    .filter(child => child !== null && child !== undefined);

  return (
    <TabsWrapper>
      <TabsHeader>{renderHeader(content)}</TabsHeader>
      <TabsContent>{renderActiveTab(content)}</TabsContent>
    </TabsWrapper>
  );
};

export default Tabs;
