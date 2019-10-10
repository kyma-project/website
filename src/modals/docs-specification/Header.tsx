import React from "react";

import { FormattedMessage } from "@common/i18n";

import Link from "@components/shared/Link";

import { Specification, SpecificationType } from "@typings/docs";

import {
  ModalHeaderLinks,
  ModalHeaderLink,
  ModalHeaderLinkButton,
} from "@components/shared/Modal/styled";
import {
  ModalHeaderMeta,
  ModalHeaderMetaType,
  ModalHeaderMetaLicense,
  ModalHeaderTitle,
  ModalHeaderTitleVersion,
  ModalHeaderDescription,
} from "./styled";

export interface ModalHeaderProps {
  specification: Specification;
  specifications: Specification[];
}

function displayType(type: SpecificationType): string {
  switch (type) {
    case SpecificationType.OPEN_API: {
      return "OpenAPI";
    }
    default: {
      return "OpenAPI";
    }
  }
}

export const ModalHeader: React.FunctionComponent<ModalHeaderProps> = ({
  specification,
}) => (
  <>
    <ModalHeaderMeta>
      <ModalHeaderMetaType>
        {displayType(specification.type)}
      </ModalHeaderMetaType>
      {specification.info &&
        specification.info.license &&
        specification.info.license.name && (
          <ModalHeaderMetaLicense>
            {specification.info.license.name}
          </ModalHeaderMetaLicense>
        )}
    </ModalHeaderMeta>
    <ModalHeaderTitle>
      <span>{specification.info.title}</span>
      <ModalHeaderTitleVersion>
        {specification.info.version}
      </ModalHeaderTitleVersion>
    </ModalHeaderTitle>
    {specification.info.description && (
      <ModalHeaderDescription>
        {specification.info.description}
      </ModalHeaderDescription>
    )}
    <ModalHeaderLinks>
      <ModalHeaderLink>
        <Link.External to={specification.assetPath}>
          <ModalHeaderLinkButton iconName="cloud-download-alt" iconPrefix="fas">
            <FormattedMessage id="docs.modal.downloadSpecification" />
          </ModalHeaderLinkButton>
        </Link.External>
      </ModalHeaderLink>
      {specification.githubUrl && (
        <ModalHeaderLink>
          <Link.External to={specification.githubUrl}>
            <ModalHeaderLinkButton>
              <FormattedMessage id="docs.modal.viewInGitHub" />
            </ModalHeaderLinkButton>
          </Link.External>
        </ModalHeaderLink>
      )}
    </ModalHeaderLinks>
  </>
);
