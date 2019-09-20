import { useState, useEffect } from "react";
import { useLocation } from "react-use";
import createUseContext from "constate";

function useRootService() {
  const [language, setLanguage] = useState<string>("en");
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      (window as any).__GATSBY_ROUTE_UPDATE = true;
    }, 10);
  }, [pathname]);

  return {
    language,
    setLanguage,
  };
}

const { Provider, Context } = createUseContext(useRootService);
export { Provider as RootProvider, Context as RootContext };
