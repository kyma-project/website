import React from "react";
import { StyledEarlyAdoptersListItem } from "../styled";

import Link from "@components/shared/Link";
import Tooltip from "@components/shared/Tooltip";

import SaasLogo from "@static/img/early-adopters/saas.svg";

import { EarlyAdopter } from "./EarlyAdopters";

export const EarlyAdoptersListItem: React.FunctionComponent<EarlyAdopter> = ({
  company,
  title,
  link,
  children,
}) => {
  let content = (
    <svg
      className={`sprite-icon sprite-icon--${company}`}
      role="img"
      aria-labelledby={company}
    >
      {children}
      <title id={company}>{company}</title>
      <use xlinkHref={`#${company}`} />
    </svg>
  );

  if (company === "saas") {
    content = <img src={SaasLogo} alt="SAAS - Software as a Service" />;
  }

  return (
    <Tooltip content={title} placement="bottom">
      <StyledEarlyAdoptersListItem>
        {link ? <Link.External to={link}>{content}</Link.External> : content}
      </StyledEarlyAdoptersListItem>
    </Tooltip>
  );
};
