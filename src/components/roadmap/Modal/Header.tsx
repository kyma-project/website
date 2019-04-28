import React from "react";

import { FormattedMessage } from "@common/i18n";

import Svg from "@components/roadmap/Svg";

import Link from "@components/shared/Link";
import Icon from "@components/shared/Icon";

import TicketNumber from "@components/roadmap/TicketNumber";
import DueDate from "@components/roadmap/DueDate";

import { Ticket } from "../types";

import {
  ModalHeaderWrapper,
  ModalHeaderIcon,
  ModalHeaderMeta,
  ModalHeaderMetaCapability,
  ModalHeaderMetaTicketNumber,
  ModalHeaderDueDate,
  ModalHeaderTitle,
  ModalHeaderLinks,
  ModalHeaderLink,
  ModalHeaderLinkButton,
} from "./styled";

export interface ModalHeaderProps extends Ticket {
  capabilityDisplayName: string;
}

const ModalHeader: React.FunctionComponent<ModalHeaderProps> = ({
  capabilityId,
  capabilityDisplayName,
  title,
  number: n,
  dueDate,
  url,
  zenHubUrl,
  release,
}) => (
  <ModalHeaderWrapper>
    <div>
      <ModalHeaderIcon>
        <Svg capability={capabilityId} />
      </ModalHeaderIcon>
      <ModalHeaderMeta>
        <ModalHeaderMetaCapability>
          {capabilityDisplayName}
        </ModalHeaderMetaCapability>
        <ModalHeaderMetaTicketNumber>
          <TicketNumber number={n} />
        </ModalHeaderMetaTicketNumber>
      </ModalHeaderMeta>
      <ModalHeaderDueDate>
        <Icon iconName="calendar-alt" iconPrefix="far" />
        <DueDate date={dueDate} futurePlanned={release === "Future"} />
      </ModalHeaderDueDate>
      <ModalHeaderTitle>{title}</ModalHeaderTitle>
      <ModalHeaderLinks>
        <ModalHeaderLink>
          <Link.External to={zenHubUrl}>
            <ModalHeaderLinkButton>
              <FormattedMessage id="roadmap.modal.viewInZenHub" />
            </ModalHeaderLinkButton>
          </Link.External>
        </ModalHeaderLink>
        <ModalHeaderLink>
          <Link.External to={url}>
            <ModalHeaderLinkButton>
              <FormattedMessage id="roadmap.modal.viewInGitHub" />
            </ModalHeaderLinkButton>
          </Link.External>
        </ModalHeaderLink>
      </ModalHeaderLinks>
    </div>
  </ModalHeaderWrapper>
);

export default ModalHeader;
