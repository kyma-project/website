import React from "react";
import { FormattedMessage as FM } from "react-intl";

interface FormattedMessageProps {
  className?: string;
  prefix?: string;
}

const FormattedMessage: React.FunctionComponent<FM.Props &
  FormattedMessageProps> = ({ className, prefix = "", ...props }) => (
  <FM {...props} />
);

export default FormattedMessage;
