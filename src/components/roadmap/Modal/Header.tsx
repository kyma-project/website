import React from "react";

import Svg from "@components/roadmap/Svg";

import Link from "@components/shared/Link";
import Icon from "@components/shared/Icon";

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

export interface ModalHeaderProps {
  capability: string;
  ticketNumber: string;
  title: string;
  dueDate: string;
  githubLink: string;
  zenhubLink: string;
}

const ModalHeader: React.FunctionComponent<ModalHeaderProps> = ({
  capability,
  ticketNumber,
  title,
  dueDate,
  githubLink,
  zenhubLink,
  children,
}) => (
  <ModalHeaderWrapper>
    <div>
      <ModalHeaderIcon>
        <Svg capability={"application-connectivity"} />
      </ModalHeaderIcon>
      <ModalHeaderMeta>
        <ModalHeaderMetaCapability>{capability}</ModalHeaderMetaCapability>
        <ModalHeaderMetaTicketNumber>
          Ticket N<sup>o</sup> {ticketNumber}
        </ModalHeaderMetaTicketNumber>
      </ModalHeaderMeta>
      <ModalHeaderDueDate>
        <Icon iconName="calendar-alt" iconPrefix="far" />
        Due by {dueDate}
      </ModalHeaderDueDate>
      <ModalHeaderTitle>{title}</ModalHeaderTitle>
      <ModalHeaderLinks>
        <ModalHeaderLink>
          <Link.External to={githubLink}>
            <ModalHeaderLinkButton>View in ZenHub</ModalHeaderLinkButton>
          </Link.External>
        </ModalHeaderLink>
        <ModalHeaderLink>
          <Link.External to={githubLink}>
            <ModalHeaderLinkButton>View in GitHub</ModalHeaderLinkButton>
          </Link.External>
        </ModalHeaderLink>
      </ModalHeaderLinks>
    </div>
  </ModalHeaderWrapper>
);

export default ModalHeader;
