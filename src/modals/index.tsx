//////////////////////////
// Another important logic for modal is in /gatsby/browser-api/shouldUpdateScroll.
// Please add custom logic for every new view.
//////////////////////////

import React from "react";
import { useLockBodyScroll } from "react-use";

import { RoadmapModal } from "./roadmap";

type ModalRegex = Array<[RegExp, React.ElementType<any>]>;
const modalRegex: ModalRegex = [[/^\/roadmap/, RoadmapModal]];

export function checkModal(path: string): React.ElementType<any> | null {
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

  const Modal = checkModal(path);
  if (!Modal) {
    return null;
  }

  return <ModalComponent Modal={Modal} context={modalContext} />;
};

interface Props {
  Modal: React.ElementType;
  context: Record<string, any>;
}

const ModalComponent: React.FunctionComponent<Props> = ({ Modal, context }) => {
  useLockBodyScroll();
  return <Modal {...context} />;
};
