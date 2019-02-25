import React from "react";
import { FormattedMessage as FM } from "react-intl";

import { getTranslation } from "./";

interface FormattedMessageProps {
  className?: string;
  prefix?: string;
}

const FormattedMessage: React.FunctionComponent<
  FM.Props & FormattedMessageProps
> = ({ className, prefix = "", ...props }) => {
  return <FM {...props} />;
};

export default FormattedMessage;
