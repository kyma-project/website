import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-use";
import has from "lodash/has";

import { TabProps } from "./Tab";
import { toKebabCase } from "@common/utils/toKebabCase";
import { GenericDocsContext } from "@components/generic-documentation/services/GenericDocs.service";
import { TabsWrapper, TabsHeader, TabsContent } from "./styled";

interface TabsProps {
  active?: number;
  name?: string;
  group?: string;
  headingPrefix?: string;
  children: any;
}

const Tabs: React.FunctionComponent<TabsProps> = ({
  active = 0,
  name,
  group,
  headingPrefix,
  children: content,
}) => {
  const children: Array<React.ReactElement<TabProps>> = []
    .concat(...(content as any))
    .filter(Boolean);

  let initActiveLabel: string = "";
  if (children.length > active) {
    initActiveLabel =
      children[active].props.labelID ||
      toKebabCase(children[active].props.label) ||
      "";
  }

  const [activeTab, setActiveTab] = useState<string>(initActiveLabel);
  const handleTabClick = (label: string) => {
    const activeLabelInGroup = getActiveTabInGroup(group || "");

    if (group && (!activeLabelInGroup || label !== activeLabelInGroup)) {
      setActiveTabInGroup(group, label);
    } else {
      setActiveTab(label);
    }
  };

  const { hash } = useLocation();
  const { tabGroups, getActiveTabInGroup, setActiveTabInGroup } = useContext(
    GenericDocsContext,
  );
  const identifier = headingPrefix && toKebabCase(`${headingPrefix}-${name}`);

  useEffect(() => {
    if (!hash) {
      return;
    }
    const hashData = hash.split("--").slice(1);
    if (hashData.length !== 3) {
      return;
    }
    const [tabGroup, tabLabel, anchor] = hashData;
    const hasTab = children.find(c => c.props.labelID === tabLabel);

    if (hasTab && tabGroup === name) {
      handleTabClick(tabLabel);
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView(true);
      }
    }
  }, [hash]);

  useEffect(() => {
    if (group && tabGroups.hasOwnProperty(group)) {
      const hasTab = children.find(c => c.props.labelID === tabGroups[group]);
      if (hasTab && tabGroups[group] !== activeTab) {
        setActiveTab(tabGroups[group]);
      }
    }
  }, [tabGroups]);

  const renderHeader = (ch: Array<React.ReactElement<TabProps>>) =>
    React.Children.map(ch, (child, index) => {
      const labelID =
        child.props.labelID || toKebabCase(child.props.label) || "";
      return React.cloneElement(child, {
        key: index,
        label: child.props.label,
        labelID,
        headingPrefix,
        isActive: labelID === activeTab,
        parentCallback: handleTabClick,
      });
    });

  const renderActiveTab = (ch: Array<React.ReactElement<TabProps>>) => {
    const child = ch.find(c => c.props.labelID === activeTab);
    return (child && child.props.children) || null;
  };

  return (
    <TabsWrapper id={identifier}>
      <TabsHeader>{renderHeader(children)}</TabsHeader>
      <TabsContent>{renderActiveTab(children)}</TabsContent>
    </TabsWrapper>
  );
};

export default Tabs;
