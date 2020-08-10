import styled, { media } from "@styled";

export const DropDownWrapper = styled.div`
  position: relative;
  text-align: center;
  z-index: 1;

  &:after {
    content: "";
    width: 100%;
    position: absolute;
    top: 50%;
    left: 0;
    z-index: -1;
  }
`;

export const DropdownDropElementWrapper = styled.div`
  position: relative;
  text-align: left;
  padding-top: 16px;

  &&& {
    ${media.largeTablet`
      padding-top: 0px;
      margin-bottom: 18px;
    `}
  }
`;

export const DropdownActionElementWrapper = styled.div`
  display: inline-block;
`;

interface DropdownListWrapperProps {
  active?: boolean;
}

export const DropdownListWrapper = styled.div<DropdownListWrapperProps>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  width: 160px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 26px 0 rgba(11, 116, 222, 0.2);
  padding: 12px;
  max-height: 700px;
  visibility: ${props => (props.active ? "visible" : "hidden")};

  &:before {
    content: "";
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 12px solid #fff;
  }

  ${media.largeTablet`
    position: relative;
    visibility: visible;
    width: 100%;
    background-color: transparent;
    box-shadow: none;
    border: 2px solid #fff;
    padding: 12px 0;

    &:before {
      display: none;
    }
  `}
`;

export const DropdownList = styled.ul`
  margin: 0;
`;

export const DropdownListItem = styled.li`
  padding: 12px 0;
  margin: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #485766;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }

  > label {
    display: flex;
    cursor: pointer;

    > div {
      position: relative;
      margin-left: auto;
      order: 2;

      > div {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      }
    }
  }

  ${media.largeTablet`
    border-bottom: 2px solid #fff;

    a {
      color: #fff;
      font-size: 18px;
      font-weight: 500;
    }
  `}
`;
