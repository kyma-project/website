import styled from "styled-components";
import { DOCS_RESPONSIVE_BREAKPOINT } from "../../../../constants/docs";

export const ColumnsWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const SideWrapper = styled.div`
  box-sizing: border-box;
  text-align: left;
  flex: 0 0 280px;
  flex-shrink: 0;
  margin-right: 20px;
  bottom: 0;
  z-index: 1;
  overflow: auto;
  transition: transform 0.2s ease-in-out;

  @media (max-width: ${DOCS_RESPONSIVE_BREAKPOINT}px) {
    flex-basis: 100%;
    margin: 30px 0 40px;
  }
`;

export const CenterSideWrapper = styled.div`
  box-sizing: border-box;
  flex: 1;
  flex-basis: 400px;
  overflow: auto;

  @media (max-width: ${DOCS_RESPONSIVE_BREAKPOINT}px) {
    padding: 0 20px;
  }
`;
