import styled from "@styled";

interface ParagraphProps {
  marginTop?: string;
  inline?: boolean;
  justify?: boolean;
}

export default styled.p<ParagraphProps>`
  ${props => props.justify && "text-align: justify;"};
  margin-top: ${props => (props.marginTop ? props.marginTop : "unset")};
  display: ${props => (props.inline ? "inline" : "block")};
`;
