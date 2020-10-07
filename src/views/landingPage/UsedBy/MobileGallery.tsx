import React from "react";
import { Adopter } from "@typings/landingPage";
import { Card } from "./Card";
import AliceCarousel, {
  Props as AliceCarouselProps,
} from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import styled from "@styled";

const aliceCarouselProps: AliceCarouselProps = {
  duration: 700,
  autoPlayInterval: 5000,
  buttonsDisabled: true,
  dotsDisabled: true,
  autoPlay: true,
  stopAutoPlayOnHover: true,
  mouseTrackingEnabled: true,
  stagePadding: {
    paddingLeft: 20,
    paddingRight: 20,
  },
};

interface MobileGalleryProps {
  customers: Adopter[];
}

export const MobileGallery: React.FunctionComponent<MobileGalleryProps> = ({
  customers,
}) => (
  <AliceCarouselWrapper>
    <AliceCarousel {...aliceCarouselProps}>
      {customers.map(el => (
        <CardWrapper key={el.company}>
          <Card {...el} data-info={el.company} />
        </CardWrapper>
      ))}
    </AliceCarousel>
  </AliceCarouselWrapper>
);

const CardWrapper = styled.div`
  padding: 0 10px;
`;

const AliceCarouselWrapper = styled.div`
  &&&& .alice-carousel__stage-item {
    transition-duration: 300ms;
    &:not(.__active) {
      margin-top: 20px;
    }
  }
`;
