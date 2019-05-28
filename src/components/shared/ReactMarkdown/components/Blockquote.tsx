import React from "react";
import NotePanel, { NotePanelPropsType } from "@components/shared/NotePanel";
import has from "lodash/has";
export const BlockQuote: React.FunctionComponent = ({ children }) => {
  const getPanelType = (child: any): NotePanelPropsType => {
    const type =
      has(child, "props.children[0].props.children[0].props") &&
      child.props.children[0].props.children[0].props.value;
    return type && type.replace(":", "").toLowerCase();
  };

  const createPanels = (elem: any) => {
    if (!elem) {
      return null;
    }
    return elem.map((element: React.ReactChild[], index: number) => (
      <NotePanel type={getPanelType(element[0])} key={index}>
        {element}
      </NotePanel>
    ));
  };

  const panelTypes = ["note", "caution", "tip"];
  const isOneOfTypes = (arg?: string) => !!arg && panelTypes.includes(arg);

  const modifiedChildren =
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
