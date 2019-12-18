import React, { useEffect } from "react";
import { useLocation } from "react-use";
import { navigate } from "gatsby";

import { ModalHeader } from "./Header";
import { ModalContent } from "./Content";

import Modal from "@components/shared/Modal";

import { DocsModalContext } from "@typings/docs";

export const DocsSpecificationModal: React.FunctionComponent<DocsModalContext> = ({
  specification,
  specifications,
}) => {
  const { pathname, state } = useLocation();

  useEffect(() => {
    if (!state) {
      return;
    }

    const { scrollPosition } = state;
    if (typeof scrollPosition !== "number") {
      return;
    }

    window.scrollTo(0, scrollPosition + 1);
  }, []);

  if (!specification) {
    return null;
  }

  const getExitLocation = () => {
    if (!pathname) {
      navigate(`/docs/`);
      return;
    }

    const docsComponentURL = pathname.split("specifications");
    if (!docsComponentURL || !docsComponentURL.length) {
      navigate(`/docs/`);
      return;
    }

    const docsComponentPart = docsComponentURL[0];
    navigate(docsComponentPart);

    if (!state) {
      return;
    }

    const { scrollPosition } = state;
    if (typeof scrollPosition !== "number") {
      return;
    }

    window.scrollTo(0, scrollPosition - 1);
  };

  const modalHeader = (
    <ModalHeader
      specification={specification}
      specifications={specifications}
    />
  );

  return (
    <Modal
      openComponent={null}
      header={modalHeader}
      show={true}
      onRequestClose={getExitLocation}
    >
      <ModalContent specification={specification} />
    </Modal>
  );
};
