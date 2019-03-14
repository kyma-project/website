import React from "react";
import NotePanel, { NotePanelPropsType } from "@components/shared/NotePanel";

export const BlockQuote: React.FunctionComponent = ({ children }) => {
  const getPanelType = (child: any): NotePanelPropsType => {
    const type =
      child &&
      child.props &&
      child.props.children &&
      child.props.children[0] &&
      child.props.children[0].props.children[0] &&
      child.props.children[0].props.children[0].props &&
      child.props.children[0].props.children[0].props.value;

    return type && type.replace(":", "").toLowerCase();
  };

  const createPanels = (elem: any) =>
    elem.map((child: any, index: number) => (
      <NotePanel type={getPanelType(child)} key={index}>
        {child}
      </NotePanel>
    ));

  return children ? <>{createPanels(children)}</> : null;
};
