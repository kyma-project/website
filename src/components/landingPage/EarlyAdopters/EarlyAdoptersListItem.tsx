import React from "react";
import { StyledEarlyAdoptersListItem } from "../styled";

interface ListItemProps {
  company: string;
}
export const EarlyAdoptersListItem: React.FunctionComponent<ListItemProps> = ({
  company,
  children,
}) => (
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
