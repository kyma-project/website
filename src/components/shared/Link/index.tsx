import React from "react";
import { GatsbyLinkProps } from "gatsby";
import { injectIntl, InjectedIntlProps } from "react-intl";

import H from "@components/shared/H";
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
  ariaLabel?: string;
}

const External: React.FunctionComponent<LinkProps & {
  externalIcon?: boolean;
  noFollow?: boolean;
}> = ({
  to,
  className,
  children,
  externalIcon = false,
  underline = false,
  noFollow = false,
  ariaLabel,
  onClick,
}) => {
  const rel = ["noopener", "noreferrer"];
  if (noFollow) {
    rel.push("nofollow");
  }

  return (
    <ExternalLink
      href={to}
      target="_blank"
      rel={rel.join(" ")}
      className={className}
      underline={underline ? "true" : "false"}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
      {externalIcon && <Icon iconName="external-link-alt" iconPrefix="fas" />}
    </ExternalLink>
  );
};

const Internal: React.FunctionComponent<LinkProps &
  InjectedIntlProps & { intl: { locale: KeysOfi18nConfig } }> = props => {
  const {
    to = "",
    intl: { locale },
    className,
    children,
    underline = false,
    onClick,
    ariaLabel,
    state,
  } = props;

  let path = i18nConfig[locale].default ? to : `/${locale}${to}`;

  const lastPartOfPath = path.split("/").pop() || "";
  const isFile = !!lastPartOfPath.includes(".");
  if (isFile) {
    return <External {...props} />;
  }

  path = path.endsWith("/") || path.includes("#") ? path : `${path}/`;

  return (
    <InternalLink
      to={path}
      className={className}
      underline={underline ? "true" : "false"}
      onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (onClick) {
          e.preventDefault();
          onClick(e);
        }
      }}
      state={state}
      aria-label={ariaLabel}
    >
      {children}
    </InternalLink>
  );
};

const Hash: React.FunctionComponent<LinkProps & { anchorIcon?: boolean }> = ({
  to,
  className,
  children,
  anchorIcon = false,
  underline = false,
  onClick,
  ariaLabel,
}) => {
  const preparedTo = to.startsWith("#") ? to : `#${to}`;

  if (anchorIcon) {
    return (
      <HashLinkWithIcon className="hash-link">
        <div>
          {children}
          <HashLink
            href={preparedTo}
            className={className}
            underline={underline ? "true" : "false"}
            onClick={onClick}
            aria-label={ariaLabel}
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
      aria-label={ariaLabel}
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
