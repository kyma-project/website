import React from "react";
import styled from "styled-components";
import data from "./data.json";
import colors from "./../../config/colors";

const tryRequire = path => {
  try {
    return require(`${path}`);
  } catch (err) {
    return null;
  }
};

const ANIMATION_DURATION = 4000;

function filterEventsFromData(arg) {
  return arg.filter(element => {
    const endDate = parseDate(element.endDate);
    const startDate = parseDate(element.startDate);
    return (
      startDate.getTime() < new Date().getTime() &&
      new Date().getTime() < endDate.getTime()
    );
  });
}

function parseDate(arg) {
  const splitDate = arg.split("-");
  return new Date(`${splitDate[1]}-${splitDate[0]}-${splitDate[2]}`);
}

const initialValueOfData = filterEventsFromData(data);
// const iconsArray = initialValueOfData.map(element => tryRequire(element.icon));
class Banner extends React.Component {
  state = {
    dataSource: initialValueOfData,
    wrapperHeight: undefined,
    activeBanner: 0,
  };

  isThereMoreThenOneText = () => this.state.dataSource.length > 1;

  timerFunc = () =>
    setInterval(
      () =>
        this.setState(prevState => ({
          activeBanner:
            this.state.dataSource.length - 1 === prevState.activeBanner
              ? 0
              : prevState.activeBanner + 1,
        })),
      ANIMATION_DURATION,
    );

  resetTimerTick = () => {
    clearInterval(this.timer);
    this.timer = this.timerFunc();
  };

  componentDidMount = () => {
    if (this.isThereMoreThenOneText()) {
      this.timer = this.timerFunc();
    }
    if (!this.state.wrapperHeight) {
      const maxElemHeight = Math.max(
        ...this.wrapper.map(element => Number(element.clientHeight)),
      );
      this.setState({ wrapperHeight: maxElemHeight });
    }
  };

  componentWillUnmount = () => {
    this.timer && clearInterval(this.timer);
  };

  render() {
    return (
      <Wrapper>
        <InnerWrapper height={this.state.wrapperHeight}>
          {this.isThereMoreThenOneText() && (
            <DotsWrapper>
              {this.state.dataSource.map((_, index) => (
                <Dot
                  key={index}
                  active={index === this.state.activeBanner}
                  onClick={() => {
                    this.setState({
                      activeBanner: index,
                    });
                    this.resetTimerTick();
                  }}
                />
              ))}
            </DotsWrapper>
          )}

          {this.state.dataSource.map((elem, index) => (
            <ContentWrapper
              multipleTexts={this.isThereMoreThenOneText()}
              innerRef={divElement =>
                this.wrapper
                  ? (this.wrapper[index] = divElement)
                  : (this.wrapper = [divElement])
              }
              zIndex={index === this.state.activeBanner ? index + 10 : index}
              active={index === this.state.activeBanner}
              key={index}
            >
              {elem.icon && (
                <Icon src={tryRequire(elem.icon)} alt="Banner Icon" />
              )}
              {elem.url ? (
                <Link href={elem.url} target="_blank">
                  {elem.text}
                </Link>
              ) : (
                <Text>{elem.text}</Text>
              )}
            </ContentWrapper>
          ))}
        </InnerWrapper>
      </Wrapper>
    );
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
  padding-left: 15px;
  ${props => props.height && `min-height: ${props.height}px;`};
  width: 1200px;
  max-width: 1200px;
  display: flex;
  justify-content: left;
  align-items: center;
  position: relative;
`;

const ContentWrapper = styled.div`
  z-index: ${props => props.zIndex + 20};
  position: absolute;
  left: ${props => (props.multipleTexts ? "50px" : "20px")};
  display: flex;
  justify-content: left;
  align-content: center;
  align-items: center;
  text-align: center;
  transition: opacity 0.5s ease-out;
  opacity: 0;
  ${props => props.active && `opacity:1`};
`;

const Text = styled.p`
  display: block;
  margin-left: 15px;
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
  text-decoration: underline;
`.withComponent("a");

const DotsWrapper = styled.section`
  min-height: 45px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 25px;
  min-width: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const transitionDuration = `${ANIMATION_DURATION / 6000}s`;

const Dot = styled.div`
  height: 8px;
  width: 8px;
  margin-top: 4px;
  margin-bottom: 4px;
  border-radius: 50%;
  background-color: ${colors.lightBlue};
  ${props => props.active && `background-color: ${colors.green};`};
  transition: ${transitionDuration};
  &:hover {
    cursor: pointer;
  }
`;

const Icon = styled.img`
  width: 30px;
  min-width: 30px;
  height: 45px;
  object-fit: fill;
  display: block;
  margin-left: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 0;
`;
