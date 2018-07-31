import React from "react";
import { translate } from "react-i18next";

import FeatureConnectivitySvg from "./assets/feature-connectivity.svg";
import FeatureExtendableSvg from "./assets/feature-extendable.svg";
import FeatureTechIndependentSvg from "./assets/feature-tech-independent.svg";

const FeaturesComponent = ({ t }) => {
  const getImage = sectionId => {
    switch (sectionId) {
      case "openAndExtendable":
        return FeatureExtendableSvg;
      case "seamlessConnectivity":
        return FeatureConnectivitySvg;
      case "coherentAndTechnologyIndependent":
        return FeatureTechIndependentSvg;
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
              <object data={getImage(section.id)} />
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
