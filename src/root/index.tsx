import React from "react";
import { ModalProvider } from "react-modal-hook";
import { LocationProvider } from "@reach/router";

import { ThemeProvider } from "@styled";
import { lightTheme } from "@styled/theme";
import GlobalStyles from "@styled/GlobalStyles";

import { IntlProvider } from "@common/i18n";
import { default as PopupService } from "@common/state/usePopup";

import { RootProvider } from "./services";
import { Popup } from "./components";

export const RootWrapper: React.FunctionComponent = ({ children }) => (
  <RootProvider>
    <LocationProvider>
      <IntlProvider>
        <ThemeProvider theme={lightTheme}>
          <div id="kyma-project-io-wrapper">
            <GlobalStyles />
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
