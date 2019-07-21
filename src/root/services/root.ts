import { useState } from "react";
import createUseContext from "constate";

function useRootService() {
  const [language, setLanguage] = useState<string>("en");

  return {
    language,
    setLanguage,
  };
}

const { Provider, Context } = createUseContext(useRootService);
export { Provider as RootProvider, Context as RootContext };
