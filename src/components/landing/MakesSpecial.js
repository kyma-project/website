import React from "react";
import landingPage from "../../locales/en/LandingPage.json";

import MakesSpecialSvg from "./features/MakesSpecial";

const MakesSpecial = () => {
  const documentation = {
    name: "documentation",
    url: "docs",
  };

  const sectionPrefix = "makesSpecial";
  const paragraphs = landingPage[sectionPrefix].paragraphs || [];

  return (
    <section className="bg-m">
      <div className="container">
        <div className="row row--space-between row--sm-align-center">
          <div className="col-6 col-md-9 col-sm-12">
            <MakesSpecialSvg />
          </div>
          <div className="col-6 col-md-9 col-sm-12 content-inverse">
            <h2>{landingPage[sectionPrefix].headline}</h2>
            <div>
              {paragraphs.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}
              <a href={documentation.url} className="btn btn-documentation">
                <span>
                  {landingPage[sectionPrefix].action}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MakesSpecial;
