import React from "react";

import Link from "@components/shared/Link";
import Icon from "@components/shared/Icon";

import {
  injectIntl,
  FormattedMessage,
  IntlInterface,
  getTranslation,
} from "@common/i18n";
import config from "@config";

import { StyledCookieBanner, ReadPrivacyStatementLink } from "./styled";

const gt = getTranslation("cookies");

const CookiesMessageBanner: React.FunctionComponent<IntlInterface> = ({
  formatMessage,
}) => (
  <StyledCookieBanner
    disableStyle={true}
    dismissOnScroll={false}
    message={formatMessage({ id: "message" })}
    link={
      <>
        <FormattedMessage id={gt("readPrivacyStatement")}>
          {readPrivacyStatement => (
            <ReadPrivacyStatementLink
              to={config.links.SAP_PRIVACY_LINK}
              externalIcon
            >
              {readPrivacyStatement}
            </ReadPrivacyStatementLink>
          )}
        </FormattedMessage>
      </>
    }
    buttonMessage={formatMessage({ id: "closeButton" })}
  />
);

export default injectIntl("cookies")(CookiesMessageBanner);
