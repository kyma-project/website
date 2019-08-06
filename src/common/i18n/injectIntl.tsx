import React, { Component } from "react";
import { intlShape, FormattedMessage, MessageValue } from "react-intl";
import { Subtract } from "utility-types";
import { IntlInterface } from "./types";

export default (prefix?: string) => <T extends IntlInterface>(
  WrappedComponent: React.ComponentType<T>,
) =>
  class WrapperComponent extends Component<Subtract<T, IntlInterface>> {
    static contextTypes = {
      intl: intlShape,
    };

    constructor(props: any, context: any) {
      super(props, context);
    }

    formatMessage = (
      messageDescriptor: FormattedMessage.MessageDescriptor,
      values?: { [key: string]: MessageValue | JSX.Element },
    ): string =>
      this.context.intl.formatMessage(
        {
          ...messageDescriptor,
          id: prefix
            ? `${prefix}.${messageDescriptor.id}`
            : messageDescriptor.id,
        },
        values,
      );

    render() {
      return (
        <WrappedComponent
          {...(this.props as T)}
          formatMessage={this.formatMessage}
          intl={this.context.intl}
        />
      );
    }
  };
