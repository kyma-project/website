import React from "react";
import landingPage from "../../locales/en/LandingPage.json";
import ui from "../../locales/en/UI.json";

import WhatIsSvg from "./assets/whatIs.svg";

const WhatIs = () => {
  const github = {
    name: ui.socialMedia.github.name,
    url: ui.socialMedia.github.url,
  };

  const sectionPrefix = "whatIs";
  const paragraphs = landingPage[sectionPrefix].paragraphs || [];

  return (
    <section className="bg-m">
      <div className="container">
        <div className="row row--space-between row--sm-align-center">
          <div className="col-5 col-md-6 col-sm-9">
            <object
              type="image/svg+xml"
              data={WhatIsSvg}
              aria-label="Illustration of a pirate treasure"
            />
          </div>
          <div className="col-6 col-md-9 col-sm-12 content-inverse">
            <h2>{landingPage[sectionPrefix].headline}</h2>
            <div>
              {paragraphs.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}
              <a href={github.url} className="btn btn-github">
                <svg
                  className="sprite-icon sprite-icon--28 sprite-icon--inverse"
                  role="img"
                  aria-labelledby="buttonGithub"
                >
                  <title id="buttonGithub">{github.name}</title>
                  <use xlinkHref="#github" />
                </svg>
                <span>
                  {landingPage.whatIs.action.replace("{{site}}", github.name)}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIs;
