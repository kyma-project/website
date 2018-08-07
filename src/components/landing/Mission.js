import React from "react";
import landingPage from "../../locales/en/LandingPage.json";
import MissionSvg from "./assets/mission.svg";
import { displayHeaderWithLineBreaks } from "../../helpers/textWithLineBreaks";

const Mission = () => {
  const sectionPrefix = "mission";
  const headline = landingPage[sectionPrefix].headline;
  const paragraphs = landingPage[sectionPrefix].paragraphs || [];

  return (
    <div className="row row--space-between row--sm-align-center kyma-margin-top">
      <div className="col-6 col-md-9 col-sm-12 align--center">
        <h3>{displayHeaderWithLineBreaks(headline)}</h3>
        <div>
          {paragraphs.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}
        </div>
      </div>
      <div className="col-5 col-md-6 col-sm-9">
        <object
          type="image/svg+xml"
          data={MissionSvg}
          aria-label="Illustration showing mountains"
        />
      </div>
    </div>
  );
};

export default Mission;
