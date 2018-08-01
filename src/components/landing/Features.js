import React from "react";
import { translate } from "react-i18next";

import Connectivity from "./features/Connectivity";
import Extendable from "./features/Extendable";
import TechIndependent from "./features/TechIndependent";

const FeaturesComponent = ({ t }) => {
  const getIllustrationComponent = sectionId => {
    switch (sectionId) {
      case "openAndExtendable":
        return <Extendable />;
      case "seamlessConnectivity":
        return <Connectivity />;
      case "coherentAndTechnologyIndependent":
        return <TechIndependent />;
      default:
        return null;
    }
  };

  const sections = t("features", { returnObjects: true }) || [];
  return (
    <div className="row kyma-attr row--sm-align-center">
      {sections.map(section => {
        return (
          <section className="col-4 col-md-12" key={section.id}>
            <h3>{section.headline}</h3>
            <div className="img-wrap">
              {getIllustrationComponent(section.id)}
            </div>
            <ul className="list-disc">
              {section.bulletPoints.map((bulletPoint, idx) => (
                <li key={idx}>{bulletPoint}</li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
};

const Features = translate("LandingPage")(FeaturesComponent);
export default Features;
