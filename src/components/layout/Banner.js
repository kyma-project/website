import React from "react";
import styled from "styled-components";
import colors from "./../../config/colors";

class Banner extends React.Component {
  filterEventsFromData = arg => {
    return arg.filter(element => {
      const endDate = this.parseDate(element.endDate);
      const startDate = this.parseDate(element.startDate);
      const currentDate = Date.now();
      if (endDate && startDate) {
        return (
          startDate.getTime() < currentDate && currentDate < endDate.getTime()
        );
      }
      return false;
    });
  };
  parseDate = arg => {
    const splitDate = arg.split("-");
    if (splitDate.length === 3) {
      return new Date(`${splitDate[1]}-${splitDate[0]}-${splitDate[2]}`);
    }
    return null;
  };

  state = {
    slides: this.filterEventsFromData(this.props.slides),
    wrapperHeight: undefined,
    currentBanner: 0,
  };

  timerFunc = () =>
    setInterval(
      () =>
        this.setState(prevState => ({
          currentBanner:
            this.state.slides.length - 1 === prevState.currentBanner
              ? 0
              : prevState.currentBanner + 1,
        })),
      this.props.duration || 4000,
    );

  resetTimerTick = () => {
    clearInterval(this.timer);
    this.timer = this.timerFunc();
  };

  multipleSlides = () => this.state.slides.length > 1;

  componentDidMount = () => {
    if (this.multipleSlides()) {
      this.timer = this.timerFunc();
    }
    if (!this.state.wrapperHeight) {
      const maxElemHeight = Math.max(
        ...this.wrapper.map(element => element.clientHeight),
      );
      this.setState({ wrapperHeight: maxElemHeight });
    }
  };

  componentWillUnmount = () => {
    this.timer && clearInterval(this.timer);
  };

  render() {
    const { slides } = this.props;
    if (!slides || slides.length === 0) {
      return null;
    } else {
      return (
        <Wrapper>
          <InnerWrapper height={this.state.wrapperHeight}>
            {this.multipleSlides() && (
              <CircleWrapper>
                {this.state.slides.map((_, index) => (
                  <Circle
                    key={index}
                    active={index === this.state.currentBanner}
                    onClick={() => {
                      this.setState({
                        currentBanner: index,
                      });
                      this.resetTimerTick();
                    }}
                  />
                ))}
              </CircleWrapper>
            )}
            {this.state.slides.map((elem, index) => {
              let icon;
              if (elem.icon) {
                try {
                  icon = require(`${elem.icon}`);
                } catch (err) {
                  console.error(err);
                }
              }
              return (
                <ContentWrapper
                  multipleSlides={this.multipleSlides()}
                  innerRef={divElement =>
                    this.wrapper
                      ? (this.wrapper[index] = divElement)
                      : (this.wrapper = [divElement])
                  }
                  active={index === this.state.currentBanner}
                  key={index}
                >
                  {elem.icon && icon && <Icon src={icon} alt="Banner Icon" />}
                  {elem.text ? (
                    elem.url ? (
                      <Link
                        href={elem.url}
                        target={elem.external ? "_blank" : "_self"}
                      >
                        {elem.text}
                      </Link>
                    ) : (
                      <Text>{elem.text}</Text>
                    )
                  ) : (
                    <Text>{"Provide valid text for banner"}</Text>
                  )}
                </ContentWrapper>
              );
            })}
          </InnerWrapper>
        </Wrapper>
      );
    }
  }
}

export default Banner;

const Wrapper = styled.section`
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  background-color: ${colors.blue};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerWrapper = styled.div`
  padding: 0 30px;
  @media (max-width: 736px) {
    padding: 0 15px;
  }
  ${props => props.height && `min-height: ${props.height}px;`};
  width: 1200px;
  max-width: 1200px;
  display: flex;
  justify-content: left;
  align-items: center;
  position: relative;
`;

const ContentWrapper = styled.div`
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

const Text = styled.p`
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
const Link = Text.extend`
  text-decoration: underline; /*todo - ask lukasz*/
`.withComponent("a");

const CircleWrapper = styled.section`
  min-height: 45px;
  min-width: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Circle = styled.div`
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

const Icon = styled.img`
  max-width: 30px;
  width: 100%;
  max-height: 45px;
  object-fit: fill;
  display: block;
  margin: 10px 0 10px 5px;
`;
