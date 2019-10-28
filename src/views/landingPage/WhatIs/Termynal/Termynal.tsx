import React, { FC } from "react";
import { TermynalStyles } from "./styled";

export const Termynal: FC = () => (
  <TermynalStyles>
    <div id="termynal" data-termynal={true}>
      <span data-ty="input">brew install kyma-cli</span>
      <span data-ty="input">kyma provision minikube</span>
      <span data-ty="input">kyma install</span>
      <span data-ty={true}>Installation successful! Happy Kyma-ing :)</span>
    </div>
  </TermynalStyles>
);
