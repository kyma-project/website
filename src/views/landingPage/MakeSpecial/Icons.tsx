import React, { FC } from "react";
import {
  MakesSpecialSvgWrapper,
  IconsRow,
  ProductSVG,
  ProductIconImg,
} from "./styled";
import IstioSVG from "../assets/make-special/istio.svg";
import GrafanaSVG from "../assets/make-special/grafana.svg";
import PrometheusSVG from "../assets/make-special/prometheus.svg";
import JeagerSVG from "../assets/make-special/jaeger.svg";
import LokiPNG from "../assets/make-special/loki.png";
import LuigiPNG from "../assets/make-special/luigi.png";
import KialiSVG from "../assets/make-special/kiali.svg";
import DexSVG from "../assets/make-special/dex.svg";
import KnativeSVG from "../assets/make-special/knative.svg";
import NatsSVG from "../assets/make-special/nats.svg";

import Link from "@components/shared/Link";

interface ProjectsShapeBase {
  to: string;
  width?: number;
  alt?: string;
}
interface ProjectsImage extends ProjectsShapeBase {
  src: any;
}

interface ProjectsSVG extends ProjectsShapeBase {
  icon: any;
}
type ProjectsArrayType = Array<ProjectsImage | ProjectsSVG>;

function isSVGProps(arg: any): arg is ProjectsSVG {
  return arg.icon !== undefined;
}

const usedProjects: ProjectsArrayType = [
  {
    to: "https://istio.io/",
    icon: IstioSVG,
    width: 60,
  },
  {
    to: "https://grafana.com/",
    icon: GrafanaSVG,
  },
  {
    to: "https://prometheus.io/",
    icon: PrometheusSVG,
  },
  { to: "https://www.jaegertracing.io/", src: JeagerSVG },
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
  { to: "https://nats.io", src: NatsSVG },
  {
    to: "https://cloud.google.com/knative/",
    icon: KnativeSVG,
  },
  {
    to: "https://github.com/SAP/luigi",
    src: LuigiPNG,
    alt: "Luigi image",
  },
];

export const Icons: FC = () => (
  <MakesSpecialSvgWrapper>
    <IconsRow>
      {usedProjects.map(elem => (
        <Link.External to={elem.to}>
          {isSVGProps(elem) ? (
            <ProductSVG icon={elem.icon} width={elem.width} />
          ) : (
            <ProductIconImg src={elem.src} alt={elem.alt} />
          )}
        </Link.External>
      ))}
    </IconsRow>
  </MakesSpecialSvgWrapper>
);
