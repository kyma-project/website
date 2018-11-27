import React from "react";
import landingPage from "../../locales/en/LandingPage.json";
import ui from "../../locales/en/UI.json";

import WhatIsSvg from "./features/WhatIs";

const WhatIs = () => {
  const sectionPrefix = "whatIs";
  const headline = landingPage[sectionPrefix].headline;
  const paragraphs = landingPage[sectionPrefix].paragraphs || [];

  const docs = "/docs/root/kyma#overview-how-to-start";

  return (
    <div className="row row--space-between row--sm-align-center">
      <div className="col-6 col-md-9 col-sm-12 align--center">
        <h2>{headline}</h2>
        <div>
          {paragraphs.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}
          <a href={docs} className="btn btn-github">
            <span>
              {landingPage.whatIs.action}
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
