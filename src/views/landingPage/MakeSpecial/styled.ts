import styled, { media } from "@styled";
import Link from "@components/shared/Link";
import Grid from "@styled/Grid";

export const MakeSpecialWrapper = styled.section`
  position: relative;

  background-size: 100% 100%;
  min-height: 450px;
  z-index: 1;
  justify-content: center;
  flex-direction: column;
  display: flex;
  margin-top: 0;
  margin-bottom: 1.5%;

  ${media.tablet`
    padding: 50px 0 50px 0;
  `};
`;

interface GridProps {
  leftPadding?: number;
  rightPadding?: number;
}

export const StyledGridUnit = styled(Grid.Unit)<GridProps>`
  padding: 0
    ${(pro: any) => (pro.rightPadding ? pro.rightPadding + "px" : "15px")} 0
    ${(pro: any) => (pro.leftPadding ? pro.leftPadding + "px" : "15px")};
  ${media.tablet`
    padding: 0 15px;
  `};
`;

export const CenteredLink = styled(Link.Internal)`
  align-self: center;
`;
