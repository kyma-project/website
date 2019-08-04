import styled, { ThemeProps } from "@styled";
import { customScrollBar } from "@styled/mixins";

import Paragraph from "@components/shared/Paragraph";

export const Wrapper = styled.section`
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  background-color: ${props => props.theme.colors.background.third};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 150;
`;

export const InnerWrapper = styled.div`
  position: relative;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 6px 30px;
  height: 48px;
  min-height: 48px;
  flex-flow: row nowrap;
  white-space: nowrap;
  overflow-y: hidden;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 736px) {
    padding: 6px 15px;
  }

  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    rgb(102, 51, 153) 1rem,
    rgb(102, 51, 153) 96%,
    transparent
  );
`;

interface ContentWrapperProps {
  active?: boolean;
  multipleSlides?: boolean;
}

export const ContentWrapper = styled.div`
  z-index: ${(props: ContentWrapperProps) => (props.active ? "10" : "1")};
  opacity: ${props => (props.active ? "1" : "0")};
  position: absolute;
  display: flex;
  justify-content: left;
  align-content: center;
  align-items: center;
  text-align: center;
  transition: opacity 0.2s ease-out;
  left: ${props => (props.multipleSlides ? "45px" : "20px")};

  @media (max-width: 736px) {
    left: ${props => (props.multipleSlides ? "25px" : "10px")};
  }
`;

export const Text = styled.p`
  display: inline-block;
  text-align: left;
  padding: 0 10px;
  font-family: Poppins;
  font-size: 14px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.63;
  letter-spacing: normal;
  text-decoration: none;
  color: #fff;
  margin: 20px 0;

  a {
    color: #fff;
    text-decoration: underline;
    margin-left: 16px;
  }

  @media (min-width: 737px) {
    margin: 20px 0;
    font-size: 16px;
  }
`;

export const CircleWrapper = styled.section`
  position: absolute;
  top: 50%;
  left: 30px;
  min-width: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  z-index: 155;
  transform: translateY(-50%);

  @media (max-width: 736px) {
    left: 15px;
  }
`;

type CircleProps = ThemeProps<{
  active?: boolean;
}>;

export const Circle = styled.div`
  height: 8px;
  width: 8px;
  margin-top: 4px;
  margin-bottom: 4px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.background.secondary};
  ${(props: CircleProps) =>
    props.active &&
    `background-color: ${props.theme.colors.background.sixth};`};
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
