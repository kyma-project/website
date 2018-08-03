import React from "react";
import landingPage from "../../locales/en/LandingPage.json";
import { displayHeaderWithLineBreaks } from "../../helpers/textWithLineBreaks";

const Headline = () => {
  const headline = landingPage.headline;
  return (
    <div className="row">
      <h1 className="col-12 kyma-headline">
        {displayHeaderWithLineBreaks(headline)}
      </h1>
    </div>
  );
};

export default Headline;
