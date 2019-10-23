import React, { FC } from "react";
import { ProductSVG, ProductIconImg, AliceCarouselWrapper } from "./styled";

import KubernetesPNG from "../assets/make-special/kubernetes.png";
import IstioSVG from "../assets/make-special/istio.svg";
import GrafanaSVG from "../assets/make-special/grafana.svg";
import PrometheusSVG from "../assets/make-special/prometheus.svg";
import JeagerSVG from "../assets/make-special/jaeger.svg";
import LokiPNG from "../assets/make-special/loki.png";
import KialiSVG from "../assets/make-special/kiali.svg";
import DexSVG from "../assets/make-special/dex.svg";
import KnativeSVG from "../assets/make-special/knative.svg";
import NatsSVG from "../assets/make-special/nats.svg";
import OryPNG from "../assets/make-special/ory.png";
import VeleroPNG from "../assets/make-special/velero.png";

import Link from "@components/shared/Link";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const responsive = {
  0: {
    items: 6,
  },
  1024: {
    items: 8,
  },
};

interface ProjectsShapeBase {
  to: string;
  src: any;
  icon: any;
}

type ProjectsArrayType = Array<
  | (Omit<ProjectsShapeBase, "src"> & { width?: number })
  | (Omit<ProjectsShapeBase, "icon"> & { alt: string })
>;

function isSVGProps(arg: any): arg is Omit<ProjectsShapeBase, "src"> {
  return arg.icon !== undefined;
}

const usedProjects: ProjectsArrayType = [
  {
    to: "https://kubernetes.io",
    src: KubernetesPNG,
    alt: "Kubernetes logo",
  },

  {
    to: "https://istio.io/",
    icon: IstioSVG,
    width: 35,
  },
  {
    to: "https://grafana.com/",
    icon: GrafanaSVG,
  },
  {
    to: "https://prometheus.io/",
    icon: PrometheusSVG,
  },
  { to: "https://www.jaegertracing.io/", icon: JeagerSVG },
  {
    to: "https://grafana.com/loki",
    src: LokiPNG,
    alt: "Loki image",
  },
  {
    to: "https://www.kiali.io",
    icon: KialiSVG,
  },
  {
    to: "https://github.com/dexidp/dex",
    icon: DexSVG,
  },
  { to: "https://nats.io", icon: NatsSVG },
  {
    to: "https://cloud.google.com/knative/",
    icon: KnativeSVG,
    width: 60,
  },
  {
    to: "https://ory.sh",
    src: OryPNG,
    alt: "Ory logo",
  },
  {
    to: "https://velero.io/",
    src: VeleroPNG,
    alt: "Velero logo",
  },
];

const carouselData = usedProjects.map(elem => (
  <Link.External to={elem.to} key={elem.to}>
    {isSVGProps(elem) ? (
      <ProductSVG icon={elem.icon} width={elem.width} />
    ) : (
      <ProductIconImg src={elem.src} alt={elem.alt} />
    )}
  </Link.External>
));

export const UsedProjectsCarousel: FC = () => (
  <AliceCarouselWrapper>
    <AliceCarousel
      responsive={responsive}
      duration={700}
      items={carouselData}
      dotsDisabled={true}
      autoPlay={true}
      buttonsDisabled={true}
      swipeDisabled={true}
      keysControlDisabled={true}
      stopAutoPlayOnHover={true}
      autoPlayInterval={3000}
    />
  </AliceCarouselWrapper>
);
