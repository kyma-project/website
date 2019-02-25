import React from "react";

interface ListItemProps {
  checked: boolean | null;
  tight: boolean;
  ordered: boolean;
  index: number;
}

export const ListItem: React.FunctionComponent<ListItemProps> = ({
  checked,
  tight,
  ordered,
  index,
  children,
}) => {
  return <li key={index}>{children}</li>;
};
