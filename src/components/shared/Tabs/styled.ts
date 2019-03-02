import styled from "@styled";

export const TabsWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: 0;
  font-family: "72";
  font-weight: normal;
`;

export const TabsHeader = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 5px;
  display: flex;
  justify-items: flex-start;
  flex-flow: row nowrap;
`;

export const TabsContent = styled.div`
  margin: 20px;
  font-size: 14px;
  color: #515559;
  line-height: 1.57;
`;

export const TabWrapper = styled.li``;

interface TabLinkProps {
  active?: boolean;
}

export const TabLink = styled.div`
  display: flex;
  align-items: center;
  margin: 0 15px;
  padding: 19px 0 15px;
  border: none;
  position: relative;
  color: ${(props: TabLinkProps) => (props.active ? "#c3e88d" : "#f77669")};
  font-size: 14px;
  outline: none;
  transition: 0.2s color linear;
  text-transform: uppercase;
  cursor: pointer;
  &:first-letter {
    text-transform: uppercase;
  }
  &:after {
    content: "";
    bottom: 0;
    display: block;
    position: absolute;
    height: ${props => (props.active ? "3px" : "0px")};
    width: 100%;
    border-radius: 2px;
    background-color: #c3e88d;
  }
  &:hover {
    color: #c3e88d;
    &:after {
      content: "";
      bottom: 0;
      display: block;
      position: absolute;
      height: 3px;
      width: 100%;
      border-radius: 2px;
      background-color: #c3e88d;
    }
  }
`;
