import { useState, useEffect } from "react";
import { useLocation } from "react-use";
import createUseContext from "constate";

function useRootService() {
  const [language, setLanguage] = useState<string>("en");
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!window.__GATSBY_ROUTE_UPDATED) {
      setTimeout(() => {
        window.__GATSBY_ROUTE_UPDATED = true;
      }, 25);
    }
  }, [pathname, hash]);

  return {
    language,
    setLanguage,
  };
}

const { Provider, Context } = createUseContext(useRootService);
export { Provider as RootProvider, Context as RootContext };
