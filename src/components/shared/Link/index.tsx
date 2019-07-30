import React from "react";
import { GatsbyLinkProps } from "gatsby";
import { injectIntl, InjectedIntlProps } from "react-intl";

import Icon from "@components/shared/Icon";

import {
  ExternalLink,
  InternalLink,
  HashLinkWithIcon,
  HashLink,
} from "./styled";

import config from "../../../../config.json";

const i18nConfig = config.i18n;
type KeysOfi18nConfig = keyof typeof i18nConfig;

interface LinkProps extends GatsbyLinkProps<{}> {
  underline?: boolean;
}

const External: React.FunctionComponent<
  LinkProps & { externalIcon?: boolean }
> = ({
  to,
  className,
  children,
  externalIcon = false,
  underline = false,
  onClick,
}) => (
  <ExternalLink
    href={to}
    target="_blank"
    rel="noopener noreferrer"
    className={className}
    underline={underline ? "true" : "false"}
    onClick={onClick}
  >
    {children}
    {externalIcon && <Icon iconName="external-link-alt" iconPrefix="fas" />}
  </ExternalLink>
);

const Internal: React.FunctionComponent<
  LinkProps & InjectedIntlProps & { intl: { locale: KeysOfi18nConfig } }
> = ({
  to = "",
  intl: { locale },
  className,
  children,
  underline = false,
  onClick,
  state,
}) => {
  let path = i18nConfig[locale].default ? to : `/${locale}${to}`;
  path = path.endsWith("/") || path.includes("#") ? path : `${path}/`;

  return (
    <InternalLink
      to={path}
      className={className}
      underline={underline ? "true" : "false"}
      onClick={onClick}
      state={state}
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
  underline = false,
  onClick,
}) => {
  const preparedTo = to.startsWith("#") ? to : `#${to}`;

  if (chainIcon) {
    return (
      <HashLinkWithIcon className="hash-link">
        <div>
          {children}
          <HashLink
            href={preparedTo}
            className={className}
            underline={underline ? "true" : "false"}
            onClick={onClick}
          >
            <Icon iconName="anchor" iconPrefix="fas" />
          </HashLink>
        </div>
      </HashLinkWithIcon>
    );
  }

  return (
    <HashLink
      href={preparedTo}
      className={className}
      underline={underline ? "true" : "false"}
      onClick={onClick}
    >
      {children}
    </HashLink>
  );
};

export default {
  External,
  Internal: injectIntl(Internal),
  Hash,
};
