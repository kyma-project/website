import React from "react";

interface ParsedHTMLProps {
  element: any;
}

export const ParsedHTML: React.FunctionComponent<ParsedHTMLProps> = ({
  element,
}) => <>{element}</>;
