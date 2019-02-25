import React from "react";
import styled from "@styled";

const StyledSvg = styled.svg`
  #technology-circle {
    animation: tech-circle 27s linear infinite;
  }

  #technology-triangle {
    animation: tech-triangle 24s linear infinite;
  }

  #technology-rect {
    animation: tech-rect 22s linear infinite;
  }

  @keyframes tech-circle {
    0% {
      transform: translate3d(0, 0, 0);
    }
    20% {
      transform: translate3d(0, -30px, 0);
    }
    70% {
      transform: translate3d(0, 70px, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes tech-triangle {
    0% {
      transform: translate3d(0, 0, 0);
    }
    50% {
      transform: translate3d(0, 130px, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes tech-rect {
    0% {
      transform: translate3d(0, 0, 0);
    }
    50% {
      transform: translate3d(0, -60px, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }
`;

const TechIndependent = () => (
  <StyledSvg
    width="228px"
    height="330px"
    viewBox="0 0 228 330"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="technology-title"
  >
    <defs>
      <linearGradient
        x1="-11.982605%"
        y1="-4.69164697%"
        x2="100%"
        y2="165.533649%"
        id="technology-linearGradient-1"
      >
        <stop stopColor="#0B74DE" offset="0%" />
        <stop stopColor="#4D10E1" stopOpacity="0.8" offset="100%" />
      </linearGradient>
      <path
        id="technology-path-2"
        d="M194.94291,271.90744 C234.87204,239.25977 237.9284,163.31444 206.26475,100.82174 C175.19375,36.50214 107.87119,14.48835 52.79082,63.08225 C-2.51318,120.92336 -18.02309,205.04944 23.85721,245.48979 C70.25424,290.21729 150.78773,304.05019 194.94291,271.90744 Z"
      />
      <linearGradient
        x1="141.765379%"
        y1="71.8903001%"
        x2="141.765379%"
        y2="-173.449621%"
        id="technology-linearGradient-5"
      >
        <stop stopColor="#0B74DE" offset="0%" />
        <stop stopColor="#00E833" offset="100%" />
      </linearGradient>
      <path
        id="technology-path-6"
        d="M127.91646,8 C127.91646,3.581722 124.334738,2.705415e-16 119.91646,0 C115.498182,-2.705415e-16 111.91646,3.581722 111.91646,8 L111.91646,36.84229 L111.91646,287.76562 C117.219011,288.562684 122.559652,289.081624 127.91646,289.32031 L127.91646,60.927 L127.91646,8 Z"
      />
      <linearGradient
        x1="188.719601%"
        y1="50%"
        x2="50.3813532%"
        y2="232.412132%"
        id="technology-linearGradient-9"
      >
        <stop stopColor="#0B74DE" offset="0%" />
        <stop stopColor="#00E833" offset="100%" />
      </linearGradient>
      <path
        id="technology-path-10"
        d="M71.31929,49.57837 L71.31929,24.07251 C71.31929,19.654232 67.737568,16.07251 63.31929,16.07251 C58.901012,16.07251 55.31929,19.654232 55.31929,24.07251 L55.31929,71.095 L55.31929,268.5332 C60.51088,271.406918 65.8517704,274.002227 71.31929,276.30811 L71.31929,49.57837 Z"
      />
      <linearGradient
        x1="211.730429%"
        y1="18.7198826%"
        x2="100%"
        y2="241.241945%"
        id="technology-linearGradient-13"
      >
        <stop stopColor="#0B74DE" offset="0%" />
        <stop stopColor="#00E833" offset="100%" />
      </linearGradient>
      <path
        id="technology-path-14"
        d="M187.91646,249.59364 L187.91646,72.30091 C183.112918,66.5939262 177.753155,61.3793291 171.91646,56.73426 L171.91646,283.62953 L171.91646,321.24012 C171.91646,325.658398 175.498182,329.24012 179.91646,329.24012 C184.334738,329.24012 187.91646,325.658398 187.91646,321.24012 L187.91646,249.59364 Z"
      />
      <circle id="technology-path-17" cx="63.31912" cy="151.72998" r="25" />
      <path
        id="technology-path-20"
        d="M115.66435,73.77781 L89.64081,115.81781 C88.6861607,117.360011 88.6415434,119.298263 89.5242182,120.882758 C90.406893,122.467253 92.0784259,123.449489 93.89219,123.44949 L145.94085,123.44949 C147.754637,123.449488 149.426187,122.467227 150.308852,120.882701 C151.191517,119.298174 151.146861,117.359896 150.19216,115.8177 L124.167,73.7777 C123.255554,72.3054072 121.647228,71.4095069 119.915644,71.4095293 C118.184061,71.4095517 116.575758,72.3054937 115.66435,73.77781 Z"
      />
      <rect
        id="technology-path-23"
        x="156.58319"
        y="185.24674"
        width="46.66667"
        height="46.66667"
        rx="5"
      />
    </defs>
    <g id="kyma" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Kyma-landingpage" transform="translate(-1021.000000, -693.000000)">
        <g
          id="Element-36"
          transform="translate(1021.000000, 693.000000)"
          fillRule="nonzero"
        >
          <g id="Shape">
            <use
              fill="url(#technology-linearGradient-1)"
              xlinkHref="#technology-path-2"
            />
            <use
              fillOpacity="0.02"
              fill="url(#pattern-3)"
              xlinkHref="#path-2"
            />
          </g>
          <g id="Shape">
            <use
              fill="url(#technology-linearGradient-5)"
              xlinkHref="#technology-path-6"
            />
            <use
              fillOpacity="0.01"
              fill="url(#pattern-7)"
              xlinkHref="#path-6"
            />
          </g>
          <g id="Shape">
            <use
              fill="url(#technology-linearGradient-9)"
              xlinkHref="#technology-path-10"
            />
            <use
              fillOpacity="0.01"
              fill="url(#pattern-11)"
              xlinkHref="#path-10"
            />
          </g>
          <g id="Shape">
            <use
              fill="url(#technology-linearGradient-13)"
              xlinkHref="#technology-path-14"
            />
            <use
              fillOpacity="0.01"
              fill="url(#pattern-15)"
              xlinkHref="#path-14"
            />
          </g>
          <g id="technology-circle">
            <use fill="#3298FF" xlinkHref="#technology-path-17" />
            <use
              fillOpacity="0.01"
              fill="url(#pattern-18)"
              xlinkHref="#technology-path-17"
            />
            <circle
              id="Oval"
              fill="#00E833"
              cx="63.31912"
              cy="151.72998"
              r="10"
            />
          </g>
          <g id="technology-triangle">
            <use fill="#3298FF" xlinkHref="#technology-path-20" />
            <use
              fillOpacity="0.01"
              fill="url(#pattern-21)"
              xlinkHref="#technology-path-20"
            />
            <circle
              id="Oval"
              fill="#00E833"
              cx="119.91652"
              cy="102.17409"
              r="10"
            />
          </g>
          <g id="technology-rect">
            <use fill="#3298FF" xlinkHref="#technology-path-23" />
            <use
              fillOpacity="0.01"
              fill="url(#pattern-24)"
              xlinkHref="#technology-path-23"
            />
            <circle
              id="Oval"
              fill="#00E833"
              cx="179.91652"
              cy="208.23739"
              r="10"
            />
          </g>
        </g>
      </g>
    </g>
  </StyledSvg>
);

export default TechIndependent;
