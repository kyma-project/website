import styled from "@styled";

export const SocialMediaWrapper = styled.section`
  margin: 50px 0;
`;

export const YouTubeFrameWrapper = styled.div`
  &&&&& {
    background: #fff;
    padding: 6px;
    box-shadow: 0 1px 26px 0 rgba(137, 165, 199, 0.42);
    border-radius: 5px;
    margin: 0;

    > div {
      position: relative;
      height: 0;
      overflow: hidden;
      max-width: 100%;
      padding-bottom: 56.25%;
      border-radius: 3px;

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

export const TwitterFrameWrapper = styled.div`
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 26px 0 rgba(137, 165, 199, 0.42);
`;

export const Header = styled.h3`
  font-size: 28px;
  margin-bottom: 0px;
  color: rgb(72, 87, 102);
  transition: color 0.2s ease-in-out;
`;
