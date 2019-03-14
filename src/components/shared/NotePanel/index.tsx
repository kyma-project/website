import React from "react";

import { NotePanelWrapper, NotePanelContent } from "./styled";

export type NotePanelPropsType = "note" | "tip" | "caution" | undefined;
export interface NotePanelProps {
  type: NotePanelPropsType;
}

const NotePanel: React.FunctionComponent<NotePanelProps> = ({
  type,
  children,
}) => (
  <NotePanelWrapper type={type}>
    <NotePanelContent>{children}</NotePanelContent>
  </NotePanelWrapper>
);

export default NotePanel;
