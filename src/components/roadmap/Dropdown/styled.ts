import styled from "@styled";

export const DropDownWrapper = styled.div`
  position: relative;
  text-align: center;
`;

export const DropdownDropElementWrapper = styled.div`
  position: relative;
  text-align: left;
`;

export const DropdownActionElementWrapper = styled.div`
  display: inline-block;
`;

export const DropdownIcon = styled.div`
  position: relative;
  width: 67px;
  height: 67px;
  background: #fff;
  box-shadow: 0 2px 26px 0 rgba(11, 116, 222, 0.2);
  color: #0b74de;
  border-radius: 100%;
  cursor: pointer;

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
  /* overflow-y: scroll;
  -webkit-overflow-scrolling: touch; */

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
