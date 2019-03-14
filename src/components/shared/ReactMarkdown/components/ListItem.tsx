import React from "react";

interface ListItemProps {
  checked: boolean | null;
  index: number;
}

export const ListItem: React.FunctionComponent<ListItemProps> = ({
  index,
  children,
}) => <li key={index}>{children}</li>;
