import styled, { media } from "@styled";

export const StyledLink = styled.a`
  align-self: flex-end;

  ${media.tablet`
    position: relative;
    top: 10px;
  `};
`;

export const RSSIcon = styled.div`
  position: relative;
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  box-shadow: 0 1px 26px 0 rgba(137, 165, 199, 0.42);
  background: #fff;
  transition: all 0.2s linear, opacity 0.2s linear;

  &:hover {
    cursor: pointer;
    background: #0b74de;

    > svg {
      color: #fff;
    }
  }

  > svg {
    color: #0b74de;
    font-size: 24px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    transition: color 0.2s linear, opacity 0.2s linear;

    ${media.phone`
      font-size: 28px;
    `};
  }
`;
