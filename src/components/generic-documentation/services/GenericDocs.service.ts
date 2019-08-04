import { useState, useEffect } from "react";
import createUseContext from "constate";

import { Sources } from "@kyma-project/documentation-component";

export const types: Set<string> = new Set<string>();
export let hideTitleHeader: boolean = false;

interface GenericDocsServiceProps {
  sourcesLength: number;
}

function useGenericDocsService() {
  const [showMobileLeftNav, setShowMobileLeftNav] = useState<boolean>(false);
  const [showMobileRightNav, setShowMobileRightNav] = useState<boolean>(false);

  return {
    showMobileLeftNav,
    setShowMobileLeftNav,
    showMobileRightNav,
    setShowMobileRightNav,
  };
}

const { Provider, Context } = createUseContext(useGenericDocsService);
export { Provider as GenericDocsProvider, Context as GenericDocsContext };
