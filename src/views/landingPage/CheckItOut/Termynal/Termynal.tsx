import React, { FC } from "react";
import { TermynalStyles } from "./styled";

export const Termynal: FC = () => (
  <TermynalStyles>
    <div id="termynal" data-termynal={true}>
      <span data-ty="input">kyma provision minikube</span>
      <span data-ty="input">kyma install -s 1.24.2</span>
    </div>
  </TermynalStyles>
);
