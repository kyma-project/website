import styled, { css } from "@styled";
import { PanelProps } from "./index";

const getColorFromType = (props: PanelProps) => {
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

export const PanelWrapper = styled.blockquote`
  margin-left: 0;
  margin-right: 0;
  padding: 16px;
  & > div > p > strong:first-child {
    color: ${(props: PanelProps) => getColorFromType(props)};
  }
  border-left: 3px solid ${(props: PanelProps) => getColorFromType(props)};
`;

export const PanelContent = styled.div`
  display: inline-block;
`;
