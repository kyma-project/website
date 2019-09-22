import { useState, useEffect } from "react";
import { useLocation } from "react-use";
import createUseContext from "constate";

function useRootService() {
  const [language, setLanguage] = useState<string>("en");
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      window.__GATSBY_ROUTE_UPDATE = true;
    }, 100);
  }, [pathname]);

  return {
    language,
    setLanguage,
  };
}

const { Provider, Context } = createUseContext(useRootService);
export { Provider as RootProvider, Context as RootContext };
