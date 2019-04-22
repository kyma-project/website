import styled, { media } from "@styled";

import Roadmap from "@static/img/roadmap.svg";

export const Wrapper = styled.div`
  position: relative;
  margin-bottom: 0;

  ${media.tablet`
    padding: 50px 0 150px 0;
  `};
`;

export const HeaderWrapper = styled.header`
  > h2 {
    text-align: center;
  }
`;

export const TicketWrapper = styled.div`
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 2px 0 rgba(11, 116, 222, 0.06);
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    box-shadow: 0 2px 26px 0 rgba(11, 116, 222, 0.49);
  }
`;

export const TicketHeader = styled.header`
  background: #2068df;
  color: #fff;
  position: relative;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  > div {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background-image: linear-gradient(
      244deg,
      rgba(0, 232, 51, 0.5),
      rgba(60, 144, 228, 0)
    );
    padding: 24px 16px 16px;

    > h3 {
      font-size: 14px;
      font-weight: 500;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.57;
      letter-spacing: normal;
      color: #fff;
      margin-bottom: 0;
    }
  }
`;

export const TicketContent = styled.div`
  padding: 16px 16px 24px;

  > span {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.86;
    color: #0b74de;
  }

  > h4 {
    font-size: 18px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.33;
    margin-bottom: 0;
  }
`;
