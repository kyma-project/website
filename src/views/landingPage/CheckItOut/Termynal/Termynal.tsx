import React, { FC } from "react";
import { TermynalStyles } from "./styled";

export const Termynal: FC = () => (
  <TermynalStyles>
    <div id="termynal" data-termynal={true}>
      <span data-ty="input">
        curl -Lo kyma https://storage.googleapis.com/kyma-cli-stable/kyma-darwin
      </span>
      <span data-ty="input">chmod +x kyma</span>
      <span data-ty="input">kyma provision k3d</span>
      <span data-ty="input">kyma deploy</span>
    </div>
  </TermynalStyles>
);
