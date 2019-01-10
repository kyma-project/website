import styled from "styled-components";
import { DOCS_RESPONSIVE_BREAKPOINT } from "../../../../constants/docs";

export const Icon = styled.img`
  width: 24px;
  height: 24px;
  position: absolute;
  left: 10px;
`;

export const ToggleSidebarButton = styled.button`
  position: relative;
  background-color: #fff;
  outline: none;
  border-radius: 3px;
  line-height: 24px;
  cursor: pointer;
  width: 100%;
  border: 0;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  padding: 10px;
  padding-left: 50px;
  appearance: none;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.25);
  display: none;
  margin: 0;
  font-size: 18px;

  @media (max-width: ${DOCS_RESPONSIVE_BREAKPOINT}px) {
    display: block;
  }
`;

export const SidebarWrapper = styled.div`
  display: ${props => (props.visible ? "block" : "none")};
  background: #fff;
  @media (max-width: ${DOCS_RESPONSIVE_BREAKPOINT}px) {
    height: calc(100vh - 46px);
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.3);
    padding: 0 20px;
  }
`;
