import React from "react";
import { FormattedMessage, MessageValue } from "react-intl";

export type FormatMessageFn = (
  messageDescriptor: FormattedMessage.MessageDescriptor,
  values?: { [key: string]: MessageValue | JSX.Element },
) => string;

export type FormatArrayFn = (
  messageDescriptor: FormattedMessage.MessageDescriptor,
  values?: { [key: string]: MessageValue | JSX.Element },
) => string[];

export interface IntlInterface {
  formatMessage: FormatMessageFn;
  formatArray: FormatArrayFn;
}

export type FunctionComponentIntl<P = {}> = React.FunctionComponent<
  P & IntlInterface
>;

export interface Internationalization {
  [key: string]: {
    [key: string]: any;
  };
}

export interface NestedObject<
  T = string | string[] | { [key: string]: NestedObject }
> {
  [key: string]: T;
}
