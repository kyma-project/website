import React from "react";
import { useLocation } from "react-use";
import { navigate } from "gatsby";
import qs from "qs";

import { ModalHeader } from "./Header";
import { ModalContent } from "./Content";

import { RoadmapModalContext } from "@typings/roadmap";

import { StyledModal, ContentWrapper } from "./styled";

export const RoadmapModal: React.FunctionComponent<RoadmapModalContext> = ({
  ticket,
}) => {
  const { state } = useLocation();
  if (!ticket) {
    return null;
  }

  const getExitLocation = () => {
    const condition = !!(
      state &&
      state.filters &&
      state.filters.capabilities &&
      Object.keys(state.filters.capabilities).length
    );

    if (!condition) {
      navigate(`/roadmap/`);
      return;
    }

    const queryString = qs.stringify({
      capabilities: state.filters.capabilities,
    });
    navigate(`/roadmap/?${queryString}`);
  };

  const content = (
    <ContentWrapper>
      <ModalHeader ticket={ticket} />
      <ModalContent body={ticket.body} />
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
