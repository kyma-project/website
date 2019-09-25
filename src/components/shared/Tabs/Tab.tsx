import React from "react";

import { TabLink, TabWrapper } from "./styled";

export interface TabProps {
  group?: string;
  label: string;
  labelID: string;
  isActive?: boolean;
  headingPrefix?: string;
  parentCallback?: (label: string) => void;
  children: React.ReactNode;
}

const Tab: React.FunctionComponent<TabProps> = ({
  label = "",
  labelID,
  isActive = false,
  parentCallback,
}) => (
  <TabWrapper key={labelID}>
    <TabLink
      onClick={(event: any) => {
        event.preventDefault();
        parentCallback && parentCallback(labelID);
      }}
      active={isActive}
    >
      {label}
    </TabLink>
  </TabWrapper>
);

export default Tab;
