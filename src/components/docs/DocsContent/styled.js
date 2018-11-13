import styled from "styled-components";

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
  font-size: 34px;
  font-weight: 600;
  border-bottom: 1px solid #e5e5e5;
  margin-top: 36px;
  margin-bottom: 24px;
  font-weight: 600;
  line-height: 1.25;
  padding-bottom: 0.3em;
`;

export const ContentHeader = styled.h1`
  box-sizing: border-box;
  width: 100%;
  font-size: 40px;
  font-weight: 600;
  line-height: 1.3em;
  margin: 0 0 20px;
  &:first-letter {
    text-transform: uppercase;
  }
`;

export const ContentDescription = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin: 0;
`;
