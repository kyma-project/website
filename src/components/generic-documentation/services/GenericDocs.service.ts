import { useState, useEffect } from "react";
import createUseContext from "constate";

import { Sources } from "@kyma-project/documentation-component";

export const types: Set<string> = new Set<string>();
export let hideTitleHeader: boolean = false;

interface GenericDocsServiceProps {
  assetsPath: string;
}

function useGenericDocsService({ assetsPath }: GenericDocsServiceProps) {
  const [showMobileLeftNav, setShowMobileLeftNav] = useState<boolean>(false);
  const [showMobileRightNav, setShowMobileRightNav] = useState<boolean>(false);

  // this feature breaks tabs and copy button - probably by propagation of click event
  // useEffect(() => {
  //   const gridUnitContent = document.querySelector(".grid-unit-content");
  //   const onClick = (e: Event) => {
  //     e.stopPropagation();
  //     setShowMobileLeftNav(false);
  //     setShowMobileRightNav(false);
  //   };

  //   gridUnitContent && gridUnitContent.addEventListener("click", onClick);
  //   return () => {
  //     gridUnitContent && gridUnitContent.removeEventListener("click", onClick);
  //   };
  // }, []);

  return {
    assetsPath,
    showMobileLeftNav,
    setShowMobileLeftNav,
    showMobileRightNav,
    setShowMobileRightNav,
  };
}

const { Provider, Context } = createUseContext(useGenericDocsService);
export { Provider as GenericDocsProvider, Context as GenericDocsContext };
