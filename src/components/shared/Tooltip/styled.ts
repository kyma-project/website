import styled from "@styled";

interface TooltipContainerProps {
  placement?: "left" | "top" | "right" | "bottom";
  timeout?: number;
  show?: boolean;
  visible?: boolean;
}

export const TooltipContainer = styled.div`
  transition: all ${props => `${props.timeout}ms`} ease-in-out;
  visibility: ${(props: TooltipContainerProps) =>
    props.show ? "visible" : "hidden"};
  position: absolute;
  padding: 5px 7px;
  font-size: ${props => props.theme.fontSize.xs};
  color: #fff;
  background-color: #0077e1;
  box-shadow: 0 0 6px 0 rgba(137, 165, 199, 0.42);
  border-radius: 3px;
  font-size: 10px;
  font-family: Poppins;
  line-height: 10px;
  min-width: 80px;
  max-width: 260px;
  width: auto;
  text-align: center;
  ${props => (props.placement === "top" ? "bottom: 100%;" : "top: 100%")};
  right: 50%;
  transform: translateX(50%);
  opacity: ${props => (props.visible ? "1" : "0")};

  &:after {
    content: "";
    border: 6px solid;
    border-color: ${props =>
      props.placement && `transparent transparent #0077e1;`};
    right: 50%;
    transform: translateX(6px);
    margin-left: -10px;
    position: absolute;
    ${props =>
      props.placement === "top"
        ? "top: 100%; margin-top: -1px;"
        : "bottom: 100%; margin-bottom: -1px;"};
  }
`;

export const TooltipWrapper = styled.div`
  font-family: "72";
  position: relative;
  display: inline-block;
  z-index: 102;

  &:hover ${TooltipContainer} {
    visibility: visible;
    opacity: 1;
  }
`;
