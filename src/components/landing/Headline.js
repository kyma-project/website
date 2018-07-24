import React from "react";
import { translate } from "react-i18next";

const HeadlineComponent = ({ t }) => {
  return (
    <div className="row">
      <h1 className="col-12 kyma-headline">
        A flexible and easy <br />way to connect and extend <br />enterprise applications <br />in a cloud-native world
      </h1>
    </div>);
};

const Headline = translate("LandingPage")(HeadlineComponent);
export default Headline;
