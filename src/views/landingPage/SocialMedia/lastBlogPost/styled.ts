import styled from "@styled";

export const LastBlogPostWrapper = styled.div`
  &&&&& {
    background: #fff;
    border-radius: 5px;
    padding: 16px;
    box-shadow: 0 1px 26px 0 rgba(137, 165, 199, 0.42);

    button {
      font-size: 14px;
      line-height: 32px;
    }
  }
`;

export const LastBlogPostHeaderWrapper = styled.header`
  margin: 0 0 16px 0;

  h2 {
    font-size: 28px;
    margin-bottom: 0px;
    color: rgb(72, 87, 102);
    transition: color 0.2s ease-in-out;

    &:hover {
      color: rgb(11, 116, 222);
    }
  }
`;

export const LastBlogPostMetadata = styled.p`
  margin-bottom: 0;
  display: inline-block;
  text-align: left;
  font-size: 14px;
`;
