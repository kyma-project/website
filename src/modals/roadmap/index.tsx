import React from "react";
import { useLocation } from "react-use";
import { navigate } from "gatsby";
import qs from "qs";

import { ModalHeader } from "./Header";
import { ModalContent } from "./Content";

import { Ticket } from "@typings/roadmap";

import { StyledModal, ContentWrapper } from "./styled";

interface Props {
  ticket: Ticket;
}

export const RoadmapModal: React.FunctionComponent<Props> = ({ ticket }) => {
  const { state } = useLocation();

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
