import styled from "styled-components";

export const DocsLayoutWrapper = styled.div`
  width: 100%;
  margin-top: 72px;

  &&& {
    .grid-container {
      padding: 15px;
    }

    .grid-unit-content {
      padding: 0 32px;
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

    .community-introduction {
      img {
        margin: 0;
        margin-top: 48px;
      }

      h1 {
        margin: 0;
        margin-top: 48px;

        span {
          line-height: 100px;
          margin-left: 16px;
        }
      }

      br {
        height: 0;
        width: 0;
        display: none;
      }

      p[align="left"] {
        margin: 0;
      }
    }
  }
`;
