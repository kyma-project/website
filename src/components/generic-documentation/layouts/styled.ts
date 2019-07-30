import styled, { media } from "@styled";

export const DocsLayoutWrapper = styled.div`
  width: 100%;

  &&& {
    .grid-container {
      padding: 15px;
    }

    .grid-unit-content {
      padding: 0 32px;
    }

    .grid-unit-navigation {
      ${media.tablet`
        /* Fix strange behavior of grid unit */
        flex: 0 0 0;
        max-width: 0;
      `};
    }
  }
`;

export const CommunityLayoutWrapper = styled.div`
  width: 100%;
  margin-top: 72px;

  &&& {
    .grid-container {
      padding: 15px;
    }

    .grid-unit-content {
      padding: 0 32px;
    }

    .grid-unit-navigation {
      ${media.tablet`
        /* Fix strange behavior of grid unit */
        flex: 0 0 0;
        max-width: 0;
      `};
    }

    .hash-link > div {
      position: relative;
      width: 100%;

      > h1 {
        margin: 76px 0 0 0;

        img {
          margin: 0;
        }

        span {
          margin-left: 24px;
          display: inline-block;
        }
      }
    }
  }
`;

export const TitleHeader = styled.h1`
  &&&&& {
    box-sizing: border-box;
    font-size: 40px;
    font-weight: 600;
    margin: 0;
    padding-top: 16px;
  }
`;
