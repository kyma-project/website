import React from "react";
import NotePanel, { PanelPropsType } from "@components/shared/NotePanel";

export const BlockQuote: React.FunctionComponent = ({ children }) => {
  const getPanelType = (child: any): PanelPropsType => {
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

  const createPanels = (elem: any) => {
    return elem.map((child: any, index: number) => {
      const typeOfPanel = getPanelType(child);
      return (
        <NotePanel type={typeOfPanel} key={index}>
          {child}
        </NotePanel>
      );
    });
  };

  return children ? <>{createPanels(children)}</> : null;
};
