import React, { useContext } from "react";
import styled, { css } from "@styled";

import { PopupState } from "@common/state";

interface PopupWrapperProps {
  visible?: boolean;
}

const PopupWrapper = styled.div`
  cursor: pointer;
  position: fixed;
  bottom: -100px;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 16px;
  font-size: ${props => props.theme.fontSize.xs};
  border-radius: 4px;
  color: #fff;
  background-color: #0077e1;
  transition: all 0.2s ease-in-out;
  z-index: 300;

  ${(props: PopupWrapperProps) =>
    props.visible
      ? css`
          bottom: 16px;
        `
      : css`
          bottom: -100px;
        `}

  &:hover {
    background-color: #005fb3;
  }
`;

const Popup: React.FunctionComponent = ({ children }) => {
  const { popup, popupVisible, onDismissPopup } = useContext(
    PopupState.Context,
  );

  return (
    <PopupWrapper onClick={onDismissPopup} visible={popupVisible}>
      {popup}
    </PopupWrapper>
  );
};

export default Popup;
