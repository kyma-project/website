import React from "react";
import { translate } from "react-i18next";

import MissionSvg from "./assets/mission.svg";
import { displayHeaderWithLineBreaks } from "../../helpers/textWithLineBreaks";

const MissionComponent = ({ t }) => {
  const sectionPrefix = "mission";
  const headline = t(`${sectionPrefix}.headline`);
  const paragraphs =
    t(`${sectionPrefix}.paragraphs`, { returnObjects: true }) || [];

  return (
    <div className="row row--space-between row--sm-align-center kyma-margin-top">
      <div className="col-6 col-md-9 col-sm-12 align--center">
        <h3>{displayHeaderWithLineBreaks(headline)}</h3>
        <div>
          {paragraphs.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}
        </div>
      </div>
      <div className="col-5 col-md-6 col-sm-9">
        <object data={MissionSvg} />
      </div>
    </div>
  );
};

const Mission = translate("LandingPage")(MissionComponent);
export default Mission;
