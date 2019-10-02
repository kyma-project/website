import React, { useContext } from "react";

import Icon from "@components/shared/Icon";

import { GenericDocsContext } from "../../services";

import { MobileNavIcon } from "./styled";

interface MobileNavButtonProps {
  orientation?: string;
  iconName?: string;
}

export const MobileNavButton: React.FunctionComponent<MobileNavButtonProps> = ({
  orientation = "left",
  iconName = "bars",
}) => {
  const {
    showMobileLeftNav,
    setShowMobileLeftNav,
    showMobileRightNav,
    setShowMobileRightNav,
  } = useContext(GenericDocsContext);

  return (
    <MobileNavIcon
      onClick={(_: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        orientation === "left"
          ? setShowMobileLeftNav(state => !state)
          : setShowMobileRightNav(state => !state);
      }}
      orientation={orientation}
      showMobileLeftNav={showMobileLeftNav}
      showMobileRightNav={showMobileRightNav}
    >
      <Icon iconName={iconName} iconPrefix="fas" />
    </MobileNavIcon>
  );
};
