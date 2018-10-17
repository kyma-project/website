import React from "react";
import landingPage from "../../locales/en/LandingPage.json";
import ui from "../../locales/en/UI.json";

import CommunitySvg from "./assets/community.svg";

const Community = () => {
  const translateLink = socialMediaPortal => ui.socialMedia[socialMediaPortal];

  const sectionPrefix = "community";
  const paragraphs = landingPage[sectionPrefix].paragraphs || [];
  const sig = landingPage[sectionPrefix].SIG || {};
  const links = landingPage[sectionPrefix].links || {};

  const twitter = translateLink("twitter");
  const github = translateLink("github");
  const slack = translateLink("slack");
  const linkedin = translateLink("linkedin");
  const sigGroup = translateLink("sigGroup");

  const sigLink = (
    <div>
        <p>{sig.paragraph} <a href={sigGroup.url} target="_blank" rel="noopener noreferrer" className="link-sig">{sig.link.name}.</a></p>
    </div>
  )

  return (
    <section className="bg-b">
      <div className="container">
        <div className="row row--space-between row--sm-align-center">
          <div className="col-6 col-md-9 col-sm-12">
            <object
              type="image/svg+xml"
              data={CommunitySvg}
              aria-label="Illustration of a planet and satelite"
            />
          </div>
          <div className="col-6 col-md-9 col-sm-12">
            <h2 className="community-h2">{landingPage[sectionPrefix].headline}</h2>
            <div>
              {paragraphs.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}
              {sigLink}
            </div>
            <div className="community--links">
              <p>{links.paragraph}</p>
              <ul>
                <li>
                    <a href={github.url} target="_blank" rel="noopener noreferrer">
                        <div className="community-icon"> 
                            <svg
                                className="sprite-icon sprite-icon--25 sprite-icon--inverse"
                                role="img"
                                aria-labelledby="githublLink"
                            >
                                <title id="githublLink">{github.name}</title>
                                <use xlinkHref="#github" />
                            </svg>
                        </div>
                        <span>{github.name}</span>
                    </a>
                </li>
                <li>
                    <a href={twitter.url} target="_blank" rel="noopener noreferrer">
                        <div className="community-icon"> 
                            <svg
                                className="sprite-icon sprite-icon--25 sprite-icon--inverse"
                                role="img"
                                aria-labelledby="twitterlLink"
                            >
                                <title id="twitterlLink">{twitter.name}</title>
                                <use xlinkHref="#twitter" />
                            </svg>
                        </div>
                        <span>{twitter.name}</span>
                    </a>
                </li>
                <li>
                    <a href={slack.url} target="_blank" rel="noopener noreferrer">
                        <div className="community-icon slack"> 
                            <svg
                                className="sprite-icon sprite-icon--25 sprite-icon--inverse"
                                role="img"
                                aria-labelledby="slackLink"
                            >
                                <title id="slackLink">{slack.name}</title>
                                <use xlinkHref="#slack" />
                            </svg>
                        </div>
                        <span>{slack.name}</span>
                    </a>
                </li>
                <li>
                    <a href={linkedin.url} target="_blank" rel="noopener noreferrer">
                        <div className="community-icon"> 
                            <svg
                                className="sprite-icon sprite-icon--25 sprite-icon--inverse"
                                role="img"
                                aria-labelledby="linkedinLink"
                            >
                                <title id="linkedinLink">{linkedin.name}</title>
                                <use xlinkHref="#linkedin" />
                            </svg>
                        </div>
                        <span>{linkedin.name}</span>
                    </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
