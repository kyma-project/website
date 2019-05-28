import React from "react";
import { StyledEarlyAdoptersListItem } from "../styled";

import SaasLogo from "@static/img/early-adopters/saas.svg";

interface ListItemProps {
  company: string;
}
export const EarlyAdoptersListItem: React.FunctionComponent<ListItemProps> = ({
  company,
  children,
}) => {
  if (company === "saas") {
    return <img src={SaasLogo} alt="SAAS - Software as a Service" />;
  }

  return (
    <StyledEarlyAdoptersListItem>
      <svg
        className={`sprite-icon sprite-icon--${company}`}
        role="img"
        aria-labelledby={company}
      >
        {children}
        <title id={company}>{company}</title>
        <use xlinkHref={`#${company}`} />
      </svg>
    </StyledEarlyAdoptersListItem>
  );
};
