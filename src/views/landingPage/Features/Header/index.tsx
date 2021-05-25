import React from "react";

import H from "@components/shared/H";

import {
  FormattedMessage,
  getTranslation,
  FunctionComponentIntl,
  injectIntl,
} from "@common/i18n";

import { HeaderWrapper } from "./styled";

const gt = getTranslation("landingPage.keyFeatures");

const HeaderRaw: FunctionComponentIntl = ({ formatMessage }) => (
  <HeaderWrapper>
    <H as="h2">
      <FormattedMessage id={gt("headline")} tagName={React.Fragment} />
    </H>
  </HeaderWrapper>
);

export const Header = injectIntl("landingPage.keyFeatures")(HeaderRaw);
