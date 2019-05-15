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

  const createPanels = (elem: React.ReactChild[][]) =>
    elem.map((element: React.ReactChild[], index: number) => (
      <NotePanel type={getPanelType(element[0])} key={index}>
        {element}
      </NotePanel>
    ));

  const isOneOfTypes = (arg: string | undefined) =>
    !!arg && ["note", "caution", "tip"].includes(arg);

  const modifiedChildren =
    !!children &&
    Array.isArray(children) &&
    children.reduce((accumulator: any, curr: any) => {
      const currType = getPanelType(curr);
      if (isOneOfTypes(currType)) {
        return [...accumulator, [curr]];
      }
      const len = accumulator.length - 1;
      const newLastElement = [...accumulator[len], curr];
      return [...accumulator.slice(0, len), newLastElement];
    }, []);

  return modifiedChildren ? <>{createPanels(modifiedChildren)}</> : null;
};
