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
      onClick={() => {
        if (orientation === "left") {
          setShowMobileLeftNav(state => !state);
          return;
        }
        setShowMobileRightNav(state => !state);
      }}
      orientation={orientation}
      showMobileNav={
        orientation === "left" ? showMobileLeftNav : showMobileRightNav
      }
    >
      <Icon iconName={iconName} iconPrefix="fas" />
    </MobileNavIcon>
  );
};
