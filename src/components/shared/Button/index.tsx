import React from "react";
import styled from "@styled";

import Icon from "@components/shared/Icon";

interface ButtonProps {
  iconName?: string;
  iconPrefix?: string;
  size?: "sm" | "md";
  iconAlign?: "right" | "left";
  reference?: any;
  [key: string]: any;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  iconName,
  iconPrefix,
  size = "md",
  iconAlign = "left",
  children,
  reference,
  ...otherProps
}) => (
  <button {...otherProps} ref={reference}>
    {iconAlign === "left" && iconName ? (
      <Icon iconName={iconName} iconPrefix={iconPrefix} />
    ) : null}
    {children}
    {iconAlign === "right" && iconName ? (
      <Icon iconName={iconName} iconPrefix={iconPrefix} />
    ) : null}
  </button>
);

const buttonSizes = {
  borderRadius: {
    sm: "25px",
    md: "25px",
  },
  padding: {
    sm: "0 14px",
    md: "0 18px",
  },
  lineHeight: {
    sm: "40px",
    md: "46px",
  },
};

export const ButtonDefault = styled(Button)`
  border-radius: ${(props: ButtonProps) =>
    props.size
      ? buttonSizes.borderRadius[props.size]
      : buttonSizes.borderRadius.md};
  font-size: 18px;
  font-weight: 500;
  padding: ${(props: ButtonProps) =>
    props.size ? buttonSizes.padding[props.size] : buttonSizes.padding.md};
  line-height: ${(props: ButtonProps) =>
    props.size
      ? buttonSizes.lineHeight[props.size]
      : buttonSizes.lineHeight.md};
  background-color: transparent;
  transition: background-color ease-out 0.2s;
  text-decoration: none;
  cursor: pointer;

  a {
    box-shadow: none;
  }

  &:active,
  &:focus,
  &:hover {
    outline: none;
  }

  > svg {
    font-size: 25px;
    margin-right: ${(props: ButtonProps) =>
      !props.iconAlign || props.iconAlign === "left" ? "8px" : "0"};
    margin-left: ${(props: ButtonProps) =>
      props.iconAlign === "right" ? "8px" : "0"};
    position: relative;
    top: 3px;
  }
`;

export const ButtonNormal = styled(ButtonDefault)`
  border: 2px solid #2852c7;
  color: #2852c7;

  &:active,
  &:focus,
  &:hover {
    color: #fff;
    background-color: rgba(40, 82, 199, 0.9);
  }
`;

export const ButtonEmphasized = styled(ButtonDefault)`
  border: 2px solid #0077e1;
  background-color: #0077e1;
  color: #fff;

  &:active,
  &:focus,
  &:hover {
    border: 2px solid #005fb3;
    background-color: #005fb3;
  }
`;

export const ButtonLight = styled(ButtonDefault)`
  border: 2px solid #fff;
  color: #fff;

  a {
    color: #fff;
  }

  &:active,
  &:focus,
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export default {
  Default: ButtonDefault,
  Normal: ButtonNormal,
  Emphasized: ButtonEmphasized,
  Light: ButtonLight,
};
