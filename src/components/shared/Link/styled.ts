import styled, { media } from "@styled";
import { Link } from "gatsby";

interface LinkProps {
  underline?: string;
}

export const ExternalLink = styled.a`
  cursor: pointer;
  color: #0073e6;

  &:active,
  &:focus,
  &:hover {
    ${(props: LinkProps) =>
      props.underline === "true" ? "border-bottom: 1px solid #0073e6" : ""}
  }

  svg[data-icon="external-link-alt"] {
    position: relative;
    z-index: 101;
    top: -1px;
    margin-left: 4px;
    font-size: 0.6rem;
  }
`;

export const InternalLink = styled(Link)`
  color: #0073e6;

  &:active,
  &:focus,
  &:hover {
    ${(props: LinkProps) =>
      props.underline === "true"
        ? "text-decoration: underline #0073e6"
        : "none"};
  }
`;

export const HashLinkWithIcon = styled.div`
  > * {
    display: inline-block;
  }

  > div {
    padding-right: 25px;
    margin-bottom: 1.6rem !important;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-bottom: 0;
      display: inline;
    }
  }

  a {
    font-size: 1rem;
    visibility: hidden;
    color: #0073e6;
    top: 50%;
    right: 0;
    margin-left: 0;
    transform: translateY(-50%);
  }

  > div:hover {
    a {
      visibility: visible;
    }
  }

  svg[data-icon="link"] {
    margin-left: 12px;
  }

  ${media.tablet`
    a {
      visibility: visible;
    }
  `};
`;

export const HashLink = styled.a`
  color: #0073e6;

  &:active,
  &:focus,
  &:hover {
    ${(props: LinkProps) =>
      props.underline === "true"
        ? "text-decoration: underline #0073e6"
        : "none"};
  }
`;
