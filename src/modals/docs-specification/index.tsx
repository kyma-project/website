import React, { useEffect } from "react";
import { useLocation } from "react-use";
import { navigate } from "gatsby";

import { ModalHeader } from "./Header";
import { ModalContent } from "./Content";

import { useScrollPosition } from "@common/hooks";

import { DocsModalContext } from "@typings/docs";

import { StyledModal, ContentWrapper } from "./styled";

export const DocsSpecificationModal: React.FunctionComponent<
  DocsModalContext
> = ({ specification, specifications }) => {
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

  const content = (
    <ContentWrapper>
      <ModalHeader
        specification={specification}
        specifications={specifications}
      />
      <ModalContent specification={specification} />
    </ContentWrapper>
  );

  return (
    <StyledModal
      openComponent={null}
      onRequestClose={getExitLocation}
      show={true}
    >
      {content}
    </StyledModal>
  );
};
