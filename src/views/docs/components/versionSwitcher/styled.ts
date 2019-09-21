import styled, { media } from "@styled";

export const Wrapper = styled.div`
  box-sizing: border-box;
  display: block;
  width: 100%;
  max-width: 100%;

  ${media.tablet`
    margin-left: 16px;
  `}
`;

export const Label = styled.label`
  display: inline-block;
`;

export const SelectWrapper = styled.div`
  display: block;
  float: right;
  position: relative;
  cursor: pointer;

  &::after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-top: 5px solid #0b74de;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    right: 5px;
    top: 50%;
    position: absolute;
    transform: translateY(-50%);
    pointer-events: none;
  }

  ${media.tablet`
    margin-right: 16px;
  `}
`;

export const VersionSelect = styled.select`
  font-size: 16px;
  color: #0b74de;
  font-weight: 600;
  background: inherit;
  border: none;
  appearance: none;
  z-index: 100;
  cursor: pointer;
  font-family: system-ui;

  &::-ms-expand {
    display: none;
  }
`;
