import React, { useContext } from "react";
import styled from "@styled";

import CopyToClipboard from "react-copy-to-clipboard";

import PopupState from "@common/state/usePopup";
import { injectIntl, IntlInterface } from "@common/i18n";

import Icon from "@components/shared/Icon";
import Tooltip from "@components/shared/Tooltip";

const CopyButtonWrapper = styled.div`
  user-select: none;
  position: absolute;
  top: -10px;
  right: -10px;
`;

const StyledIcon = styled(Icon)`
  cursor: copy;
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

const CopyButton: React.FunctionComponent<IntlInterface & CopyButtonProps> = ({
  code,
  className = "",
  formatMessage,
}) => {
  const { setPopup } = useContext(PopupState.Context);

  return (
    <CopyButtonWrapper className={className}>
      <Tooltip
        content={formatMessage({ id: "copyButtonTooltip" })}
        placement="bottom"
      >
        <CopyToClipboard
          text={code}
          onCopy={() => {
            setPopup(formatMessage({ id: "copyPopup" }));
          }}
        >
          <span>
            <StyledIcon iconName="copy" iconPrefix="far" />
          </span>
        </CopyToClipboard>
      </Tooltip>
    </CopyButtonWrapper>
  );
};

export default injectIntl("utils")(CopyButton);
