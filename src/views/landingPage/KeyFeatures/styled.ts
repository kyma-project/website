import styled, { media } from "@styled";

import Link from "@components/shared/Link";
import Paragraph from "@components/shared/Paragraph";
import Grid from "@styled/Grid";

import { linkEffect } from "@styled/mixins";

export const KeyFeaturesWrapper = styled.section`
  margin: 50px 0;
`;

export const KeyFeaturesSection = styled(Grid.Unit)`
  ${media.tablet`
    margin: 0 0 50px 0;
  `};
`;

export const KeyFeaturesParagraph = styled(Paragraph)`
  text-align: center;
`;

export const KeyFeaturesSvgWrap = styled.div`
  margin: 0 auto;
  text-align: center;
  margin-bottom: 32px;

  svg {
    max-width: 100%;

    ${media.smallPhone`
      & {
        justify-content: center;
        display: flex;
        flex-direction: column;
      }
    `};

    ${media.tablet`
      & {
        height: 23vw;
        max-height: 330px;
      }
    `};
  }
`;

export const KeyFeaturesLink = styled(Link.Internal)`
  ${linkEffect}
`;
