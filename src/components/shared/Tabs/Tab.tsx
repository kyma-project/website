import React from "react";

import { TabLink, TabWrapper } from "./styled";

export interface TabProps {
  group?: string;
  label: string;
  labelID?: string;
  tabIndex?: number;
  isActive?: boolean;
  headingPrefix?: string;
  parentCallback?: (value: number) => void;
  children: React.ReactNode;
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
