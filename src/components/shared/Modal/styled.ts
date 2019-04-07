import styled from "@styled";
import ReactModal from "react-modal";

export const StyledModal = styled(ReactModal)`
  position: absolute; 
  z-index: 300;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: 0;
  transform: translate(-50%, -50%);
  outline: none;
`;

export const CloseButton = styled.button`
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: normal;
  border: 0;
  padding: 0;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;

  position: fixed;
  top: 30px;
  right: 30px;
  z-index: 310;
  font-size: 28px;
  color: #fff;
  cursor: pointer;

  &:active,
  &:focus,
  &:hover {
    outline: none;
  }
`;
