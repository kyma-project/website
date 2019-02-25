import React from "react";

interface TextProps {}

export const Text: React.FunctionComponent<TextProps> = ({ children }) => {
  return <>{children}</>;
};
