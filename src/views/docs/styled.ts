import styled, { media } from "@styled";
import Grid from "@styled/Grid";

export const Toolbar = styled.div`
  ${Grid.Container} {
    margin-top: 72px;
    border-bottom: 1px solid #e5e5e5;

    ${media.tablet`
      display: none;
    `}
  }

  ${Grid.Unit} {
    margin-bottom: 27px;
  }
`;
