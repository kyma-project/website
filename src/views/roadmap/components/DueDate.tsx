import React from "react";

import { injectIntl, IntlInterface, FormattedMessage } from "@common/i18n";
import { RICK_ROLLED } from "@common/constants";

import Link from "@components/shared/Link";

interface Props {
  date: string;
  futurePlanned: boolean;
}

const DueDate: React.FunctionComponent<Props & IntlInterface> = ({
  date,
  futurePlanned = false,
  formatMessage,
}) => {
  if (futurePlanned) {
    return (
      <FormattedMessage
        id="roadmap.common.dueDate"
        values={{
          date: (
            <Link.External to={RICK_ROLLED}>
              <FormattedMessage id="roadmap.common.rickAstley" />
            </Link.External>
          ),
        }}
      />
    );
  }

  // format: {YY}-{MM}-{DD}T{TIME}
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
