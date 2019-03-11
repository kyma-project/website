import React from "react";

import { PanelWrapper, PanelContent } from "./styled";

export type PanelPropsType = "note" | "tip" | "caution" | undefined;
export interface PanelProps {
  type: PanelPropsType;
}

const NotePanel: React.FunctionComponent<PanelProps> = ({ type, children }) => (
  <PanelWrapper type={type}>
    <PanelContent>{children}</PanelContent>
  </PanelWrapper>
);

export default NotePanel;
