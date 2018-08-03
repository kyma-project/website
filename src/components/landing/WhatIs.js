import React from "react";
import { translate } from "react-i18next";

import WhatIsSvg from "./assets/whatIs.svg";

const WhatIs = ({ t }) => {
  const github = {
    name: t(`UI:socialMedia.github.name`),
    url: t(`UI:socialMedia.github.url`),
  };

  const sectionPrefix = "whatIs";
  const paragraphs =
    t(`${sectionPrefix}.paragraphs`, { returnObjects: true }) || [];

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
            <h2>{t(`${sectionPrefix}.headline`)}</h2>
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
                  {t("whatIs.action", {
                    site: github.name,
                  })}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default translate(["LandingPage", "UI"])(WhatIs);
