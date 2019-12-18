import React, { useRef, useState, useEffect } from "react";
import { useWindowSize } from "react-use";
import AliceCarousel, {
  Props as AliceCarouselProps,
} from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import Grid from "@styled/Grid";
import Button from "@components/shared/Button";

import { AdoptersItem } from "./AdoptersItem";

import { Adopter } from "@typings/landingPage";

import { AdoptersGalleryWrapper, AliceCarouselWrapper } from "./styled";

const aliceCarouselProps: AliceCarouselProps = {
  duration: 700,
  autoPlayInterval: 5000,
  responsive: {
    0: {
      items: 1,
    },
    576: {
      items: 2,
    },
    768: {
      items: 3,
    },
    1024: {
      items: 4,
    },
    [Number.POSITIVE_INFINITY]: {
      items: 4,
    },
  },
  buttonsDisabled: true,
  dotsDisabled: true,
  autoPlay: true,
  stopAutoPlayOnHover: true,
  mouseTrackingEnabled: true,
};

const disableCarouselScrolling = (
  options: AliceCarouselProps,
  windowWidth: number,
  adoptersCount: number,
): State => {
  const responsiveBreakpoints = Object.keys(
    aliceCarouselProps.responsive || {},
  );
  if (!responsiveBreakpoints.length) {
    return {
      carouselProps: options,
      hideNav: false,
    };
  }

  const pairwise = (
    arr: any[],
    func: (first: number, second: number) => void,
  ) => {
    for (let i = 0; i < arr.length - 1; i++) {
      func(Number(arr[i]), Number(arr[i + 1]));
    }
  };

  let disableScrolling = false;
  pairwise(responsiveBreakpoints, (low, high) => {
    const items: number = (aliceCarouselProps.responsive as any)[low].items;
    if (low <= windowWidth && high > windowWidth && adoptersCount <= items) {
      disableScrolling = true;
    }
  });

  if (!disableScrolling) {
    return {
      carouselProps: options,
      hideNav: false,
    };
  }

  return {
    carouselProps: {
      ...options,
      duration: 0,
      autoPlayInterval: 0,
      autoPlay: false,
      mouseTrackingEnabled: false,
      infinite: false,
    },
    hideNav: true,
  };
};

interface Props {
  adopters: Adopter[];
}

interface State {
  carouselProps: AliceCarouselProps;
  hideNav: boolean;
}

export const AdoptersGallery: React.FunctionComponent<Props> = ({
  adopters,
}) => {
  const [state, setState] = useState<State>({
    carouselProps: aliceCarouselProps,
    hideNav: true,
  });
  const { width } = useWindowSize();
  const carouselRef: React.RefObject<AliceCarousel> = useRef<AliceCarousel>(
    null,
  );

  useEffect(() => {
    const newState = disableCarouselScrolling(
      aliceCarouselProps,
      width,
      adopters.length,
    );
    setState(newState);
  }, []);

  useEffect(() => {
    const newState = disableCarouselScrolling(
      aliceCarouselProps,
      width,
      adopters.length,
    );
    setState(newState);
  }, [width]);

  const slidePrev = () => {
    carouselRef.current && carouselRef.current.slidePrev();
  };

  const slideNext = () => {
    carouselRef.current && carouselRef.current.slideNext();
  };

  const adoptersList = adopters.map(adopter => (
    <AdoptersItem key={adopter.websiteUrl} {...adopter} />
  ));

  const leftNavButton = state.hideNav ? null : (
    <div>
      <Button.Emphasized
        onClick={slidePrev}
        className="carousel-button"
        iconName="chevron-left"
        iconPrefix="fas"
        size="sm"
      />
    </div>
  );

  const rightNavButton = state.hideNav ? null : (
    <div>
      <Button.Emphasized
        onClick={slideNext}
        className="carousel-button"
        iconName="chevron-right"
        iconPrefix="fas"
        size="sm"
      />
    </div>
  );

  return (
    <AdoptersGalleryWrapper>
      <Grid.Container>
        <Grid.Row>
          <Grid.Unit
            df={1}
            className="carousel-buttons-nav carousel-button-left"
          >
            {leftNavButton}
          </Grid.Unit>
          <Grid.Unit df={10}>
            <AliceCarouselWrapper>
              <AliceCarousel {...state.carouselProps} ref={carouselRef}>
                {adoptersList}
              </AliceCarousel>
            </AliceCarouselWrapper>
          </Grid.Unit>
          <Grid.Unit
            df={1}
            className="carousel-buttons-nav carousel-button-right"
          >
            {rightNavButton}
          </Grid.Unit>
        </Grid.Row>
      </Grid.Container>
    </AdoptersGalleryWrapper>
  );
};
