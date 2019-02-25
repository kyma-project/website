import styled from "@styled";

interface HProps {
  center?: boolean;
}

export default styled.h1`
  text-align: ${(props: HProps) => (props.center ? "center" : "left")};
`;
