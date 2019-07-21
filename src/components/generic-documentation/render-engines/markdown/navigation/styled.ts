import styled, { media, css } from "@styled";

export const NavigationWrapper = styled.div`
  margin: 15px 0 0 0;
`;

export const NavigationList = styled.ul`
  padding: 0;
  margin: 15px 0 0 0;
  list-style: none;
`;

interface NavigationListItemProps {
  active: boolean;
}

export const NavigationListItem = styled.li`
  margin-bottom: 9px;

  > a {
    display: block;
    position: relative;
    width: 100%;
    padding: 9px 16px;
    font-size: 14px;
    color: #485766;
    font-weight: 500;
    background-color: #fff;
    border-radius: 8px;
    transition: all 0.3s ease-in-out;

    ${(props: NavigationListItemProps) =>
      props.active
        ? css`
            color: #0b74de;
            background-color: rgba(11, 116, 222, 0.12);
          `
        : ""}

    &:hover {
      ${(props: NavigationListItemProps) =>
        props.active
          ? css`
              background-color: rgba(11, 116, 222, 0.26);
            `
          : css`
              background-color: rgba(11, 116, 222, 0.12);
            `}
      color: #0b74de;
    }

    > svg {
      position: absolute;
      left: 16px;
      top: 50%;
      height: 38px;
      margin-right: 6px;
      transform: translate(0, -50%);
    }
  }
`;

export const NavigationListItemName = styled.div`
  display: inline-block;
  line-height: 14px;
  position: relative;

  > span {
    display: inline-block;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    vertical-align: middle;
  }

  ${media.tablet`
    > span {
      display: none;
    }
  `};
`;

export const NavigationGroupName = styled.div`
  margin-top: 15px;
  font-size: 12px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  color: rgba(72, 87, 102, 0.6);
  text-transform: uppercase;
`;
