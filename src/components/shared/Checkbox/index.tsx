import React from "react";

import {
  CheckboxContainer,
  HiddenCheckbox,
  StyledCheckbox,
  Icon,
} from "./styled";

interface Props {
  className?: string;
  checked?: boolean;
  onChange: () => void;
  onClick: () => void;
}

const Checkbox: React.FunctionComponent<Props> = ({
  className = "",
  checked = false,
  ...props
}) => (
  <CheckboxContainer className={className}>
    <HiddenCheckbox checked={checked} {...props} />
    <StyledCheckbox checked={checked}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
);

export default Checkbox;
