import { useState } from "react";
import createUseContext from "constate";

export const types: Set<string> = new Set<string>();
export let hideTitleHeader: boolean = false;

interface GenericDocsServiceProps {
  assetsPath?: string;
}

interface TabGroupsState {
  [group: string]: string;
}

function useGenericDocsService({ assetsPath }: GenericDocsServiceProps) {
  const [tabGroups, setTabGroups] = useState<TabGroupsState>({});
  const [showMobileLeftNav, setShowMobileLeftNav] = useState<boolean>(false);
  const [showMobileRightNav, setShowMobileRightNav] = useState<boolean>(false);

  const getActiveTabInGroup = (tabGroup?: string): string | undefined => {
    if (!tabGroup || !tabGroups.hasOwnProperty(tabGroup)) {
      return;
    }
    return tabGroups[tabGroup];
  };

  const setActiveTabInGroup = (tabGroup?: string, tabLabel?: string): void => {
    if (!tabGroup || !tabLabel) {
      return;
    }
    setTabGroups(state => ({
      ...state,
      [tabGroup]: tabLabel,
    }));
  };

  return {
    assetsPath,
    tabGroups,
    getActiveTabInGroup,
    setActiveTabInGroup,
    showMobileLeftNav,
    setShowMobileLeftNav,
    showMobileRightNav,
    setShowMobileRightNav,
  };
}

const { Provider, Context } = createUseContext(useGenericDocsService);
export { Provider as GenericDocsProvider, Context as GenericDocsContext };
