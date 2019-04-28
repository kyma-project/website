import styled from "@styled";

export const DropDownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownDropElementWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const DropdownActionElementWrapper = styled.div`
  display: inline-block;
`;

export const DropdownIcon = styled.div`
  position: relative;
  width: 67px;
  height: 67px;
  background: #fff;
  box-shadow: 0 1px 26px 0 rgba(137, 165, 199, 0.13);
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
  position: relative;
  left: 0;
  height: 100%;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 1px 26px 0 rgba(137, 165, 199, 0.13);
  background-color: #fff;
`;

export const DropdownList = styled.div`
  position: absolute;
`;

export const DropdownListItem = styled.div`
  padding: 0;
  font-size: 14px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #485766;
`;
