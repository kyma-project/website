import React, { FC } from "react";
import "./termynal.css";

export const Termynal: FC = () => (
  <div id="termynal" data-termynal={true}>
    <span data-ty="input">brew install kyma-cli</span>
    <span data-ty="input">kyma provision minikube</span>
    <span data-ty="input">kyma install</span>
    <span data-ty={true}>Installation successful! Happy Kyma-ing :)</span>
  </div>
);
