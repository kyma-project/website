import React from "react";
import { ModalProvider } from "react-modal-hook";
import { LocationProvider } from "@reach/router";

import { ThemeProvider } from "@styled";
import { lightTheme } from "@styled/theme";

import { IntlProvider } from "@common/i18n";
import { default as PopupService } from "@common/state/usePopup";

import { RootProvider } from "./services";
import { Popup } from "./components";

import "../styles/css/fonts.css";
import "../styles/css/typography.css";
import "../styles/css/global.css";
import "../styles/css/docsearch.min.css";

export const RootWrapper: React.FunctionComponent = ({ children }) => (
  <RootProvider>
    <LocationProvider>
      <IntlProvider>
        <ThemeProvider theme={lightTheme}>
          <div id="kyma-project-io-wrapper">
            <PopupService.Provider>
              <ModalProvider>{children}</ModalProvider>
              <Popup />
            </PopupService.Provider>
          </div>
        </ThemeProvider>
      </IntlProvider>
    </LocationProvider>
  </RootProvider>
);
