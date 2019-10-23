import React, { useRef } from "react";
import AliceCarousel, {
  Props as AliceCarouselProps,
} from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import Grid from "@styled/Grid";
import Button from "@components/shared/Button";

import { AdoptersItem } from "./AdoptersItem";

import { Adopter } from "@typings/landingPage";

import { AdoptersGalleryWrapper, AliceCarouselWrapper } from "./styled";

interface Props {
  adopters: Adopter[];
}

export const AdoptersGallery: React.FunctionComponent<Props> = ({
  adopters,
}) => {
  const carouselRef: React.RefObject<AliceCarousel> = useRef<AliceCarousel>(
    null,
  );

  const adoptersList = adopters.map(adopter => (
    <AdoptersItem key={adopter.url} {...adopter} />
  ));

  const aliceCarouselProps: AliceCarouselProps = {
    items: adoptersList,
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
    },
    buttonsDisabled: true,
    dotsDisabled: true,
    autoPlay: true,
  };

  const slidePrev = () => {
    carouselRef.current && carouselRef.current.slidePrev();
  };

  const slideNext = () => {
    carouselRef.current && carouselRef.current.slideNext();
  };

  return (
    <AdoptersGalleryWrapper>
      <Grid.Container>
        <Grid.Row>
          <Grid.Unit
            df={1}
            xs={0}
            className="carousel-buttons-nav carousel-button-left"
          >
            <div>
              <Button.Emphasized
                onClick={slidePrev}
                className="carousel-button"
                iconName="chevron-left"
                iconPrefix="fas"
                size="sm"
              />
            </div>
          </Grid.Unit>
          <Grid.Unit df={10} sm={12}>
            <AliceCarouselWrapper>
              <AliceCarousel {...aliceCarouselProps} ref={carouselRef} />
            </AliceCarouselWrapper>
          </Grid.Unit>
          <Grid.Unit
            df={1}
            xs={0}
            className="carousel-buttons-nav carousel-button-right"
          >
            <div>
              <Button.Emphasized
                onClick={slideNext}
                className="carousel-button"
                iconName="chevron-right"
                iconPrefix="fas"
                size="sm"
              />
            </div>
          </Grid.Unit>
        </Grid.Row>
      </Grid.Container>
    </AdoptersGalleryWrapper>
  );
};
