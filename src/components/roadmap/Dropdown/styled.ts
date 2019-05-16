import styled from "@styled";

export const DropDownWrapper = styled.div`
  position: relative;
  text-align: center;
  z-index: 1;
  margin-top: 1.6rem;

  &:after {
    content: "";
    width: 100%;
    position: absolute;
    height: 1px;
    background: #d5dce3;
    top: 50%;
    left: 0;
    z-index: -1;
  }
`;

export const DropdownDropElementWrapper = styled.div`
  position: relative;
  text-align: left;
`;

export const DropdownActionElementWrapper = styled.div`
  display: inline-block;
`;

interface DropdownIconProps {
  capabilitiesDropOpen: boolean;
}

export const DropdownIcon = styled.div`
  position: relative;
  width: 67px;
  height: 67px;
  box-shadow: 0 2px 26px 0 rgba(11, 116, 222, 0.2);
  border-radius: 100%;
  transition: 0.3s all;
  cursor: pointer;

  background: #0b74de;
  color: #fff;

  ${(props: DropdownIconProps) =>
    props.capabilitiesDropOpen
      ? `
    background: #fff;
    color: #0b74de;
  `
      : `
    background: #0b74de;
    color: #fff;
  `}

  &:hover,
  &:focus,
  &:active {
    background: #fff;
    color: #0b74de;
  }

  > svg {
    font-size: 36px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
  }
`;

export const DropdownListWrapper = styled.div`
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  width: 320px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 26px 0 rgba(11, 116, 222, 0.2);
  padding: 26px;
  max-height: 700px;

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
`;

export const DropdownList = styled.ul`
  margin: 0;
`;

export const DropdownListItem = styled.li`
  padding: 16px 0;
  margin: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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
`;

export const DropdownListItemName = styled.span`
  line-height: 1.43;
`;
