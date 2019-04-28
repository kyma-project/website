import styled from "@common/styled";

export const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

export const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;
// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
export const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

interface StyledCheckboxProps {
  checked?: boolean;
}

export const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${(props: StyledCheckboxProps) =>
    props.checked ? "#0b74de" : "#fff"};
  border-radius: 100%;
  box-shadow: 0 0 0 1px ${props => (props.checked ? "#0b74de" : "#ddd")};

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 2px #0b74de;
  }

  ${Icon} {
    visibility: ${props => (props.checked ? "visible" : "hidden")};
  }
`;
