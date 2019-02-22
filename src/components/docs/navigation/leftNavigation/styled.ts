import styled, { media } from "@styled";

interface LeftNavigationWrapperProps {
  visible?: boolean;
}

export const LeftNavigationWrapper = styled.div`
  background: #fff;
  display: ${(props: LeftNavigationWrapperProps) =>
    props.visible ? "block" : "none"};
`;

export const MobileDocsToggleWrapper = styled.div`
  position: relative;
  background: #fff;
  padding: 16px 0;
  cursor: pointer;
  border-bottom: 1px solid #e5e5e5;
  display: none;
  z-index: 6666;

  svg {
    margin-right: 16px;
  }

  ${media.tablet`
    display: block;
  `};
`;
