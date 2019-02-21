import styled, { media } from "@styled";
import { Link } from "gatsby";

interface LinkProps {
  withUnderline?: boolean;
}

export const ExternalLink = styled.a`
  cursor: pointer;
  color: #0073e6;

  &:active,
  &:focus,
  &:hover {
    ${(props: LinkProps) =>
      props.withUnderline ? "text-decoration: underline #0073e6" : "none"};
  }

  svg[data-icon="external-link-alt"] {
    top: -2px;
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
      props.withUnderline ? "text-decoration: underline #0073e6" : "none"};
  }
`;

export const HashLinkWithIcon = styled.div`
  > * {
    display: inline-block;
  }

  > a {
    margin-left: 12px;
    font-size: 1rem;
    visibility: hidden;
    color: #0073e6;
  }

  &:hover {
    > a {
      visibility: visible;
    }
  }

  svg[data-icon="anchor"] {
    top: -2px;
    margin-left: 4px;
  }

  ${media.tablet`
    > a {
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
      props.withUnderline ? "text-decoration: underline #0073e6" : "none"};
  }
`;
