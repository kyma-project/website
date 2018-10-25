import React from "react";
import styled, { keyframes } from "styled-components";
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
  const filtered = arg.filter(element => {
    const endDate = parseDate(element.endDate);
    const startDate = parseDate(element.startDate);
    return (
      startDate.getTime() < new Date().getTime() &&
      new Date().getTime() < endDate.getTime()
    );
  });
  return filtered.sort((a, b) => a.text.length < b.text.length);
}

function parseDate(arg) {
  const splitDate = arg.split("-");
  return new Date(`${splitDate[1]}-${splitDate[0]}-${splitDate[2]}`);
}

const initialValueOfData = filterEventsFromData(data);
const iconsArray = initialValueOfData.map(element => tryRequire(element.icon));
class Banner extends React.Component {
  state = {
    dataSource: initialValueOfData,
    wrapperHeight: undefined,
    activeDot: [true, ...Array(initialValueOfData.length - 1).fill(false)],
  };

  isThereMoreThenOneText = () => this.state.dataSource.length > 1;

  shiftTrueToRight = arg => {
    if (arg.indexOf(true) + 1 === arg.length) {
      return [true, ...Array(arg.length - 1).fill(false)];
    } else {
      const ret = Array(arg.length).fill(false);
      ret[arg.indexOf(true) + 1] = true;
      return ret;
    }
  };

  timerFunc = () =>
    setInterval(
      () =>
        this.setState({
          activeDot: this.shiftTrueToRight(this.state.activeDot),
        }),
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
      this.setState({ wrapperHeight: this.wrapper.clientHeight });
    }
  };

  componentWillUnmount = () => {
    this.timer && clearInterval(this.timer);
  };

  render() {
    return (
      <Wrapper>
        <InnerWrapper
          height={this.state.wrapperHeight}
          innerRef={divElement => (this.wrapper = divElement)}
        >
          {this.state.height}
          {this.isThereMoreThenOneText() && (
            <DotsWrapper>
              {this.state.dataSource.map((_, index) => (
                <Dot
                  key={index}
                  active={this.state.activeDot[index]}
                  onClick={() => {
                    const arr = Array(this.state.dataSource.length).fill(false);
                    arr[index] = true;
                    this.setState({
                      activeDot: arr,
                    });
                    this.resetTimerTick();
                  }}
                />
              ))}
            </DotsWrapper>
          )}
          {iconsArray.map((el, idx) => {
            if (el) {
              return (
                <Icon
                  multipleTexts={this.isThereMoreThenOneText()}
                  key={idx}
                  active={this.state.activeDot[idx]}
                  src={el}
                  alt="Banner Icon"
                />
              );
            }
            return null;
          })}
          <TextWrapper>
            {this.state.dataSource.map((element, index) => {
              if (element.url) {
                return (
                  <Link
                    multipleTexts={this.isThereMoreThenOneText()}
                    key={index}
                    active={this.state.activeDot[index]}
                    href={element.url}
                  >
                    {element.text}
                  </Link>
                );
              } else {
                return (
                  <Text
                    multipleTexts={this.isThereMoreThenOneText()}
                    key={index}
                    active={this.state.activeDot[index]}
                  >
                    {element.text}
                  </Text>
                );
              }
            })}
          </TextWrapper>
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
`;

const TextWrapper = styled.div`
  padding: 20px 15px;
`;
const fadeInOut = keyframes`
0%   { 
  opacity: 0;
}
2%{
  opacity:0;
}
20%,80%{
  opacity:1;
  };
98%{
  opacity:0;
};
100%{
  opacity:0;
}
`;

const fadeInOutRule = `${fadeInOut} ${ANIMATION_DURATION / 1000}s`;
const Text = styled.p`
  ${props => props.multipleTexts && `animation: ${fadeInOutRule};`};
  display: none;
  ${props => props.active && `display:unset;`};
  margin-top: 0;
  margin-bottom: 0;
  font-family: Poppins;
  text-align: left;
  vertical-align: center;
  align-items: center;
  justify-content: center;
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
  ${props => props.multipleTexts && `animation: ${fadeInOutRule};`};
  display: none;
  ${props => props.active && `display:block;`};
  width: 30px;
  height: 45px;
  object-fit: fill;
  margin-left: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
