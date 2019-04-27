import styled, { css } from "@styled";
import Link from "@components/shared/Link";

export const Wrapper = styled.div`
  margin-top: 52px;
`;

/* Navigation */
export const NavigationList = styled.ul`
  margin: 0;
  padding: 0;
`;

interface NavigationListItemProps {
  active: boolean;
}

export const NavigationListItem = styled.li`
  margin-bottom: 8px;

  > a {
    display: block;
    position: relative;
    width: 100%;
    padding: 9px 16px 9px 54px;
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
  margin-left: 20px;
  height: 38px;
  line-height: 38px;
  position: relative;

  > span {
    display: inline-block;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    vertical-align: middle;
  }
`;

/* Content */
export const ContentWrapper = styled.section`
  padding-left: 52px;
`;

export const CapabilityWrapper = styled.article`
  border-bottom: solid 1px #d5dce3;
  padding: 72px 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
`;

export const Header = styled.header`
  h2 {
    font-size: 32px;
    line-height: 1.19;
    margin-top: 32px;
    margin-left: 24px;
  }

  button {
    margin-left: 24px;
  }

  svg {
    height: 162px;
  }
`;

export const StyledReactMarkdown = styled.div`
  &&& {
    h2,
    h3,
    h4,
    h5 {
      font-size: 24px;
      display: inline-block;
      margin-top: 36px;
    }

    a[href^="#"] {
      display: none;
    }

    ul {
      list-style: none;

      > li {
        margin-bottom: 16px;
        padding-left: 16px;
        position: relative;

        &:before {
          content: "•";
          position: absolute;
          left: -16px;
          color: #0b74de;
          display: inline-block;
        }
      }
    }
  }
`;
