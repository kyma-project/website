import styled from "styled-components";

export const MarkdownWrapper = styled.div`
  center {
    a {
      display: block;
    }
    li {
      list-style: none;
      padding: 5px;
    }
    ul {
      display: flex;
      justify-content: center;
    }
  }

  &&&&& {
    > div {
      display: flex;
      align-items: stretch;
    }

    .grid-container > div {
      width: 100%;
    }
  }
`;
