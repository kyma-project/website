import styled from "@styled";

/* DocsContent */
export const DocsContentWrapper = styled.div``;

export const DocsContentHeader = styled.header`
  border-bottom: 1px solid #e5e5e5;
`;

export const DocsContentAnchor = styled.a``;

export const DocsContentDocsWrapper = styled.article``;

export const DocsContentDocWrapper = styled.section`
  padding: 40px 0px;
  border-bottom: 1px solid #e5e5e5;

  &:last-child {
    border-bottom: none;
  }

  *:last-child {
    margin-bottom: 0;
  }
`;

export const DocsContentDocHeader = styled.header`
  h3 {
    color: #0073e6;
    font-weight: ${props => props.theme.fontWeight.light};
  }
`;
