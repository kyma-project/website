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
  const [activeTab, setActiveTab] = useState(active);
  const handleTabClick = (index: number) => setActiveTab(index);

  const { hash } = useLocation();
  const { tabGroups, getActiveTabInGroup, setActiveTabInGroup } = useContext(
    GenericDocsContext,
  );

  const children: Array<React.ReactElement<TabProps>> = []
    .concat(...(content as any))
    .filter(Boolean);
  const identifier = headingPrefix && toKebabCase(`${headingPrefix}-${name}`);

  const isAppropriateElement = (
    elem: React.ReactElement<TabProps>,
    hashParts: string[],
  ) =>
    !!hashParts &&
    hashParts.length === 3 &&
    !!elem &&
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
    const [tabGroup, tabLabel, id] = hashData;

    // children.forEach((elem: React.ReactElement<TabProps>, index: number) => {
    //   if (isAppropriateElement(elem, hashData)) {
    //     handleTabClick(index);
    //     setTimeout(() => {
    //       if (!!document) {
    //         const element = document.getElementById(hash.slice(1));
    //         if (!!element) {
    //           element.scrollIntoView(true);
    //         }
    //       }
    //     }, 100);
    //   }
    // });
  }, [hash]);

  useEffect(() => {
    const label = children[activeTab] && children[activeTab].props.labelID;
    const activeLabelInGroup = getActiveTabInGroup(group || "");

    if (
      group &&
      label &&
      (!activeLabelInGroup || label !== activeLabelInGroup)
    ) {
      setActiveTabInGroup(group, label);
    }
  }, [activeTab]);

  useEffect(() => {
    const label = children[activeTab] && children[activeTab].props.labelID;
    // if (group && tabGroups.hasOwnProperty(group) && tabGroups[group] !== label) {

    // }
  }, [tabGroups]);

  const renderHeader = (ch: Array<React.ReactElement<TabProps>>) =>
    React.Children.map(ch, (child, index) =>
      React.cloneElement(child, {
        key: index,
        label: child.props.label,
        labelID: child.props.labelID,
        parentCallback: handleTabClick,
        tabIndex: index,
        headingPrefix,
        isActive: index === activeTab,
      }),
    );

  const renderActiveTab = (ch: Array<React.ReactElement<TabProps>>) =>
    ch[activeTab] ? ch[activeTab].props.children : null;

  return (
    <TabsWrapper id={identifier}>
      <TabsHeader>{renderHeader(children)}</TabsHeader>
      <TabsContent>{renderActiveTab(children)}</TabsContent>
    </TabsWrapper>
  );
};

export default Tabs;
