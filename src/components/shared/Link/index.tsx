import React from "react";
import { Link, GatsbyLinkProps } from "gatsby";
import { injectIntl, intlShape, InjectedIntlProps } from "react-intl";

import Icon from "@components/shared/Icon";

import {
  ExternalLink,
  InternalLink,
  HashLinkWithIcon,
  HashLink,
} from "./styled";

const i18nConfig = require("../../../../config").i18n;

interface LinkProps extends GatsbyLinkProps<{}> {
  withUnderline?: boolean;
}

const External: React.FunctionComponent<
  LinkProps & { externalIcon?: boolean }
> = ({
  to,
  className,
  children,
  externalIcon = false,
  withUnderline = false,
  onClick,
}) => {
  return (
    <ExternalLink
      href={to}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      withUnderline={withUnderline}
      onClick={onClick}
    >
      {children}
      {externalIcon && <Icon iconName="external-link-alt" iconPrefix="fas" />}
    </ExternalLink>
  );
};

const Internal: React.FunctionComponent<LinkProps & InjectedIntlProps> = ({
  to = "",
  intl: { locale },
  className,
  children,
  withUnderline = false,
  onClick,
}) => {
  const path = i18nConfig[locale].default ? to : `/${locale}${to}`;

  return (
    <InternalLink
      to={path}
      className={className}
      withUnderline={withUnderline}
      onClick={onClick}
    >
      {children}
    </InternalLink>
  );
};

const Hash: React.FunctionComponent<LinkProps & { chainIcon?: boolean }> = ({
  to,
  className,
  children,
  chainIcon = false,
  withUnderline = false,
  onClick,
}) => {
  const preparedTo = to.startsWith("#") ? to : `#${to}`;

  if (chainIcon) {
    return (
      <HashLinkWithIcon>
        {children}
        <HashLink
          href={preparedTo}
          className={className}
          withUnderline={withUnderline}
          onClick={onClick}
        >
          <Icon iconName="link" iconPrefix="fas" />
        </HashLink>
      </HashLinkWithIcon>
    );
  }

  return (
    <HashLink
      href={preparedTo}
      className={className}
      withUnderline={withUnderline}
      onClick={onClick}
    >
      {children}
    </HashLink>
  );
};

export default {
  External: External,
  Internal: injectIntl(Internal),
  Hash: Hash,
};
