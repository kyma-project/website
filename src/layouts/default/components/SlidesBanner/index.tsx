import React, { PureComponent } from "react";

import CircleIndicator from "./CircleIndicator";
import SlideContent from "./SlideContent";

import { SlidesBannerProps, Slide } from "@typings/landingPage";

import { Wrapper, InnerWrapper, ContentWrapper } from "./styled";

const DEFAULT_BANNER_DURATION = 5000;

interface SlidesBannerState {
  slides: Slide[];
  currentSlide: number;
}

export class SlidesBanner extends PureComponent<
  SlidesBannerProps,
  SlidesBannerState
> {
  slides?: Slide[];
  timer: any = null;

  constructor(props: SlidesBannerProps) {
    super(props);
    this.state = {
      slides: this.filterEventsFromData(this.props.slides),
      currentSlide: 0,
    };
  }

  componentDidMount() {
    if (this.multipleEvents()) {
      this.timer = this.timerFunc();
    }
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
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
    return false;
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
      <>
        {this.state.slides && this.state.slides.length > 0 && (
          <Wrapper>
            <InnerWrapper>
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
                  <SlideContent text={elem.text} url={elem.url} />
                </ContentWrapper>
              ))}
            </InnerWrapper>
          </Wrapper>
        )}
      </>
    );
  }
}
