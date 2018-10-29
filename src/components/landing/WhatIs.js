import React from "react";
import landingPage from "../../locales/en/LandingPage.json";
import ui from "../../locales/en/UI.json";

import WhatIsSvg from "./features/WhatIs";

const WhatIs = () => {
  const sectionPrefix = "whatIs";
  const headline = landingPage[sectionPrefix].headline;
  const paragraphs = landingPage[sectionPrefix].paragraphs || [];

  const github = {
    name: ui.socialMedia.github.name,
    url: ui.socialMedia.github.url,
  };

  return (
    <div className="row row--space-between row--sm-align-center">
      <div className="col-6 col-md-9 col-sm-12 align--center">
        <h2>{headline}</h2>
        <div>
          {paragraphs.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}
          <a href={github.url} className="btn btn-github">
            <svg
              className="sprite-icon sprite-icon--25 sprite-icon--inverse"
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
      <div className="col-6 col-md-9 col-sm-12">
        <WhatIsSvg />
      </div>
    </div>
  );
};

export default WhatIs;
