import React from "react";
import landingPage from "../../locales/en/LandingPage.json";

import Connectivity from "./features/Connectivity";
import Extendable from "./features/Extendable";
import TechIndependent from "./features/TechIndependent";

const Features = () => {
  const getIllustrationComponent = sectionId => {
    switch (sectionId) {
      case "applicationConnector":
        return <Connectivity />;
      case "serverless":
        return <TechIndependent />;
      case "serviceCatalog":
        return <Extendable />;
      default:
        return null;
    }
  };

  const sections = landingPage.features || [];
  return (
    <div className="row kyma-attr row--sm-align-center">
      <h2 className="col-12 col-md-12">Key features</h2>
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
