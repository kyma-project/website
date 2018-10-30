import styled from "styled-components";
import colors from "../../../config/colors";
export const Wrapper = styled.section`
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  background-color: ${colors.blue};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InnerWrapper = styled.div`
  padding: 0 30px;
  @media (max-width: 736px) {
    padding: 0 15px;
  }
  ${props => props.height && `min-height: ${props.height}px;`};
  width: 1200px;
  max-width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  position: relative;
`;

export const ContentWrapper = styled.div`
  z-index: ${props => (props.active ? "10" : "1")};
  opacity: ${props => (props.active ? "1" : "0")};
  position: absolute;
  left: ${props => (props.multipleSlides ? "45px" : "15px")};
  @media (max-width: 736px) {
    left: ${props => (props.multipleSlides ? "25px" : "0px")};
  }
  display: flex;
  justify-content: left;
  align-content: center;
  align-items: center;
  text-align: center;
  transition: opacity 0.2s ease-out;
`;

export const Text = styled.p`
  display: block;
  padding-left: 10px;
  && {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  text-align: left;
  padding-right: 10px;
  font-family: Poppins;
  font-size: 16px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.63;
  letter-spacing: normal;
  text-decoration: none;
  color: #fff;
`;
export const Link = Text.extend`
  text-decoration: underline; /*todo - ask lukasz*/
`.withComponent("a");

export const CircleWrapper = styled.section`
  min-height: 45px;
  min-width: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const Circle = styled.div`
  height: 8px;
  width: 8px;
  margin-top: 4px;
  margin-bottom: 4px;
  border-radius: 50%;
  background-color: ${colors.lightBlue};
  ${props => props.active && `background-color: ${colors.green};`};
  transition: opacity 0.2s ease-out;
  &:hover {
    cursor: pointer;
  }
`;

export const Icon = styled.img`
  max-width: 30px;
  width: 100%;
  max-height: 45px;
  object-fit: fill;
  display: block;
  margin: 10px 0 10px 5px;
`;
