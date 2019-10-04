import React from "react";
import { useLocation } from "react-use";
import { navigate } from "gatsby";
import qs from "qs";

import { ModalHeader } from "./Header";
import { ModalContent } from "./Content";

import Modal from "@components/shared/Modal";

import { RoadmapModalContext } from "@typings/roadmap";

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

  const modalHeader = <ModalHeader ticket={ticket} />;

  return (
    <Modal
      openComponent={null}
      header={modalHeader}
      show={true}
      onRequestClose={getExitLocation}
    >
      <ModalContent body={ticket.body} />
    </Modal>
  );
};
