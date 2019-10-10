import React from "react";

import { FormattedMessage } from "@common/i18n";

import Link from "@components/shared/Link";
import Icon from "@components/shared/Icon";

import {
  TicketNumber,
  DueDate,
  CapabilitySvg,
} from "../../views/roadmap/components";

import { Ticket } from "@typings/roadmap";

import {
  ModalHeaderLinks,
  ModalHeaderLink,
  ModalHeaderLinkButton,
} from "@components/shared/Modal/styled";
import {
  ModalHeaderMeta,
  ModalHeaderIcon,
  ModalHeaderMetaCapability,
  ModalHeaderMetaTicketNumber,
  ModalHeaderDueDate,
  ModalHeaderTitle,
} from "./styled";

export interface ModalHeaderProps {
  ticket: Ticket;
}

export const ModalHeader: React.FunctionComponent<ModalHeaderProps> = ({
  ticket: {
    capability,
    number: nr,
    dueDate,
    release,
    title,
    zenHubUrl,
    githubUrl,
  },
}) => (
  <>
    <ModalHeaderIcon>
      <CapabilitySvg capability={capability.id} />
    </ModalHeaderIcon>
    <ModalHeaderMeta>
      <ModalHeaderMetaCapability>
        {capability.displayName}
      </ModalHeaderMetaCapability>
      <ModalHeaderMetaTicketNumber>
        <TicketNumber number={nr} />
      </ModalHeaderMetaTicketNumber>
    </ModalHeaderMeta>
    <ModalHeaderDueDate>
      <Icon iconName="calendar-alt" iconPrefix="far" />
      <DueDate date={dueDate} futurePlanned={release.title === "Future"} />
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
        <Link.External to={githubUrl}>
          <ModalHeaderLinkButton>
            <FormattedMessage id="roadmap.modal.viewInGitHub" />
          </ModalHeaderLinkButton>
        </Link.External>
      </ModalHeaderLink>
    </ModalHeaderLinks>
  </>
);
