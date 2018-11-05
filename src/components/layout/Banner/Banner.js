import React, { PureComponent } from "react";
import { Wrapper, InnerWrapper, ContentWrapper } from "./styled";
import CircleIndicator from "./CircleIndicator";
import Icon from "./Icon";
import LinkAndText from "./LinkAndText";
class Banner extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      slides: this.filterEventsFromData(this.props.slides),
      wrapperHeight: undefined,
      currentBanner: 0,
    };
  }

  filterEventsFromData = arg => {
    return arg.filter(element => {
      const startDate = this.parseDate(element.startDate, false);
      const endDate = this.parseDate(element.endDate, true);
      const currentDate = new Date();
      if (endDate && startDate) {
        if (this.isSameDate(startDate, endDate, currentDate)) {
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
  isSameDate = (first, sec, third) => {
    if (first && sec && third) {
      return (
        first.getFullYear() === sec.getFullYear() &&
        first.getMonth() === sec.getMonth() &&
        first.getDate() === sec.getDate() &&
        first.getFullYear() === third.getFullYear() &&
        first.getMonth() === third.getMonth() &&
        first.getDate() === third.getDate()
      );
    }
    return false;
  };
  parseDate = (arg, flag) => {
    const splitDate = arg.split("-");
    if (splitDate.length === 3) {
      if (flag) {
        return new Date(
          `${splitDate[1]}-${splitDate[0]}-${splitDate[2]} 23:59:59`,
        );
      }
      return new Date(`${splitDate[1]}-${splitDate[0]}-${splitDate[2]}`);
    }
    return null;
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
  onCircleClick = index => {
    this.setState({
      currentBanner: index,
    });
    this.resetTimerTick();
  };
  render() {
    const { slides } = this.props;
    if (!slides || slides.length === 0) {
      return null;
    }

    return (
      <Wrapper>
        <InnerWrapper height={this.state.wrapperHeight}>
          {this.multipleSlides() && (
            <CircleIndicator
              slides={this.state.slides}
              currentBanner={this.state.currentBanner}
              onCircleClick={this.onCircleClick}
            />
          )}
          {this.state.slides.map((elem, index) => {
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
                <Icon iconPath={elem.icon} />
                <LinkAndText
                  text={elem.text}
                  url={elem.url}
                  external={elem.external}
                />
              </ContentWrapper>
            );
          })}
        </InnerWrapper>
      </Wrapper>
    );
  }
}

export default Banner;
