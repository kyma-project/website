import React from "react";
import { translate } from "react-i18next";

const Footer = ({ t }) => {
  const translateLink = socialMediaPortal =>
    t(`socialMedia.${socialMediaPortal}`, { returnObjects: true });

  const twitter = translateLink("twitter");
  const github = translateLink("github");
  const slack = translateLink("slack");

  return (
    <footer>
      <div className="bg-f">
        <div className="container">
          <svg
            className="sprite-icon sprite-icon--79 sprite-icon--inverse kyma-footer-logo"
            role="img"
            aria-labelledby="title"
          >
            <title id="title">{t("metadata.title")}</title>
            <use xlinkHref="#logo-single" />
          </svg>
          <a href={github.url} className="link link-github">
            <svg
              className="sprite-icon sprite-icon--12 sprite-icon--inverse"
              role="img"
              aria-labelledby="githublLink"
            >
              <title id="githublLink">{github.name}</title>
              <use xlinkHref="#github" />
            </svg>
            {github.name}
          </a>
          <a href={twitter.url} className="link link-twitter">
            <svg
              className="sprite-icon sprite-icon--12 sprite-icon--inverse"
              role="img"
              aria-labelledby="twitterlLink"
            >
              <title id="twitterlLink">t{twitter.name}</title>
              <use xlinkHref="#twitter" />
            </svg>
            {twitter.name}
          </a>
          <a href={slack.url} className="link link-slack">
            <svg
              className="sprite-icon sprite-icon--12 sprite-icon--inverse"
              role="img"
              aria-labelledby="slackLink"
            >
              <title id="slackLink">{slack.name}</title>
              <use xlinkHref="#slack" />
            </svg>
            {slack.name}
          </a>

          <div className="copyright">
            <p>
              {`${t("copyright")} `}
              <a
                href={t("privacyStatementLink")}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("privacyStatement")}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default translate(["UI"])(Footer);
