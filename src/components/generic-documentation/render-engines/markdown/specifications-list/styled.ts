import styled, { media } from "@styled";

export const SpecificationsListWrapper = styled.ul`
  padding: 0;
  margin: 24px 0 0 0;
  list-style: none;
`;

export const SpecificationsListHeader = styled.h4`
  font-size: 14px;
  color: rgb(0, 115, 230);
  font-weight: normal;
  display: block;
  margin: 0 0 12px 0;
  padding: 0;

  ${media.phone`
    margin-left: 16px;
  `};
`;

interface SpecificationsListItemProps {
  active?: boolean;
}

export const SpecificationsListItem = styled.li<SpecificationsListItemProps>`
  width: 100%;
  max-width: 100%;
  position: relative;
  margin: 0;
  padding: 0;

  a {
    font-size: 12px;
    padding: 4px 24px 4px 12px;
    margin-left: 4px;
    color: #485766;
    font-weight: normal;
    display: block;
    position: relative;
    border-left: 1px solid rgb(229, 229, 229);

    &:before {
      content: "";
      position: absolute;
      width: 7px;
      height: 7px;
      background: rgb(229, 229, 229);
      border-radius: 100%;
      transform: translateY(-50%);
      top: 50%;
      left: -4px;
      display: block;
      z-index: 2;
    }
  }

  span {
    font-size: 14px;
    padding-top: 6px;
    padding-bottom: 6px;
  }
`;

export const SpecificationsListItemName = styled.div`
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
`;
