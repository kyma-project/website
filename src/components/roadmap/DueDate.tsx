import React from "react";

import { injectIntl, IntlInterface, FormattedMessage } from "@common/i18n";

interface Props {
  date: string;
}

const DueDate: React.FunctionComponent<Props & IntlInterface> = ({
  date,
  formatMessage,
}) => {
  /*
    format: {YY}-{MM}-{DD}T{TIME}
  */
  const extractedDate = date.split("T")[0].split("-");
  const year = extractedDate[0];
  const month =
    extractedDate[1][0] === "0" ? extractedDate[1][1] : extractedDate[1];
  const day = extractedDate[2];

  const formattedDate = `${formatMessage({
    id: `months.${month}.name`,
  })} ${day}, ${year}`;

  return (
    <FormattedMessage
      id="roadmap.common.dueDate"
      values={{
        date: formattedDate,
      }}
    />
  );
};

export default injectIntl("utils")(DueDate);
