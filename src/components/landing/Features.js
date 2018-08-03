import React from "react";
import landingPage from "../../locales/en/LandingPage.json";

import Connectivity from "./features/Connectivity";
import Extendable from "./features/Extendable";
import TechIndependent from "./features/TechIndependent";

const Features = () => {
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

  const sections = landingPage.features || [];
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

export default Features;
