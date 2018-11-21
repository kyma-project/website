import React from "react";
import ui from "../../locales/en/UI.json";

const Footer = () => {
  const translateLink = socialMediaPortal => ui.socialMedia[socialMediaPortal];

  const twitter = translateLink("twitter");
  const github = translateLink("github");
  const slack = translateLink("slack");
  const linkedin = translateLink("linkedin");
  const youtube = translateLink("youtube");
  const stackOverflow = translateLink("stackOverflow");

  return (
    <footer>
      <div className="bg-f">
        <div className="container">
          <svg
            className="sprite-icon sprite-icon--79 sprite-icon--inverse kyma-footer-logo"
            role="img"
            aria-labelledby="title"
          >
            <title id="title">{ui.metadata.title}</title>
            <use xlinkHref="#logo-single" />
          </svg>
          <a
            href={github.url}
            className="link link-media link-github"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="sprite-icon sprite-icon--14 sprite-icon--inverse"
              role="img"
              aria-labelledby="githublLink"
            >
              <title id="githublLink">{github.name}</title>
              <use xlinkHref="#github" />
            </svg>
            {github.name}
          </a>
          <a
            href={twitter.url}
            className="link link-media link-twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="sprite-icon sprite-icon--15 sprite-icon--inverse"
              role="img"
              aria-labelledby="twitterlLink"
            >
              <title id="twitterlLink">t{twitter.name}</title>
              <use xlinkHref="#twitter" />
            </svg>
            {twitter.name}
          </a>
          <a
            href={slack.url}
            className="link link-media link-slack"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="sprite-icon sprite-icon--15 sprite-icon--inverse"
              role="img"
              aria-labelledby="slackLink"
            >
              <title id="slackLink">{slack.name}</title>
              <use xlinkHref="#slack" />
            </svg>
            {slack.name}
          </a>
          <a
            href={linkedin.url}
            className="link link-media link-linkedin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="sprite-icon sprite-icon--14 sprite-icon--inverse"
              role="img"
              aria-labelledby="linkedinLink"
            >
              <title id="linkedinLink">{linkedin.name}</title>
              <use xlinkHref="#linkedin" />
            </svg>
            {linkedin.name}
          </a>
          <a
            href={youtube.url}
            className="link link-media link-youtube"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="sprite-icon sprite-icon--15 sprite-icon--inverse"
              role="img"
              aria-labelledby="youtubeLink"
            >
              <title id="youtubeLink">{youtube.name}</title>
              <use xlinkHref="#youtube" />
            </svg>
            {youtube.name}
          </a>
          <a
            href={stackOverflow.url}
            className="link link-media link-stack"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="sprite-icon sprite-icon--15 sprite-icon--inverse"
              role="img"
              aria-labelledby="stackOverflowLink"
            >
              <title id="stackOverflowLink">{stackOverflow.name}</title>
              <use xlinkHref="#stackOverflow" />
            </svg>
            {stackOverflow.name}
          </a>

          <div className="copyright">
            <p>
              {ui.copyright}{" "}
              <a
                href={ui.privacyStatementLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ui.privacyStatement}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
