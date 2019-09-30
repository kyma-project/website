import React from "react";

import { FormattedMessage } from "@common/i18n";

interface Props {
  number: number;
}

export const TicketNumber: React.FunctionComponent<Props> = ({ number: n }) => (
  <FormattedMessage
    id="roadmap.common.ticket"
    values={{
      numberSign: (
        <>
          N<sup>o</sup>
        </>
      ),
      number: n,
    }}
  />
);
