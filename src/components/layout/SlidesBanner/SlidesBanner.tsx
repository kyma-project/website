import React, { PureComponent } from "react";

import CircleIndicator from "./CircleIndicator";
import SlideIcon from "./SlideIcon";
import SlideContent from "./SlideContent";

import { Slide } from "./types";

import { Wrapper, InnerWrapper, ContentWrapper } from "./styled";

const DEFAULT_BANNER_DURATION = 5000;

interface SlidesBannerProps {
  bannerDuration: number;
  slides: Slide[];
}

interface SlidesBannerState {
  slides: Slide[];
  currentSlide: number;
  wrapperHeight?: number;
}

class SlidesBanner extends PureComponent<SlidesBannerProps, SlidesBannerState> {
  slides?: Slide[];
  timer: any = null;

  constructor(props: SlidesBannerProps) {
    super(props);
    this.state = {
      slides: this.filterEventsFromData(this.props.slides),
      currentSlide: 0,
      wrapperHeight: undefined,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize);
    if (this.multipleEvents()) {
      this.timer = this.timerFunc();
    }
    this.resize();
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
    window.removeEventListener("resize", this.resize);
  }

  filterEventsFromData = (events: Slide[]) =>
    events.filter(element => {
      const startDate = this.parseDate(false, element.startDate);
      const endDate = this.parseDate(true, element.endDate);
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

  isSameDate = (first: Date, sec: Date, third: Date) => {
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

  parseDate = (endOfDay: boolean, arg?: string) => {
    if (!arg) {
      return null;
    }

    const splitDate = arg.split("/");
    if (splitDate.length === 3) {
      if (endOfDay) {
        return new Date(
          `${splitDate[1]}/${splitDate[0]}/${splitDate[2]} 23:59:59`,
        );
      }
      return new Date(`${splitDate[1]}/${splitDate[0]}/${splitDate[2]}`);
    }
  };

  timerFunc = () =>
    setInterval(
      () =>
        this.setState(prevState => ({
          currentSlide:
            this.state.slides.length - 1 === prevState.currentSlide
              ? 0
              : prevState.currentSlide + 1,
        })),
      this.props.bannerDuration || DEFAULT_BANNER_DURATION,
    );

  resetTimerTick = () => {
    clearInterval(this.timer);
    this.timer = this.timerFunc();
  };

  multipleEvents = () => this.state.slides.length > 1;

  resize = () => {
    if (this.slides) {
      const slidesHeight = this.slides.map((elem: any) => elem.clientHeight);
      const maxElemHeight = Math.max(...slidesHeight);
      this.setState({ wrapperHeight: maxElemHeight });
    }
  };

  onCircleClick = (index: number): void => {
    this.setState({
      currentSlide: index,
    });
    this.resetTimerTick();
  };

  refCallback = (element: any, index: number) => {
    if (!this.slides) {
      this.slides = [];
    }

    this.slides[index] = element;
  };

  render() {
    const { slides } = this.props;

    if (!slides || slides.length === 0) {
      return null;
    }
    const manySlides = this.multipleEvents();

    return (
      <Wrapper>
        <InnerWrapper height={this.state.wrapperHeight}>
          {manySlides && (
            <CircleIndicator
              slides={this.state.slides}
              currentSlide={this.state.currentSlide}
              onCircleClick={this.onCircleClick}
            />
          )}
          {this.state.slides.map((elem: Slide, index: number) => (
            <ContentWrapper
              multipleSlides={manySlides}
              ref={(el: any) => this.refCallback(el, index)}
              active={index === this.state.currentSlide}
              key={index}
            >
              {elem.icon && <SlideIcon iconPath={elem.icon} />}
              <SlideContent
                text={elem.text}
                url={elem.url}
                openInNewTab={elem.openInNewTab}
              />
            </ContentWrapper>
          ))}
        </InnerWrapper>
      </Wrapper>
    );
  }
}

export default SlidesBanner;
