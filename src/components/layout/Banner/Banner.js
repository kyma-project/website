import React, { PureComponent } from "react";
import { Wrapper, InnerWrapper, ContentWrapper } from "./styled";
import CircleIndicator from "./CircleIndicator";
import Icon from "./Icon";
import SlideContent from "./SlideContent";

const DEFAULT_BANNER_DURATION = 5000;

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
      const endOfDay = true;
      const startDate = this.parseDate(element.startDate, !endOfDay);
      const endDate = this.parseDate(element.endDate, endOfDay);
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
  parseDate = (arg, endOfDay) => {
    const splitDate = arg.split("-");
    if (splitDate.length === 3) {
      if (endOfDay) {
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
      this.props.duration || DEFAULT_BANNER_DURATION,
    );

  resetTimerTick = () => {
    clearInterval(this.timer);
    this.timer = this.timerFunc();
  };

  multipleSlides = () => this.state.slides.length > 1;

  debounced = (delay, fn) => {
    let timerId;
    return function(...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        fn(...args);
        timerId = null;
      }, delay);
    };
  };

  resize = () => {
    if (this.wrapper) {
      const maxElemHeight = Math.max(...this.wrapper);
      this.setState(() => ({ wrapperHeight: maxElemHeight }));
    }
  };

  componentDidMount = () => {
    const debouncedResize = this.debounced(100, this.resize);
    window.addEventListener("resize", debouncedResize);
    if (this.multipleSlides()) {
      this.timer = this.timerFunc();
    }
    if (!this.state.wrapperHeight && this.wrapper) {
      const maxElemHeight = Math.max(...this.wrapper);
      this.setState({ wrapperHeight: maxElemHeight });
    }
  };

  componentWillUnmount = () => {
    this.timer && clearInterval(this.timer);
    window.removeEventListener("resize", this.resize);
  };
  onCircleClick = index => {
    this.setState({
      currentBanner: index,
    });
    this.resetTimerTick();
  };
  refCallback = (element, index) => {
    if (element) {
      const height = element.getBoundingClientRect().height;
      this.wrapper ? (this.wrapper[index] = height) : (this.wrapper = [height]);
    }
  };
  render() {
    const { slides } = this.props;
    if (!slides || slides.length === 0) {
      return null;
    }
    const manySlides = this.multipleSlides();
    return (
      <Wrapper>
        <InnerWrapper height={this.state.wrapperHeight}>
          {manySlides && (
            <CircleIndicator
              slides={this.state.slides}
              currentBanner={this.state.currentBanner}
              onCircleClick={this.onCircleClick}
            />
          )}
          {this.state.slides.map((elem, index) => {
            return (
              <ContentWrapper
                multipleSlides={manySlides}
                innerRef={el => this.refCallback(el, index)}
                active={index === this.state.currentBanner}
                key={index}
              >
                <Icon iconPath={elem.icon} />
                <SlideContent
                  text={elem.text}
                  url={elem.url}
                  openInNewTab={elem.openInNewTab}
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
