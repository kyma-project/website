import styled, { media } from "@styled";

interface MobileNavIconProps {
  orientation: string;
  showMobileLeftNav?: boolean;
  showMobileRightNav?: boolean;
}

export const MobileNavIcon = styled.div<MobileNavIconProps>`
  box-shadow: 0 1px 26px 0 rgba(137, 165, 199, 0.42);
  background: #fff;
  bottom: 1.5rem;
  /* box-shadow: rgba(46, 41, 51, 0.08) 0px 4px 16px, rgba(71, 63, 79, 0.16) 0px 8px 24px; */
  cursor: pointer;
  display: none;
  height: 3.5rem;
  justify-content: space-around;
  position: fixed;
  ${props => {
    if (props.orientation === "left") {
      if (props.showMobileLeftNav) {
        return `left: 16.5rem`;
      }
      if (props.showMobileRightNav) {
        return `left: -5rem`;
      }
      return `left: 1.5rem`;
    }
    if (props.showMobileRightNav) {
      return `right: 16.5rem`;
    }
    if (props.showMobileLeftNav) {
      return `right: -5rem`;
    }
    return `right: 1.5rem`;
  }}
  visibility: visible;
  width: 3.5rem;
  z-index: 200;
  border-radius: 50%;
  transition: all 350ms cubic-bezier(0.4, 0, 0.2, 1) 0s;

  ${media.tablet<MobileNavIconProps>`
    ${props => (props.orientation === "left" ? `display: flex` : ``)};
  `};

  ${media.phone`
    display: flex;
  `};

  ${media.phone`
    width: 52px;
    height: 52px;
  `};

  > svg {
    color: #0b74de;
    font-size: 32px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);

    ${media.phone`
      font-size: 28px;
    `};
  }
`;
