import React from "react";
import { IntlProvider as Intl, addLocaleData } from "react-intl";

import flattenMessages from "./flattenMessages";

// Locale data
import enData from "react-intl/locale-data/en";

// Messages
import messages from "./locales";

addLocaleData([...enData]);

const IntlProvider: React.FunctionComponent<Intl.Props> = ({
  locale = "en",
  children,
}) => (
  <Intl
    locale={locale}
    key={locale}
    messages={flattenMessages(messages[locale])}
  >
    {children}
  </Intl>
);

export default IntlProvider;
