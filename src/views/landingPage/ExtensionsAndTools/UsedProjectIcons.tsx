import React, { FC } from "react";
import { SvgWrapper, ProjectIcon } from "./styled";

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

interface ProjectsShape {
  to: string;
  src: any;
  alt: string;
}

const usedProjects: ProjectsShape[] = [
  {
    to: "https://kubernetes.io",
    src: KubernetesPNG,
    alt: "Kubernetes logo",
  },
  {
    to: "https://istio.io/",
    src: IstioSVG,
    alt: "Istio logo",
  },
  {
    to: "https://grafana.com/",
    src: GrafanaSVG,
    alt: "Grafana logo",
  },
  {
    to: "https://prometheus.io/",
    src: PrometheusSVG,
    alt: "Prometheus logo",
  },
  { to: "https://www.jaegertracing.io/", src: JeagerSVG, alt: "Jaeger logo" },
  {
    to: "https://grafana.com/loki",
    src: LokiPNG,
    alt: "Loki image",
  },
  {
    to: "https://www.kiali.io",
    src: KialiSVG,
    alt: "Kiali logo",
  },
  {
    to: "https://github.com/dexidp/dex",
    src: DexSVG,
    alt: "Dex logo",
  },
  { to: "https://nats.io", src: NatsSVG, alt: "Nats logo" },
  {
    to: "https://cloud.google.com/knative/",
    src: KnativeSVG,
    alt: "Knative logo",
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
  <SvgWrapper>
    {usedProjects.map(({ src, to, alt }) => (
      <Link.External to={to} key={to}>
        <ProjectIcon src={src} alt={alt} />
      </Link.External>
    ))}
  </SvgWrapper>
);
