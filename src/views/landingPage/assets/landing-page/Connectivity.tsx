import React from "react";
import styled from "@styled";

const StyledSvg = styled.svg`
  max-width: 100%;
  padding: 5px;

  #connectivity-circle-small {
    transform-origin: 50% 50%;
    animation: connectivity-small 2s linear infinite;
  }

  #connectivity-circle-middle {
    transform-origin: 50% 50%;
    animation: connectivity-middle 2s linear infinite;
  }

  #connectivity-circle-big {
    transform-origin: 50% 50%;
    animation: connectivity-big 2s linear infinite;
  }

  @keyframes connectivity-small {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1) translate(-9px, -8px);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes connectivity-middle {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1) translate(-6px, 7px);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes connectivity-big {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05) translate(0, -1px);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const Connectivity = () => (
  <StyledSvg
    width="259px"
    height="252px"
    viewBox="-7 -5 269 258"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="connectivity-title"
  >
    <defs>
      <linearGradient
        x1="61.9382502%"
        y1="96.1752086%"
        x2="-41.466227%"
        y2="13.9243572%"
        id="connectivity-linearGradient-1"
      >
        <stop stopColor="#0B74DE" offset="0%" />
        <stop stopColor="#4D10E1" stopOpacity="0.8" offset="100%" />
      </linearGradient>
      <path
        d="M233.253,172.11023 C263.64882,130.043 251.2203,57.09238 202.7091,15.86666 C152.08586,-20.32759 65.92457,9.51932 19.446,79.3039 C-18.4304,145.89 3.45072,197.12214 61.73747,203.82884 C123.45214,218.7414 201.18013,209.873 233.253,172.11023 Z"
        id="connectivity-path-2"
      />
      <path
        d="M180.618607,182.57698 C180.618078,182.581528 180.617537,182.586078 180.616984,182.590628 L180.09758,186.957845 L177.098357,184.648095 L70.3725633,166.113703 C69.0122125,165.87746 68.1009435,164.583164 68.337187,163.222813 C68.5734305,161.862463 69.8677259,160.951193 71.2280767,161.187437 L168.589987,178.095663 L26.9036216,68.9807122 C25.8097045,68.138269 25.6058446,66.5685388 26.4482878,65.4746216 C27.290731,64.3807045 28.8604612,64.1768446 29.9543784,65.0192878 L176.17242,177.624155 L196.143496,9.70474956 C196.306558,8.33370034 197.550201,7.35443347 198.92125,7.51749579 C200.2923,7.6805581 201.271567,8.92420122 201.108504,10.2952504 L180.618607,182.57698 Z"
        id="connectivity-path-6"
      />
      <linearGradient
        x1="161.201345%"
        y1="138.816293%"
        x2="68.4696069%"
        y2="64.7725274%"
        id="connectivity-linearGradient-9"
      >
        <stop stopColor="#00E833" offset="0%" />
        <stop stopColor="#3197FE" offset="100%" />
      </linearGradient>
      <circle id="connectivity-path-10" cx="209" cy="27" r="27" />
      <circle id="connectivity-path-13" cx="75.80032" cy="191.65057" r="22.5" />
    </defs>
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-588.000000, -733.000000)">
        <g
          id="connectivity-Element-37"
          transform="translate(588.000000, 733.000000)"
        >
          <g
            id="connectivity-Oval-4"
            transform="translate(9.000000, 29.000000)"
          >
            <mask id="connectivity-mask-3" fill="white">
              <use xlinkHref="#connectivity-path-2" />
            </mask>
            <g id="connectivity-Mask" fillRule="nonzero">
              <use
                fill="url(#connectivity-linearGradient-1)"
                xlinkHref="#connectivity-path-2"
              />
            </g>
            <g
              id="connectivity-Combined-Shape"
              fillRule="nonzero"
              mask="url(#connectivity-mask-3)"
            >
              <use fill="#3298FF" xlinkHref="#connectivity-path-6" />
            </g>
            <circle
              fill="#00E833"
              fillRule="nonzero"
              mask="url(#connectivity-mask-3)"
              cx="180.5"
              cy="183.5"
              r="27.5"
            />
          </g>
          <g id="connectivity-circle-big">
            <circle
              id="connectivity-Oval"
              fill="url(#connectivity-linearGradient-9)"
              fillRule="nonzero"
              cx="43.4285"
              cy="97"
              r="42.71425"
            />
            <circle
              id="connectivity-Oval"
              fill="#00E833"
              fillRule="nonzero"
              cx="43.4285"
              cy="97"
              r="15.68591"
            />
          </g>
          <g id="connectivity-circle-middle" fillRule="nonzero">
            <use fill="#0B74DE" xlinkHref="#connectivity-path-10" />
            <use
              fillOpacity="0.01"
              fill="url(#connectivity-pattern-11)"
              xlinkHref="#connectivity-path-10"
            />
            <circle
              id="connectivity-middle-oval"
              fill="#00E833"
              fillRule="nonzero"
              cx="208.48197"
              cy="26.48197"
              r="7.48197"
            />
          </g>
          <g id="connectivity-circle-small" fillRule="nonzero">
            <use fill="#0B74DE" xlinkHref="#connectivity-path-13" />
            <use
              fillOpacity="0.01"
              fill="url(#connectivity-pattern-14)"
              xlinkHref="#connectivity-path-13"
            />
            <circle
              id="connectivity-Oval"
              fill="#00E833"
              fillRule="nonzero"
              cx="75.80032"
              cy="191.65057"
              r="6.23498"
            />
          </g>
        </g>
      </g>
    </g>
  </StyledSvg>
);

export default Connectivity;
