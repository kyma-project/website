import styled from "@styled";
import { customScrollBar } from "@styled/mixins";

export const TabsWrapper = styled.div`
  &&& {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    margin: 16px 0;
    border: 1px solid rgb(229, 229, 229);
    background: #fff;
    border-radius: 4px;
  }
`;

export const TabsHeader = styled.ul`
  &&& {
    list-style: none !important;
    padding: 0;
    margin: 0 !important;
    display: flex;
    border-bottom: 1px solid rgb(229, 229, 229);
    flex-flow: row nowrap;
    white-space: nowrap;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;

    ${customScrollBar({})}
  }
`;

export const TabsContent = styled.div`
  && {
    margin: 16px;
    margin-bottom: 16px !important;
  }
`;

export const TabWrapper = styled.li`
  margin-bottom: 0;
`;

interface TabLinkProps {
  active?: boolean;
}

export const TabLink = styled.div`
  display: flex;
  align-items: center;
  margin: 0 8px 0 0;
  padding: 10px 0;
  border: none;
  position: relative;
  color: ${(props: TabLinkProps) => (props.active ? "#0B74DE" : "#485766")};
  outline: none;
  transition: 0.2s all ease-in-out;
  cursor: pointer;
  &:first-letter {
    text-transform: uppercase;
  }
  &:first-child {
    margin-left: 16px;
  }
  &:after {
    content: "";
    bottom: 0;
    display: block;
    position: absolute;
    height: ${props => (props.active ? "3px" : "0px")};
    width: 100%;
    background-color: #0b74de;
  }
  &:hover {
    color: #0b74de;
    &:after {
      content: "";
      bottom: 0;
      display: block;
      position: absolute;
      height: 3px;
      width: 100%;
      background-color: #0b74de;
    }
  }
`;
