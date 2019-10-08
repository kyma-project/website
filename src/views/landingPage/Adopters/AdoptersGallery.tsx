import React, { useRef } from "react";
import AliceCarousel, {
  Props as AliceCarouselProps,
} from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import Button from "@components/shared/Button";

import { AdoptersItem } from "./AdoptersItem";

import { Adopter } from "@typings/landingPage";

import { AdoptersContent } from "./styled";

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
    <AdoptersContent>
      <Button.Emphasized
        onClick={slidePrev}
        iconName="chevron-left"
        iconPrefix="fas"
      />
      <AliceCarousel {...aliceCarouselProps} ref={carouselRef} />
      <Button.Emphasized
        onClick={slideNext}
        iconName="chevron-right"
        iconPrefix="fas"
      />
    </AdoptersContent>
  );
};
