import React, { FC } from "react";
import { TermynalStyles } from "./styled";

export const Termynal: FC = () => (
  <TermynalStyles>
    <div id="termynal" data-termynal={true}>
      <span data-ty="input">kyma provision k3s</span>
      <span data-ty="input">kyma deploy</span>
    </div>
  </TermynalStyles>
);
