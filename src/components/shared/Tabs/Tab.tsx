import React, { ReactNode } from "react";
import { TabLink, TabWrapper } from "./styled";

export interface TabProps {
  label: string;
  tabIndex?: number;
  isActive?: boolean;
  handleTabClick?: (value: number) => void;
  children?: any;
}

const Tab: React.FunctionComponent<TabProps> = ({
  label = "",
  tabIndex,
  isActive = false,
  handleTabClick,
}) => (
  <TabWrapper key={tabIndex}>
    <TabLink
      onClick={(event: any) => {
        event.preventDefault();
        if (handleTabClick && tabIndex !== undefined && !isNaN(tabIndex)) {
          handleTabClick(tabIndex);
        }
      }}
      active={isActive}
    >
      {label}
    </TabLink>
  </TabWrapper>
);

export default Tab;
