import React, { Component } from "react";
import { intlShape, FormattedMessage, MessageValue } from "react-intl";

export default (prefix?: string) => {
  return (WrappedComponent: any) => {
    return class WrapperComponent extends Component {
      static contextTypes = {
        intl: intlShape,
      };

      constructor(props: any, context: any) {
        super(props, context);
      }

      formatMessage = (
        messageDescriptor: FormattedMessage.MessageDescriptor,
        values?: { [key: string]: MessageValue | JSX.Element },
      ): string => {
        return this.context.intl.formatMessage(
          {
            ...messageDescriptor,
            id: prefix
              ? `${prefix}.${messageDescriptor.id}`
              : messageDescriptor.id,
          },
          values,
        );
      };

      render() {
        return (
          <WrappedComponent
            {...this.props}
            formatMessage={this.formatMessage}
            intl={this.context.intl}
          />
        );
      }
    };
  };
};
