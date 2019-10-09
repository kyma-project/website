import styled, { media } from "@styled";

import Adopters from "@static/img/adopters-bg.svg";

export const EarlyAdoptersWrapper = styled.div`
  position: relative;
  background: url(${Adopters}) no-repeat;
  background-size: 100% 100%;
  background-position: center;
  min-height: 600px;
  z-index: 1;
  justify-content: center;
  flex-direction: column;
  display: flex;
  margin-bottom: 160px;
  text-align: center;

  ${media.smallPhone`
    margin-bottom: 220px;
  `}

  @media (max-width: 1100px) {
    & {
      background-size: cover;
    }
  }

  .sprite-icon--twiggle {
    width: 159px;
    max-height: 35px;
  }
  .sprite-icon--netconomy {
    width: 173px;
    max-height: 22px;
    margin-top: 3px;
  }
  .sprite-icon--sap {
    width: 86px;
    max-height: 42px;
  }
  .sprite-icon--mgm {
    width: 89px;
    max-height: 31px;
    margin-top: 7px;
  }
  .sprite-icon--accenture-interactive {
    width: 270px;
    max-height: 24px;
    margin-top: -5px;
  }
  .sprite-icon--arithnea {
    width: 250px;
    max-height: 30px;
    margin-top: -2px;
  }
`;

export const EarlyAdoptersContent = styled.div``;

export const EarlyAdoptersList = styled.ul`
  margin: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-flow: row nowrap;

  ${media.tablet`
    flex-flow: row wrap;
  `};
`;

export const StyledEarlyAdoptersListItem = styled.li`
  margin: 10px 15px;
  text-align: center;

  > a > img {
    width: 100%;
    max-height: 62px;
    margin-top: -2px;
  }
`;
