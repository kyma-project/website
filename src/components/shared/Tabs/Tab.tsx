import React, { Component } from "react";

import { TabLink, TabWrapper } from "./styled";

export interface TabProps {
  children: React.ReactNode;
  label: string;
  tabIndex?: number;
  isActive?: boolean;
  parentCallback?: (value: number) => void;
}

const Tab: React.FunctionComponent<TabProps> = ({
  label = "",
  tabIndex,
  isActive = false,
  parentCallback,
}) => (
  <TabWrapper key={tabIndex}>
    <TabLink
      onClick={(event: any) => {
        event.preventDefault();
        parentCallback!(tabIndex!);
      }}
      active={isActive}
    >
      {label}
    </TabLink>
  </TabWrapper>
);

export default Tab;
