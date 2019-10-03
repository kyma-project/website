import styled, { media } from "@styled";

import Middle from "@static/img/middle.svg";

export const MakeSpecialWrapper = styled.section`
  position: relative;
  background: url(${Middle}) no-repeat;
  background-size: 100% 100%;
  min-height: 670px;
  z-index: 1;
  justify-content: center;
  flex-direction: column;
  display: flex;
  margin-top: 3.5%;
  margin-bottom: 0;
  color: #fff;

  ${media.tablet`
    padding: 50px 0 150px 0;
  `};
`;

export const MakesSpecialSvgWrapper = styled.div`
  ${media.tablet`
    text-align: center;
  `};
`;
