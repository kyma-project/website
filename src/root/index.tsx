import React from "react";
import { ModalProvider } from "react-modal-hook";
import { RootProvider } from "./services";
import { ThemeProvider } from "@styled";
import { lightTheme } from "@styled/theme";
import { IntlProvider } from "@common/i18n";
import GlobalStyles from "@styled/GlobalStyles";

export const RootWrapper: React.FunctionComponent = ({ children }) => (
  <RootProvider>
    <IntlProvider>
      <ThemeProvider theme={lightTheme}>
        <>
          <GlobalStyles />
          <ModalProvider>{children}</ModalProvider>
        </>
      </ThemeProvider>
    </IntlProvider>
  </RootProvider>
);
