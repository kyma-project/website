import styled, { css } from "@styled";
import { NotePanelProps } from "./index";

const getColorFromType = (props: NotePanelProps) => {
  switch (props.type) {
    case "note":
      return css`
        ${data => data.theme.colors.background.third}
      `;
    case "tip":
      return css`
        ${data => data.theme.colors.border.tertiary}
      `;
    case "caution":
      return css`
        ${data => data.theme.colors.border.quaternary}
      `;
    default:
      return "unset";
  }
};

export const NotePanelWrapper = styled.blockquote`
  margin-left: 0;
  margin-right: 0;
  padding: 16px;
  border-left: 3px solid ${(props: NotePanelProps) => getColorFromType(props)};

  > div {
    width: 100%;
  }
`;

export const NotePanelContent = styled.div`
  display: inline-block;
  > p {
    margin-bottom: 5px;
  }
  > ul > li {
    margin-bottom: 3px;
  }
`;
