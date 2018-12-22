import styled from "styled-components";
import { DOCS_RESPONSIVE_BREAKPOINT } from "../../../constants/docs";

export const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin: 0 0 20px 0;
  text-align: left;
`;

export const Anchor = styled.a`
  display: block;
  height: 0;
  overflow: none;
  visibility: hidden;
`;

export const Header = styled.h1`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 16px;
  line-height: 1.25;
  padding-bottom: 0.3em;
  margin-top: 0;
  color: #0b74de;

  @media (max-width: ${DOCS_RESPONSIVE_BREAKPOINT}px) {
    padding-top: 40px;
  }
`;

export const ContentHeader = styled.header`
  box-sizing: border-box;
  width: 100%;
  border-bottom: 1px solid #e5e5e5;
  margin: 0 0 40px;

  @media (max-width: ${DOCS_RESPONSIVE_BREAKPOINT}px) {
    margin-bottom: 0;
  }
`;

export const ContentH1 = styled.h1`
  box-sizing: border-box;
  width: auto;
  font-size: 40px;
  font-weight: 600;
  line-height: 1.3em;
  padding-bottom: 0.65em;
  margin: 0;

  &:first-letter {
    text-transform: uppercase;
  }

  @media (max-width: ${DOCS_RESPONSIVE_BREAKPOINT}px) {
    padding-top: 32px;
  }
`;

export const ContentDescription = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin: 0;

  > div {
    padding: 40px 0;
    border-bottom: 1px solid #e5e5e5;

    @media (max-width: ${DOCS_RESPONSIVE_BREAKPOINT}px) {
      padding: 0 0 40px 0;
    }

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 0;
      border-bottom: none;
    }
  }
`;
