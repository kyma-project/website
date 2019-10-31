import styled from "@styled";

interface ParagraphProps {
  inline?: boolean;
  justify?: boolean;
}

export default styled.p<ParagraphProps>`
  ${props => props.justify && "text-align: justify;"};
  display: ${props => (props.inline ? "inline" : "block")};
`;
