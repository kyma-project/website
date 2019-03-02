import React, { useContext } from "react";
import styled from "@styled";

// @ts-ignore
import { CopyToClipboard } from "react-copy-to-clipboard";

import { PopupState } from "@common/state";

import Icon from "@components/shared/Icon";

const CopyButtonWrapper = styled.span``;

const StyledIcon = styled(Icon)`
  cursor: pointer;
  width: 28px;
  min-width: 28px;
  height: 28px;
  min-height: 28px;
  padding: 6px;
  border-radius: 100%;
  box-shadow: 0 0 6px 0 rgba(137, 165, 199, 0.42);
  background-color: #fff;
  color: #c9c9c9;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #0073e6;
  }
`;

interface CopyButtonProps {
  code: string;
  className?: string;
}

const CopyButton: React.FunctionComponent<CopyButtonProps> = ({
  code,
  className = "",
}) => {
  const { setPopup } = useContext(PopupState.Context);

  return (
    <CopyToClipboard
      text={code}
      onCopy={() => {
        setPopup("Copied to Clipboard");
      }}
    >
      <CopyButtonWrapper className={className}>
        <StyledIcon iconName="copy" iconPrefix="far" />
      </CopyButtonWrapper>
    </CopyToClipboard>
  );
};

export default CopyButton;
