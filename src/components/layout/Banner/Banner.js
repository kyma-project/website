import React, { PureComponent } from "react";
import {
  Wrapper,
  InnerWrapper,
  CircleWrapper,
  Circle,
  ContentWrapper,
  Text,
  Link,
  Icon,
} from "./styled";

class Banner extends PureComponent {
  filterEventsFromData = arg => {
    return arg.filter(element => {
      const endDate = this.parseDate(element.endDate);
      const startDate = this.parseDate(element.startDate);
      const currentDate = new Date();
      if (endDate && startDate) {
        if (this.isSameDate(startDate, currentDate)) {
          return true;
        }
        const currentDateInMilis = currentDate.getTime();
        return (
          startDate.getTime() < currentDateInMilis &&
          currentDateInMilis < endDate.getTime()
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
  isSameDate = (first, sec) => {
    if (first && sec) {
      return (
        first.getFullYear() === sec.getFullYear() &&
        first.getMonth() === sec.getMonth() &&
        first.getDate() === sec.getDate()
      );
    }
    return false;
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
    if (!this.state.wrapperHeight && this.wrapper) {
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
                  icon = require(`../../../config/assets/${elem.icon}`);
                } catch (err) {
                  console.error(err);
                }
              }
              let LinkAndText;
              if (elem.text) {
                if (elem.url) {
                  LinkAndText = (
                    <>
                      <Text>{elem.text}</Text>
                      <Link
                        href={elem.url}
                        target={elem.external ? "_blank" : "_self"}
                      >
                        {"Read more"}
                      </Link>
                    </>
                  );
                } else {
                  LinkAndText = <Text>{elem.text}</Text>;
                }
              } else {
                LinkAndText = <Text>"Provide valid text for banner!"</Text>;
                console.warn("Provide valid text for banner!");
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
                  {/* {elem.text ? (
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
                  )} */}
                  {LinkAndText}
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
