import React, { useContext } from "react";
import { IntlProvider as Intl, addLocaleData } from "react-intl";

import flattenMessages from "./flattenMessages";

// Locale data
import enData from "react-intl/locale-data/en";

// Messages
import messages from "./locales";

import { RootContext } from "../../root/services";

addLocaleData([...enData]);

const IntlProvider: React.FunctionComponent<Intl.Props> = ({ children }) => {
  const { language } = useContext(RootContext);

  return (
    <Intl
      locale={language}
      key={language}
      messages={flattenMessages(messages[language])}
    >
      {children}
    </Intl>
  );
};

export default IntlProvider;
