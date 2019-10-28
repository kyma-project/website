//////////////////////////
// Another important logic for modal is in /gatsby/browser-api/shouldUpdateScroll.
// Please add custom logic for every new view.
//////////////////////////

import React from "react";

import { DocsSpecificationModal } from "./docs-specification";
import { RoadmapModal } from "./roadmap";

type ModalRegex = Array<[RegExp, React.ElementType<any>]>;
const modalRegex: ModalRegex = [
  [/^\/(.*?)\/specifications/, DocsSpecificationModal],
  [/^\/roadmap/, RoadmapModal],
];

export function getProperModal(path: string): React.ElementType<any> | null {
  for (const [regex, Component] of modalRegex) {
    if (regex.test(path)) {
      return Component;
    }
  }
  return null;
}

export const ModalWrapper = (
  path: string,
  context: Record<string, any>,
): React.ReactNode => {
  const { modalContext, inModal } = context;
  if (!inModal) {
    return null;
  }

  const Modal = getProperModal(path);
  if (!Modal) {
    return null;
  }

  return <ModalComponent Modal={Modal} context={modalContext} />;
};

interface Props {
  Modal: React.ElementType;
  context: Record<string, any>;
}

const ModalComponent: React.FunctionComponent<Props> = ({ Modal, context }) => (
  <Modal {...context} />
);
