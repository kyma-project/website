
import React from "react";
import styled from "styled-components";

const StyledSvg = styled.svg`
 padding-right: 20px;
 padding-top: 30px;
 
 #star {
  &-top {
    transform-origin: 173px 135px;
    animation: special-star 6s linear infinite;
  }
  &-left {
    transform-origin: 79px 215px;
    animation: special-star-reverse 5s linear infinite;
  }
  &-right {
    transform-origin: 225px 250px;
    animation: special-star 4s linear infinite;
  }
}
@keyframes special-star {
  0% {
    opacity: 0;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1) rotate3d(0,0,1,20deg);
  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
}
@keyframes special-star-reverse {
  0% {
    opacity: 0;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1) rotate3d(0,0,1,-20deg);
  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
}
`;

const MakesSpecialSvg = () => (
  <StyledSvg
    width="555px"
    height="555px"
    viewBox="10 0 500 500"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="connectivity-title"
  >
    <path fill="#095EB3" d="M179.5,381.7c15.4-9.5,36-14.7,54-13.3c6.3,0.5,12.4,2.1,18.5,3.8c35.2,9.5,71.5,20.3,107.4,14
          c29-5.1,56.1-21.3,85.6-20.9c17,0.3,33.9,6.4,47.2,17.1c2.6,2.1,5.2,4.5,6.1,7.8c1.8,6.7-4.2,12.8-10,16.5
          c-18.7,12-41,16.6-63.1,19.2c-22,2.6-44.3,3.3-65.9,8.4c-25.7,6.1-51,18.6-77.2,15.4c-24.3-3-44.9-19.1-68.1-26.8
          c-7.8-2.6-15.9-4.2-23-8.3c-4.8-2.8-9.1-6.6-12.3-11.2c-3.1-4.4-5.2-9.8-4-15.1c1.2-5.2,7-9.5,12-7.6"/>
    <path fill="none" stroke="#00E833" strokeWidth="5" strokeLinecap="round" strokeMiterlimit="10" strokeDasharray="0,12" d="M160.5,307.5l-27-114 M317.5,246.5l-132.4,71.4 M298.5,96.6l37,119.9 M145.5,175.5l131-86 M40,106.5l79.8,66.3"/>
    <path fill="#00E833" d="M23,72c-8.4,0-15.3,6.8-15.3,15.3c0,8.4,6.8,15.3,15.3,15.3s15.3-6.8,15.3-15.3C38.2,78.8,31.4,72,23,72z
           M21.5,82.6v11.1l-6.1,1L21.5,82.6z M21.5,98.8l-6.1-3h16.2L21.5,98.8z M22.5,93.8V74.5l9.1,20.2C31.6,94.7,22.5,93.8,22.5,93.8z"/>
    <path fill="#052D54" d="M387.268,343.365l10.332-21.662l3.701,1.765l-10.332,21.662L387.268,343.365z"/>
    <path fill="#052D54" d="M324.504,307.389l5.64-11.824l68.867,32.848l-5.64,11.824L324.504,307.389z"/>
    <circle fill="#052D54" cx="320.5" cy="326" r="8.2"/>
    <path fill="#052D54" d="M317.7,339h5.5v81.1h-5.5V339z"/>
    <path fill="#052D54" d="M314.991,339.487l4.763,2.75l-44.65,77.336l-4.763-2.75L314.991,339.487z"/>
    <path fill="#052D54" d="M369.911,416.877l-4.763,2.75l-44.65-77.336l4.763-2.75L369.911,416.877z"/>
    <path fill="#052D54" d="M301.9,337.7H339v4.1h-37.1V337.7z"/>
    <path fill="#063A6E" d="M288.004,296.072l10.332-21.662l68.867,32.848l-10.332,21.662L288.004,296.072z"/>
    <path fill="#074480" d="M240.544,282.437l17.134-35.923l68.867,32.848l-17.134,35.923L240.544,282.437z"/>
    <path fill="#00E833" d="M131.1,166.1c-8.4,0-15.3,6.8-15.3,15.3c0,8.4,6.8,15.3,15.3,15.3s15.3-6.8,15.3-15.3
          C146.3,172.9,139.5,166.1,131.1,166.1z M131.1,191.6c-1.9,0-3.5-1.3-3.5-2.9h7C134.6,190.3,133,191.6,131.1,191.6z M136.8,187.7
          h-11.5v-2.1h11.5V187.7z M136.8,184.6h-11.5l-0.1-0.1c-1.2-1.4-1.5-2.2-1.7-2.9c0,0,1.4,0.3,2.4,0.5c0,0,0.5,0.1,1.3,0.3
          c-0.7-0.9-1.2-2-1.2-3.1c0-2.5,1.9-4.6,1.2-6.3c0.7,0.1,1.4,1.4,1.4,3.5c0.7-1,1-2.7,1-3.8s0.7-2.4,1.5-2.5c-0.7,1.1,0.2,2,0.9,4.4
          c0.3,0.9,0.2,2.3,0.5,3.3c0.1-1.9,0.4-4.8,1.6-5.7c-0.5,1.2,0.1,2.8,0.5,3.5c0.7,1.2,1.1,2.1,1.1,3.8c0,1.1-0.4,2.2-1.1,3.1
          c0.8-0.2,1.4-0.3,1.4-0.3l2.6-0.5C138.7,181.5,138.3,183.1,136.8,184.6z M167.9,311.7c-8.4,0-15.3,6.8-15.3,15.3
          c0,8.4,6.8,15.3,15.3,15.3c8.4,0,15.3-6.8,15.3-15.3C183.2,318.6,176.4,311.7,167.9,311.7z M176.9,332.5h-5.1l-10.3-9.6v9.6H158
          v-12.4h5.4l10.1,9.6v-9.6h3.3v12.4H176.9z M290.3,62.4c-8.4,0-15.3,6.8-15.3,15.3c0,8.4,6.8,15.3,15.3,15.3
          c8.4,0,15.3-6.8,15.3-15.3S298.8,62.4,290.3,62.4z M289.8,84.8c0,0.2-0.1,0.3-0.3,0.3h-8c-0.2,0-0.3-0.1-0.3-0.3v-14
          c0-0.2,0.1-0.3,0.3-0.3h1.9c0.2,0,0.3,0.1,0.3,0.3v11.7h5.8c0.2,0,0.3,0.1,0.3,0.3L289.8,84.8L289.8,84.8z M289.8,80.7
          c0,0.2-0.1,0.3-0.3,0.3h-4c-0.2,0-0.3-0.1-0.3-0.3v-4c0-0.2,0.1-0.3,0.3-0.3h4c0.2,0,0.3,0.1,0.3,0.3V80.7z M289.8,74.9
          c0,0.2-0.1,0.3-0.3,0.3h-4c-0.2,0-0.3-0.1-0.3-0.3v-4c0-0.2,0.1-0.3,0.3-0.3h4c0.2,0,0.3,0.1,0.3,0.3V74.9z M290.9,70.9
          c0-0.2,0.1-0.3,0.3-0.3h4c0.2,0,0.3,0.1,0.3,0.3v4c0,0.2-0.1,0.3-0.3,0.3h-4c-0.2,0-0.3-0.1-0.3-0.3V70.9z M295.6,76.7v4
          c0,0.2-0.1,0.3-0.3,0.3h-4c-0.2,0-0.3-0.1-0.3-0.3v-4c0-0.2,0.1-0.3,0.3-0.3h4C295.4,76.4,295.6,76.5,295.6,76.7z M299.6,82.9v1.9
          c0,0.2-0.1,0.3-0.3,0.3h-8c-0.2,0-0.3-0.1-0.3-0.3v-1.9c0-0.2,0.1-0.3,0.3-0.3h5.8V70.7c0-0.2,0.1-0.3,0.3-0.3h1.9
          c0.2,0,0.3,0.1,0.3,0.3L299.6,82.9L299.6,82.9z"/>
    <g>
      <path fill="#00E833" d="M331.7,232.8c0.2-0.3,0.2-0.6-0.1-0.8l-2.7-2.4c-0.8,1.3-1.2,2.9-1,4.4l3.5-1
            C331.5,233,331.6,232.9,331.7,232.8L331.7,232.8z M333.2,230.5c0.3,0,0.6-0.3,0.6-0.6l0.2-3.6l-0.7,0.1c-1.3,0.3-2.4,0.9-3.4,1.8
            l3,2.1C333.1,230.4,333.1,230.5,333.2,230.5z M331.9,235.1l-3.6,0.6c0.5,1.4,1.5,2.7,2.8,3.5l1.4-3.3c0.1-0.1,0.1-0.3,0-0.4
            C332.4,235.3,332.2,235.1,331.9,235.1L331.9,235.1z M334,234.1l0.9,0.5l1-0.5l0.3-1.1l-0.7-0.8h-1.1l-0.7,0.8L334,234.1z
             M336.1,230.2c0.2,0.3,0.5,0.3,0.8,0.1l3-2.1c-1.1-1.1-2.5-1.8-4.1-1.9l0.2,3.6C336,230.1,336,230.2,336.1,230.2L336.1,230.2z
             M337.6,235.1c-0.3,0.1-0.4,0.4-0.3,0.7l1.4,3.4c0.9-0.5,1.6-1.3,2.2-2.2c0.3-0.4,0.5-0.9,0.7-1.4L338,235
            C337.9,235.1,337.8,235.1,337.6,235.1L337.6,235.1z"/>
      <path fill="#00E833" d="M334.9,218.3c-8.4,0-15.3,6.8-15.3,15.3c0,8.4,6.8,15.3,15.3,15.3s15.3-6.8,15.3-15.3
            C350.1,225.2,343.3,218.3,334.9,218.3z M346.3,236.5h-0.2h-0.2c-0.1,0-0.3-0.1-0.4-0.2c-0.1,0-0.1,0-0.2-0.1
            c-0.4-0.1-0.8-0.3-1.2-0.3c-0.1,0-0.2,0-0.3,0.1h-0.3c-0.6,2.1-2.1,3.8-3.9,4.9l0.1,0.3c-0.1,0.1-0.1,0.3,0,0.4
            c0.1,0.4,0.3,0.7,0.6,1v0.1c0.1,0.1,0.1,0.1,0.1,0.2c0.1,0.1,0.2,0.2,0.3,0.4l0.1,0.1c0.1,0.2,0.1,0.4,0,0.5s-0.2,0.3-0.3,0.4
            c-0.1,0-0.2,0.1-0.3,0.1c-0.3,0-0.5-0.2-0.7-0.4c0,0,0-0.1-0.1-0.1c-0.1-0.1-0.1-0.3-0.1-0.4l-0.1-0.2c-0.1-0.4-0.3-0.8-0.5-1.1
            c-0.1-0.1-0.2-0.2-0.3-0.2l-0.1-0.3c-0.4,0.1-0.8,0.3-1.2,0.3c-0.6,0.2-1.3,0.3-1.9,0.3c-1.1,0-2.1-0.2-3.1-0.6L332,242
            c-0.1,0-0.2,0.1-0.3,0.2c-0.2,0.4-0.4,0.7-0.5,1.1l-0.1,0.2c0,0.1-0.1,0.3-0.1,0.4l-0.1,0.1c-0.1,0.3-0.4,0.4-0.7,0.4
            c-0.1,0-0.2,0-0.3-0.1c-0.3-0.2-0.5-0.6-0.3-1c0,0,0-0.1,0.1-0.1c0.1-0.1,0.2-0.3,0.3-0.4c0.1-0.1,0.1-0.1,0.1-0.2
            c0.2-0.3,0.4-0.7,0.6-1v-0.4l0.2-0.3c-0.4-0.2-0.6-0.4-1-0.6c-1.4-1.1-2.4-2.6-3-4.2h-0.3c-0.1-0.1-0.2-0.1-0.3-0.1l-1.2,0.3
            c-0.1,0-0.1,0-0.2,0.1c-0.1,0-0.3,0.1-0.4,0.1h-0.3c-0.3,0-0.6-0.2-0.7-0.5c-0.1-0.4,0.2-0.8,0.6-0.8h0.8c0.4,0,0.8-0.1,1.2-0.2
            c0.1-0.1,0.2-0.1,0.3-0.3l0.3-0.1c-0.3-2.1,0.1-4.2,1.3-5.9c0-0.1,0.1-0.1,0.1-0.2l-0.2-0.2c0-0.1,0-0.2-0.1-0.3
            c-0.3-0.3-0.6-0.5-1-0.7c-0.1,0-0.1-0.1-0.2-0.1c-0.1-0.1-0.3-0.1-0.4-0.2l-0.1-0.1c-0.3-0.3-0.4-0.7-0.1-1
            c0.1-0.2,0.3-0.3,0.5-0.3s0.4,0.1,0.5,0.2c0,0,0.1,0,0.1,0.1l0.3,0.3l0.1,0.1c0.3,0.3,0.6,0.6,0.9,0.8c0.1,0,0.1,0.1,0.2,0.1h0.1
            l0.2,0.1c1.2-1.3,2.7-2.2,4.4-2.5c0.4-0.1,0.8-0.1,1.2-0.2v-0.4c0.1-0.1,0.1-0.2,0.2-0.3c0-0.4,0-0.8-0.1-1.2v-0.2
            c0-0.1-0.1-0.3-0.1-0.4v-0.2c0-0.2,0.1-0.4,0.2-0.5c0.2-0.2,0.4-0.3,0.6-0.3c0.4,0,0.6,0.4,0.6,0.8v0.2c0,0.1,0,0.3-0.1,0.4v0.2
            c-0.1,0.4-0.1,0.8-0.1,1.2c0,0.1,0.1,0.2,0.2,0.3v0.3c1.7,0.2,3.4,0.8,4.7,1.9l0.9,0.9l0.3-0.2h0.1c0.1,0,0.1,0,0.2-0.1
            c0.3-0.2,0.6-0.5,0.9-0.8l0.1-0.1l0.3-0.3c0,0,0.1,0,0.1-0.1c0.1-0.1,0.3-0.2,0.5-0.2s0.4,0.1,0.5,0.3c0.3,0.3,0.2,0.8-0.1,1v0.1
            c0,0-0.1,0-0.1,0.1c-0.1,0.1-0.3,0.1-0.4,0.2c-0.1,0-0.1,0.1-0.2,0.1c-0.4,0.2-0.7,0.4-1,0.7c-0.1,0.1-0.1,0.2-0.1,0.3l-0.2,0.2
            c0.6,0.9,1,1.9,1.3,3c0.2,1,0.3,2.1,0.1,3.2l0.3,0.1c0,0.1,0.1,0.2,0.3,0.3c0.4,0.1,0.8,0.2,1.2,0.2h0.8c0.3,0.1,0.6,0.4,0.6,0.8
            C346.9,236.3,346.6,236.5,346.3,236.5L346.3,236.5z"/>
      <path fill="#00E833" d="M335.2,236.7c-0.3-0.1-0.5-0.1-0.7,0.1l-1.8,3.2c0.7,0.2,1.5,0.4,2.3,0.4c0.5,0,1-0.1,1.6-0.2
            c0.3-0.1,0.5-0.1,0.7-0.1l-1.7-3.1C335.3,236.8,335.3,236.7,335.2,236.7L335.2,236.7z M340.9,229.6l-2.7,2.5
            c-0.1,0.1-0.1,0.1-0.1,0.3c-0.1,0.3,0.1,0.6,0.4,0.7l3.4,1c0.1-0.8,0-1.5-0.1-2.3C341.6,231,341.3,230.3,340.9,229.6L340.9,229.6z"/>
      <path fill="#FFFFFF" d="M248.5,177.3"/>
    </g>
    <circle fill="#00E833" cx="273.6" cy="153.5" r="2.6"/>
    <circle fill="#00E833" cx="72.7" cy="50.8" r="2.6"/>
    <circle fill="#00E833" cx="61.4" cy="165.1" r="2.6"/>
    <polygon id="star-top" fill="#FCD100" points="170.9,138.3 177,136.7 170.9,135.1 169.3,129 167.7,135.1 161.7,136.7 167.7,138.3 169.3,144.3 "/>
    <polygon id="star-right" fill="#FCD100" points="228.4,253.8 234.5,252.2 228.4,250.6 226.8,244.5 225.2,250.6 219.1,252.2 225.2,253.8 226.8,259.9"/>
    <path id="star-left" fill="#FCD100" d="M81.9,218.5l6-1.6l-6-1.6l-1.6-6.1l-1.6,6.1l-6.1,1.6l6.1,1.6l1.6,6.1L81.9,218.5z"/>
  </StyledSvg>
);

export default MakesSpecialSvg;
