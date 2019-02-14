import React from "react";
import landingPage from "../../locales/en/LandingPage.json";

import {getSapGradientDef, getTwiggleGradientDef} from "./../layout/Sprites";
const Adopters = () => {
  const sectionPrefix = "adopters";

  return (
    <section className="bg-a">
      <div className="container">
        <div className="row row--space-between row--sm-align-center">

          <div className="col-12 col-md-12">
            <h2 className="adopters-h2">
              {landingPage[sectionPrefix].headline}
            </h2>
            
            <div className="adopters">
              <ul>
                <li>
                  <svg
                    className="sprite-icon sprite-icon--twiggle"
                    role="img"
                    aria-labelledby="twiggle"
                  >
                    {getTwiggleGradientDef()}
                    <title id="twiggle">twiggle</title>
                    <use xlinkHref="#twiggle" />
                  </svg>
                </li>
                <li>
                  <svg
                    className="sprite-icon sprite-icon--netconomy"
                    role="img"
                    aria-labelledby="netconomy"
                  >
                    <title id="netconomy">netconomy</title>
                    <use xlinkHref="#netconomy" />
                  </svg>
                </li>
                <li>
                  <svg
                    className="sprite-icon sprite-icon--sap"
                    role="img"
                    aria-labelledby="sap"
                  >
                    {getSapGradientDef()}
                    <title id="sap">sap</title>
                    <use xlinkHref="#sap" />
                  </svg>
                </li>
                <li>
                  <svg
                    className="sprite-icon sprite-icon--mgm"
                    role="img"
                    aria-labelledby="mgm"
                  >
                    <title id="mgm">mgm</title>
                    <use xlinkHref="#mgm" />
                  </svg>
                </li>
                <li>
                  <svg
                    className="sprite-icon sprite-icon--accenture-interactive"
                    role="img"
                    aria-labelledby="accenture-interactive"
                  >
                    <title id="accenture-interactive">accenture-interactive</title>
                    <use xlinkHref="#accenture-interactive" />
                  </svg>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Adopters;
