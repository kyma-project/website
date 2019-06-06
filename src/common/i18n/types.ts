import React from "react";
import { InjectedIntlProps, FormattedMessage, MessageValue } from "react-intl";

export type FormatMessageFn = (
  messageDescriptor: FormattedMessage.MessageDescriptor,
  values?: { [key: string]: MessageValue | JSX.Element },
) => string;

export interface IntlInterface {
  formatMessage: FormatMessageFn;
}

export type FunctionComponentIntl<P = {}> = React.FunctionComponent<
  P & InjectedIntlProps & IntlInterface
>;

export interface Internationalization {
  [key: string]: {
    [key: string]: any;
  };
}
