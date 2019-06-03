import React from "react";
import { StyledEarlyAdoptersListItem } from "../styled";

import Link from "@components/shared/Link";

import SaasLogo from "@static/img/early-adopters/saas.svg";

interface ListItemProps {
  company: string;
  link: string;
}
export const EarlyAdoptersListItem: React.FunctionComponent<ListItemProps> = ({
  company,
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
    <StyledEarlyAdoptersListItem>
      {link ? <Link.External to={link}>{content}</Link.External> : content}
    </StyledEarlyAdoptersListItem>
  );
};
