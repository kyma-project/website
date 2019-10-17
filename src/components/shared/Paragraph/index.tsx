import styled from "@styled";

interface ParagraphProps {
  marginTop?: string;
  inline?: boolean;
}

export default styled.p<ParagraphProps>`
  margin-top: ${props => (props.marginTop ? props.marginTop : "unset")};
  display: ${props => (props.inline ? "inline" : "block")};
`;
