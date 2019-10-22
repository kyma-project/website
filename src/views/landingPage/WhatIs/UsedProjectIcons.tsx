import React, { FC } from "react";
import { MakesSpecialSvgWrapper, ProductSVG, ProductIconImg } from "./styled";

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

export const UsedProjectIcons: FC = () => (
  <MakesSpecialSvgWrapper>
    {usedProjects.map(elem => (
      <Link.External to={elem.to} key={elem.to}>
        {isSVGProps(elem) ? (
          <ProductSVG icon={elem.icon} width={elem.width} />
        ) : (
          <ProductIconImg src={elem.src} alt={elem.alt} />
        )}
      </Link.External>
    ))}
  </MakesSpecialSvgWrapper>
);
