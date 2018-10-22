import React from "react";
import styled, { keyframes } from "styled-components";
import data from "./data.json";
import colors from "./../../config/colors";
const ANIMATION_DURATION = 4000;
const MAX_TEXT_LENGTH = 100;

const fadeInOut = keyframes`
0%   { 
  opacity: 0;
  transform: translateY(100%);
}
20%,80%{
  opacity:1;
  transform: translateY(0);
  };
97%{
  opacity:0;
  transform: translateY(-100%);
};
100%{
  opacity:0;
  transform: translateY(-100%);
}
`;

const Wrapper = styled.section`
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  background-color: #0b74de;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerWrapper = styled.div`
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
  ${props =>
    props.animate &&
    `animation: ${fadeInOut} infinite;
  animation-duration: ${ANIMATION_DURATION / 1000}s;`};
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

const DotAnimation = keyframes`
0%   { 
  opacity: 0;
  transform: translateY(17px);
}
10%{
  opacity:1;
}
20%,80%{
  opacity:1;
  transform: translateY(0);
  width:8px;
  height:8px;
  border-radius:8px;
  background-color:${colors.green};
  };
90%{
  opacity:1;
  }
100%{
  opacity:0;
  transform: translateY(-17px);
};
`;
const Dot = styled.div`
  height: 4px;
  width: 4px;
  margin: 3px auto;
  border-radius: 4px;
  background-color: ${colors.lightBlue};
`;

const AnimatedDot = styled(Dot)`
  ${props =>
    props.animate &&
    `animation: ${DotAnimation} ${ANIMATION_DURATION / 1000}s infinite;`};
  ${props =>
    !props.animate &&
    `width:8px;
    height:8px;
    border-radius:8px;
    background-color:${colors.green};
  `};
`;

const DotsWrapper = styled.section`
  height: 45px;
  width: 8px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 25px;
  min-width: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
`;

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

class Banner extends React.Component {
  state = {
    src: filterEventsFromData(data.linkData),
    text: filterEventsFromData(data.linkData)[0].text,
    link: filterEventsFromData(data.linkData)[0].links,
    val: 1,
    mouseIsHovering: false,
  };

  truncate = (text, length) =>
    text.length <= length ? text : text.slice(0, length) + "...";

  isThereMoreThenOneText = () => this.state.src.length > 1;

  componentDidMount = () => {
    if (this.isThereMoreThenOneText()) {
      this.timer = setInterval(() => {
        this.setState(prevState => ({
          text:
            prevState.src[prevState.val] && prevState.src[prevState.val].text
              ? prevState.src[prevState.val].text
              : prevState.text,
          val: prevState.src[prevState.val + 1] ? prevState.val + 1 : 0,
          link:
            prevState.src[prevState.val] && prevState.src[prevState.val].link
              ? prevState.src[prevState.val].link
              : null,
        }));
      }, ANIMATION_DURATION);
    }
  };

  componentWillUnmount = () => {
    this.timer && clearInterval(this.timer);
  };

  render() {
    return (
      <Wrapper
        onMouseEnter={() => {
          this.setState({ mouseIsHovering: true });
        }}
        onMouseLeave={() => {
          this.setState({ mouseIsHovering: false });
        }}
      >
        <InnerWrapper>
          <DotsWrapper>
            <Dot />
            <AnimatedDot animate={this.isThereMoreThenOneText()} />
            <Dot />
          </DotsWrapper>
          {data.icon && <Icon src={data.icon} alt="Banner Icon" />}
          <TextWrapper>
            {this.state.link ? (
              <Link
                href={this.state.link}
                animate={this.isThereMoreThenOneText()}
              >
                {this.state.mouseIsHovering
                  ? this.state.text
                  : this.truncate(this.state.text, MAX_TEXT_LENGTH)}
              </Link>
            ) : (
              <Text animate={this.isThereMoreThenOneText()}>
                {this.state.mouseIsHovering
                  ? this.state.text
                  : this.truncate(this.state.text, MAX_TEXT_LENGTH)}
              </Text>
            )}
          </TextWrapper>
        </InnerWrapper>
      </Wrapper>
    );
  }
}

export default Banner;
