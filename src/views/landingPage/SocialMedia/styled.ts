import styled from "@styled";

export const SocialMediaWrapper = styled.section`
  margin: 50px 0;
`;

export const YouTubeFrameWrapper = styled.div`
  &&&&& {
    > div {
      position: relative;
      height: 0;
      overflow: hidden;
      max-width: 100%;
      padding-bottom: 56.25%;

      > iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
`;
