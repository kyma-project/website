import React from "react";

import Svg from "@components/roadmap/Svg";

import Link from "@components/shared/Link";
import Icon from "@components/shared/Icon";

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
          Ticket N<sup>o</sup> {n}
        </ModalHeaderMetaTicketNumber>
      </ModalHeaderMeta>
      <ModalHeaderDueDate>
        <Icon iconName="calendar-alt" iconPrefix="far" />
        Due by {dueDate}
      </ModalHeaderDueDate>
      <ModalHeaderTitle>{title}</ModalHeaderTitle>
      <ModalHeaderLinks>
        <ModalHeaderLink>
          <Link.External to={zenHubUrl}>
            <ModalHeaderLinkButton>View in ZenHub</ModalHeaderLinkButton>
          </Link.External>
        </ModalHeaderLink>
        <ModalHeaderLink>
          <Link.External to={url}>
            <ModalHeaderLinkButton>View in GitHub</ModalHeaderLinkButton>
          </Link.External>
        </ModalHeaderLink>
      </ModalHeaderLinks>
    </div>
  </ModalHeaderWrapper>
);

export default ModalHeader;
