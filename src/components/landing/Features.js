import React from "react";
import Link from "gatsby-link";
import landingPage from "../../locales/en/LandingPage.json";
import Connectivity from "./features/Connectivity";
import Extendable from "./features/Extendable";
import TechIndependent from "./features/TechIndependent";

const Features = () => {
  const sectionPrefix = "features";
  const headline = landingPage[sectionPrefix].headline;
  const url = landingPage[sectionPrefix].url;
  const paragraphs = landingPage[sectionPrefix].paragraphs || [];

  const getIllustrationComponent = sectionId => {
    switch (sectionId) {
      case "applicationConnector":
        return <Connectivity />;
      case "serverless":
        return <TechIndependent />;
      case "serviceManagement":
        return <Extendable />;
      default:
        return null;
    }
  };

  const sections = paragraphs;
  return (
    <div className="row kyma-attr row--sm-align-center">
      <Link className="col-12 col-md-12 link-sig" to={url}>
        <h2>{headline}</h2>
      </Link>
      {sections.map(section => {
        return (
          <section className="col-4 col-md-12" key={section.id}>
            <Link className="link-sig" to={section.url}>
              <h3>{section.headline}</h3>
            </Link>
            <div className="img-wrap">
              {getIllustrationComponent(section.id)}
            </div>
            <p>{section.paragraph}</p>
          </section>
        );
      })}
    </div>
  );
};

export default Features;
