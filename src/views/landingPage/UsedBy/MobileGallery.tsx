import React from "react";
import { Adopter } from "@typings/landingPage";
import { Card } from "./Card";
import AliceCarousel, {
  Props as AliceCarouselProps,
} from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { AliceCarouselWrapper, CardWrapper } from "./styled";

const aliceCarouselProps: AliceCarouselProps = {
  duration: 350,
  buttonsDisabled: true,
  dotsDisabled: true,
  autoPlay: false,
  mouseTrackingEnabled: true,
  stagePadding: {
    paddingLeft: 20,
    paddingRight: 20,
  },
};

interface MobileGalleryProps {
  customers: Adopter[];
  isMobile: boolean;
}

export const MobileGallery: React.FunctionComponent<MobileGalleryProps> = ({
  customers,
  isMobile,
}) => (
  <AliceCarouselWrapper>
    <AliceCarousel {...aliceCarouselProps}>
      {customers.map(el => (
        <CardWrapper key={el.company}>
          <Card {...el} data-info={el.company} isMobile={isMobile} />
        </CardWrapper>
      ))}
    </AliceCarousel>
  </AliceCarouselWrapper>
);
