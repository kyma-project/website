import styled, { css } from "@styled";
import { PanelProps } from "./index";

export const PanelWrapper = styled.blockquote`
  margin-left: 0;
  margin-right: 0;
  padding: 16px;
  border-left: 3px solid
    ${(props: PanelProps) => {
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
          return css`
            ${data => data.theme.colors.border.primary}
          `;
      }
    }};
`;

export const PanelContent = styled.div`
  display: inline-block;
`;
