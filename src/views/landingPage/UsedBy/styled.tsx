import styled from "@styled";

interface HeaderWrapperProps {
  marginBottom?: number;
}

export const HeaderWrapper = styled.div<HeaderWrapperProps>`
  margin-bottom: ${props => props.marginBottom || 75}px;
  > h2,
  p {
    text-align: center;
    color: white;
  }
`;
