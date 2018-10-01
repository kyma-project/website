import React from "react";
import styled, { keyframes } from "styled-components";

const JsonOrYaml = {
  title:
    "Join us for the SAP Customer Experience LIVE Hackathon, Barcelona, October 9",
  icon:
    "https://cdn0.iconfinder.com/data/icons/customicondesignoffice5/256/examples.png",
  link: "https://www.styled-components.com/docs/basics",
};
const fadeInOut = keyframes`
0%   { 
  opacity: 0;
  transform: translateY(100%);
}
33%,66%{
  opacity:1;
  transform: translateY(0);
  };
100%{
  opacity:0;
  transform: translateY(-100%);
};
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

const Text = styled.p`
  animation: ${fadeInOut} 3s infinite;
  margin-top: 0;
  margin-bottom: 0;
  font-family: Poppins;
  text-align: center;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 20ch;
  ${Wrapper}:hover & {
    width: min-content;
  }
`;
const Dot = styled.div`
  height: 4px;
  width: 4px;
  margin: 3px auto;
  border-radius: 4px;
  background-color: #3298ff;
`;
const animSecond = keyframes`
0%   { 
  opacity: 0;
  transform: translateY(17px);
}
10%{
  opacity:1;
}
33%,66%{
  transform: translateY(0);
  width:8px;
  height:8px;
  border-radius:8px;
  background-color:#00e833;
  };
  90%{
    opacity:1;
    transform: translateY(-17px);
  }
100%{
  opacity:0;
  transform: translateY(-17px);
};
`;
const First = styled(Dot)``;
const Second = styled(Dot)`
  animation: ${animSecond} 3s infinite;
`;
const Third = styled(Dot)``;

const DotsWrapper = styled.section`
  height: 45px;
  width: 8px;
  min-width: 8px;
  margin-left: 15px;
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

const TextWrapper = styled.div`
  padding: 20px 15px;
`;

// const BannerLink = styled.a`
//   color: #fff;
//   text-decoration: underline;
// `;
const jsonText = [
  "some kind of long textsome kind of longsome kind of long textsome kind of long textsome kind of long text some kind of long textsome kind oflong text some kind of long text",
  "OTHER LONG TEXT OTHER LONG TEXT OTHER LONG TEXT OTHER LONG TEXT OTHER LONG TEXTTHER LONG TEXT OTHER LONG TEXT OTHER LONG TEXT",
  "heeeeeeelp",
];

class Banner extends React.Component {
  state = {
    text: jsonText[0],
    val: 1,
  };

  truncate = (text, length) => text.slice(0, length) + "...";

  // shiftTrueToRight = arg => {
  //   const arr = Array(arg.length).fill(false);
  //   const trueIndex = arg.indexOf(true);
  //   if (trueIndex === arg.length - 1) {
  //     arr[0] = true;
  //   } else {
  //     arr[trueIndex + 1] = true;
  //   }
  //   return arr;
  // };
  componentDidMount = () => {
    this.timer = setInterval(() => {
      this.setState({
        text: jsonText[this.state.val],
        val: jsonText[this.state.val + 1] ? this.state.val + 1 : 0,
        // propsForDots: this.shiftTrueToRight(this.state.propsForDots),
      });
    }, 3000);
  };
  componentWillUnmount = () => {
    clearInterval(this.timer);
  };
  render() {
    return (
      <Wrapper>
        <InnerWrapper>
          <DotsWrapper>
            <First />
            <Second />
            <Third />
          </DotsWrapper>
          {JsonOrYaml.icon && <Icon src={JsonOrYaml.icon} alt="Banner Icon" />}
          <TextWrapper>
            <Text>{this.state.text}</Text>
          </TextWrapper>
        </InnerWrapper>
      </Wrapper>
    );
  }
}

export default Banner;
// Join us for the &nbsp;
// <BannerLink
// href="https://events.sap.com/sap-cx-live/en/hackathon-live"
// target="_blank"
// rel="noopener noreferrer"
// >
// SAP Customer Experience LIVE Hackathon, Barcelona, October 9
// </BannerLink>{" "}
// &nbsp;&&nbsp;{" "}
// <BannerLink
// href="https://events.sap.com/sap-cx-live/en/home"
// target="_blank"
// rel="noopener noreferrer"
// >
// SAP Customer Experience LIVE, Barcelona, October 10-11
// </BannerLink>
