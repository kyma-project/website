import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-use";

import { GenericDocsContext } from "@components/generic-documentation/services/GenericDocs.service";
import { TabProps } from "./Tab";

import { toKebabCase } from "@common/utils/toKebabCase";
import { scrollIntoViewOfAnchor } from "@common/utils/scrollIntoViewOfAnchor";

import { TabsWrapper, TabsHeader, TabsContent } from "./styled";

function scrollIntoView(anchor: string) {
  setTimeout(() => {
    scrollIntoViewOfAnchor(anchor);
  }, 25);
}

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

  const { tabGroups, getActiveTabInGroup, setActiveTabInGroup } = useContext(
    GenericDocsContext,
  );
  const identifier =
    headingPrefix &&
    `${toKebabCase(headingPrefix)}${name ? `--${toKebabCase(name)}` : ""}`;
  const { hash } = useLocation();
  const [activeTab, setActiveTab] = useState<string>("");
  const handleTabClick = (label: string) => {
    const activeLabelInGroup = group && getActiveTabInGroup(group);

    if (group && (!activeLabelInGroup || label !== activeLabelInGroup)) {
      setActiveTabInGroup(group, label);
    } else {
      setActiveTab(label);
    }
  };

  useEffect(() => {
    if (children.length > active && children[active].props.labelID) {
      setActiveTab(toKebabCase(children[active].props.labelID));
    }
  }, []);

  useEffect(() => {
    if (group && tabGroups.hasOwnProperty(group)) {
      const g = tabGroups[group];
      const hasTab = children.find(c => c.props.labelID === g);

      if (hasTab && g !== activeTab) {
        setActiveTab(g);
      }
    }
  }, [tabGroups]);

  useEffect(() => {
    if (!hash) {
      return;
    }
    const hashData = hash.split("--").slice(1);
    const [tabGroup, tabLabel, anchor] = hashData;
    if (tabLabel) {
      const hasTab = children.find(c => c.props.labelID === tabLabel);
      if (hasTab && tabGroup === name) {
        handleTabClick(tabLabel);

        if (!anchor) {
          scrollIntoView(hash.slice(0, -(tabLabel.length + 2)));
          return;
        }
      }
    }
    if (tabGroup) {
      scrollIntoView(hash);
    }
  }, [hash]);

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
