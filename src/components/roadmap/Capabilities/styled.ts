import styled from "@styled";
import Link from "@components/shared/Link";

export const NavigationList = styled.ul`
  margin: 0;
  padding: 0;
  margin-top: 53px;
`;

export const NavigationListItem = styled.li`
  margin-bottom: 8px;

  > a {
    display: block;
    width: 100%;
    padding: 9px 30px;
    font-size: 14px;
    color: #485766;
    font-weight: 500;
    background-color: #fff;
    border-radius: 8px;
    transition: all .3s ease-in-out;

    &:hover {
      color: #0b74de;
      background-color: rgba(11, 116, 222, 0.12);
    }
  }
`;

export const StyledReactMarkdown = styled.div`
  margin-top: 53px;

  h2, h3, h4, h5 {
    font-size: 24px;
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
`;
