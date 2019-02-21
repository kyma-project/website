import React from "react";

import Icon from "@components/shared/Icon";

import { FormattedMessage } from "@common/i18n";

import { MobileDocsToggleWrapper } from "./styled";

interface MobileDocsToggleProps {
  toggleVisibility: () => void;
  visible: boolean;
}

const MobileDocsToggle: React.FunctionComponent<MobileDocsToggleProps> = ({
  toggleVisibility,
  visible,
}) => {
  const label = visible ? (
    <FormattedMessage id="docs.hideNavigationLabel" />
  ) : (
    <FormattedMessage id="docs.showNavigationLabel" />
  );

  return (
    <MobileDocsToggleWrapper onClick={toggleVisibility}>
      <Icon iconName="book" iconPrefix="fas" /> {label}
    </MobileDocsToggleWrapper>
  );
};

export default MobileDocsToggle;
