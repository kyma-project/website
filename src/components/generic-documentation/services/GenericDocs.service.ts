import { useState, useEffect } from "react";
import createUseContext from "constate";

import { Sources } from "@kyma-project/documentation-component";

export const types: Set<string> = new Set<string>();
export let hideTitleHeader: boolean = false;

function useGenericdocsService() {
  const [showMobileLeftNav, setShowMobileLeftNav] = useState<boolean>(false);
  const [showMobileRightNav, setShowMobileRightNav] = useState<boolean>(false);

  return {
    showMobileLeftNav,
    setShowMobileLeftNav,
    showMobileRightNav,
    setShowMobileRightNav,
  };
}

const { Provider, Context } = createUseContext(useGenericdocsService);
export { Provider as GenericDocsProvider, Context as GenericDocsContext };
