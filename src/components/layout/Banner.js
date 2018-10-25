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
class Banner extends React.Component {
  state = {
    dataSource: initialValueOfData,
    text: initialValueOfData[0].text,
    url: initialValueOfData[0].url,
    icon: initialValueOfData[0].icon,
    counter: 1,
    wrapperHeight: undefined,
    activeDot: [true, ...Array(initialValueOfData.length - 1).fill(false)],
  };

  isThereMoreThenOneText = () => this.state.dataSource.length > 1;

  shiftTrueToRight = arg => {
    if (arg.indexOf(true) + 1 === arg.length) {
      return [true, ...Array(arg.length - 1).fill(false)];
    } else {
      const arr = Array(arg.length).fill(false);
      arr[arg.indexOf(true) + 1] = true;
      return arr;
    }
  };
  componentDidMount = () => {
    if (this.isThereMoreThenOneText()) {
      this.timer = setInterval(() => {
        this.setState(prevState => ({
          text:
            prevState.dataSource[prevState.counter] &&
            prevState.dataSource[prevState.counter].text
              ? prevState.dataSource[prevState.counter].text
              : prevState.text,
          url:
            prevState.dataSource[prevState.counter] &&
            prevState.dataSource[prevState.counter].url
              ? prevState.dataSource[prevState.counter].url
              : null,
          counter: prevState.dataSource[prevState.counter + 1]
            ? prevState.counter + 1
            : 0,
          icon:
            prevState.dataSource[prevState.counter] &&
            prevState.dataSource[prevState.counter].icon
              ? prevState.dataSource[prevState.counter].icon
              : null,
          activeDot: this.shiftTrueToRight(this.state.activeDot),
        }));
      }, ANIMATION_DURATION);
    }
    if (!this.state.wrapperHeight) {
      this.setState({ wrapperHeight: this.wrapper.clientHeight });
    }
  };

  componentWillUnmount = () => {
    this.timer && clearInterval(this.timer);
  };

  render() {
    console.log("rerender");
    return (
      <Wrapper>
        <InnerWrapper
          height={this.state.wrapperHeight}
          innerRef={divElement => (this.wrapper = divElement)}
        >
          {this.state.height}
          <DotsWrapper>
            {this.state.dataSource.map((_, index) => (
              <Dot
                key={index}
                active={this.state.activeDot[index]}
                onClick={() => {
                  const arr = Array(this.state.dataSource.length).fill(false);
                  arr[index] = true;
                  this.setState({
                    counter: index,
                    text: this.state.dataSource[index].text,
                    url: this.state.dataSource[index].url,
                    icon: this.state.dataSource[index].icon,
                    activeDot: arr,
                  });
                }}
              />
            ))}
          </DotsWrapper>
          {this.state.icon && (
            <Icon src={tryRequire(this.state.icon)} alt="Banner Icon" />
          )}
          <TextWrapper>
            {this.state.dataSource.map((element, idx) => {
              if (element.url) {
                return (
                  <Link href={element.url} active={this.state.activeDot[idx]}>
                    {element.text}
                  </Link>
                );
              }
              return (
                <Text active={this.state.activeDot[idx]}>{element.text}</Text>
              );
            })}
          </TextWrapper>
        </InnerWrapper>
      </Wrapper>
    );
  }
}

export default Banner;

// const moveBottomTop = keyframes`
// 0%   {
//   opacity: 0;
//   transform: translateY(100%);
// }
// 20%,80%{
//   opacity:1;
//   transform: translateY(0);
//   };
// 97%{
//   opacity:0;
//   transform: translateY(-100%);
// };
// 100%{
//   opacity:0;
//   transform: translateY(-100%);
// }
// `;
const fadeInOut = keyframes`
0%   { 
  opacity: 0;
}
20%,80%{
  opacity:1;
  };
97%{
  opacity:0;
};
100%{
  opacity:0;
}
`;
// const dotAnimation = keyframes`
// 0%   {
//   opacity: 0;
//   transform: translateY(17px);
// }
// 20%,80%{
//   opacity:1;
//   transform: translateY(0);
//   width:8px;
//   height:8px;
//   border-radius:8px;
//   background-color:${colors.green};
//   };
// 100%{
//   opacity:0;
//   transform: translateY(-17px);
// };
// `;
const ANIMATION_DURATION = 2000;
// const moveBottomTopRule = `${moveBottomTop} ${ANIMATION_DURATION / 1000}s;`;
// const dotAnimationRule = `${dotAnimation} ${ANIMATION_DURATION /
//   1000}s;`;
const fadeInOutRule = `${fadeInOut} ${ANIMATION_DURATION / 1000}s`;

const Wrapper = styled.section`
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  background-color: ${colors.blue};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerWrapper = styled.div`
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
const Text = styled.p`
  display: none;
  ${props => props.active && `display: block;`};
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
  display: inline-block;
`.withComponent("a");

// const AnimatedDot = styled(Dot)`
//   ${props => props.animate && `animation: ${dotAnimationRule}`};
//   ${props =>
//     !props.animate &&
//     `width:8px;
//     height:8px;
//     border-radius:8px;
//     background-color:${colors.green};
//   `};
// `;

const DotsWrapper = styled.section`
  height: 45px;
  width: 8px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 25px;
  min-width: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const transitionDuration = `${ANIMATION_DURATION / 5000}s`;
const Dot = styled.div`
  height: 8px;
  width: 8px;
  background-color: ${colors.lightBlue};
  ${props => props.active && `background-color: ${colors.green};`};
  transition: ${transitionDuration};
  &:hover {
    cursor: pointer;
  }
`;
const Icon = styled.img`
  width: 30px;
  max-width: 30px;
  min-width: 30px;
  height: 45px;
  object-fit: fill;
  margin-left: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
  animation: ${fadeInOutRule};
`;
