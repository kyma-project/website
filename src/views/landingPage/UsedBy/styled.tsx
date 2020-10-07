import styled from "@styled";

interface HeaderWrapperProps {
  marginBottom?: number;
}

export const HeaderWrapper = styled.div<HeaderWrapperProps>`
  margin-bottom: ${props => props.marginBottom || 75}px;
  & > h2 {
    font-size: 40px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    margin: 0 0 40px;
  }

  & > h2,
  p {
    text-align: center;
    color: white;
  }
`;
