import React from "react";
import { translate } from "react-i18next";
import { displayHeaderWithLineBreaks } from "../../helpers/textWithLineBreaks";

const HeadlineComponent = ({ t }) => {
  const headline = t("headline");
  return (
    <div className="row">
      <h1 className="col-12 kyma-headline">
        {displayHeaderWithLineBreaks(headline)}
      </h1>
    </div>
  );
};

const Headline = translate("LandingPage")(HeadlineComponent);
export default Headline;
