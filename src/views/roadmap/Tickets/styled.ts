import styled, { media } from "@styled";

import Grid from "@styled/Grid";

import RoadmapTop from "@static/img/roadmap-top.svg";

export const Wrapper = styled.div`
  position: relative;
  margin-top: 72px;
  margin-bottom: -132px;
  padding-bottom: 72px;
  padding-top: 32px;
  background: url(${RoadmapTop}) top center no-repeat;
  background-size: cover 100%;

  &:after {
    content: "";
    position: absolute;
    z-index: -1;
    background: #e2edf5;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  ${media.tablet`
    padding: 56px 0 72px 0;
  `};
`;

export const HeaderWrapper = styled.header`
  z-index: 2;

  h2 {
    text-align: center;
    margin-bottom: 0;
  }

  p {
    text-align: center;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const RoadmapLinkWrapper = styled.div`
  display: inline-block;
  text-align: center;
  margin-bottom: 30px;

  a {
    display: inline-block;
    color: #485766;
  }
`;

/* Release */
export const ReleaseWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

interface ReleaseHeaderProps {
  futurePlanned: boolean;
}

export const ReleaseHeader = styled.header`
  background: inherit;
  color: ${(props: ReleaseHeaderProps) =>
    !props.futurePlanned ? `#0b74de` : `#485766`};

  > h3 {
    text-align: center;
    margin: 0;

    ${media.phone`
      text-align: left;
    `}
  }
`;

export const ReleaseTicketsWrapper = styled.div`
  ${Grid.Container} > ${Grid.Row} > ${Grid.Unit} {
    padding: 0;
  }

  ${Grid.Container}:first-child > ${Grid.Row} > ${Grid.Unit} {
    padding-top: 32px;
  }

  ${Grid.Container}:last-child > ${Grid.Row} > ${Grid.Unit} {
    padding-bottom: 70px;
  }

  ${media.phone`
    ${Grid.Container}:last-child > ${Grid.Row} > ${Grid.Unit} {
      padding-bottom: 38px;
    }

    ${Grid.Container} > ${Grid.Row} {
      margin: 0 30px;

      > ${Grid.Unit} {
        padding-bottom: 32px;
      }
    }
  `};

  ${media.smallPhone`
    ${Grid.Container} > ${Grid.Row} {
      margin: 0 15px;
    }
  `};
`;

/* Ticket */
interface TicketsWrapperProps {
  rightBorder?: boolean;
  futurePlanned: boolean;
}

export const TicketsWrapper = styled(Grid.Unit)`
  padding: 40px 0;
  margin: 0;

  ${(props: TicketsWrapperProps) =>
    props.rightBorder
      ? `
    border-right: ${
      !props.futurePlanned ? `1px solid #3298fe` : `1px dashed #7e98b1`
    }
  `
      : `
    border-left: ${
      !props.futurePlanned ? `1px solid #3298fe` : `1px dashed #7e98b1`
    }
  `};

  ${media.phone`
    border-left: ${(props: TicketsWrapperProps) =>
      !props.futurePlanned ? `1px solid #3298fe` : `1px dashed #7e98b1`}
    border-right: none;
  `};
`;

interface TicketsRowProps {
  order: number;
}

export const TicketsRow = styled(Grid.Row)`
  position: relative;

  ${(props: TicketsRowProps) =>
    props.order % 2
      ? `
    margin-right: 32px;
    padding-left: 16px;

    > ${Grid.Unit} {
      padding-left: 0;
    }
  `
      : `
    margin-left: 32px;
    padding-right: 16px;

    > ${Grid.Unit} {
      padding-right: 0;
    }
  `}

  ${media.phone`
    margin-right: inherit;
    padding-left: inherit;
    margin-left: 32px;
    padding-right: 16px;

    > ${Grid.Unit} {
      padding-right: 0;
      padding-left: inherit;
    }
  `};
`;

interface TicketsIconProps {
  order: number;
}

export const TicketsIcon = styled.div`
  position: absolute;
  top: 0;

  ${(props: TicketsIconProps) =>
    props.order % 2
      ? `
    right: -33px;
  `
      : `
    left: -33px;
  `}

  ${media.phone`
    ${(props: TicketsIconProps) =>
      props.order % 2
        ? `
      left: -78px;
      right: inherit;
    `
        : `
      left: -33px;
    `}
  `};

  background: #fff;
  width: 47px;
  height: 47px;
  border-radius: 100%;
  padding: 7px;
  box-shadow: 0 1px 26px 0 rgba(137, 165, 199, 0.42);
  transform: ${props =>
    props.order % 2 === 0 ? `translateX(-50%)` : `translateX(50%)`};
`;

export const TicketModalWrapper = styled.div`
  display: flex;
  flex: 1;

  > a {
    display: flex;
    flex: 1;
  }
`;

export const TicketWrapper = styled.div`
  width: 100%;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 26px 0 rgba(11, 116, 222, 0.2);
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
  color: #485766;

  > span {
    display: block;
    text-align: left;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.86;
    color: #0b74de;
    margin-bottom: 8px;
  }

  > h4 {
    font-size: 16px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.33;
    margin-bottom: 0;
  }
`;
