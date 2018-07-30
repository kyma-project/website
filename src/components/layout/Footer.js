import React from "react";
import { translate } from "react-i18next";

const Footer = ({ t }) => {
  return (
    <footer>
      <div className="bg-f">
        <div className="container">
          <svg
            className="sprite-icon sprite-icon--79 sprite-icon--inverse kyma-footer-logo"
            role="img"
            aria-labelledby="title"
          >
            <title id="title">{`${t("logoTitle")} ${t("logo")}`}</title>
            <use xlinkHref="#logo-single" />
          </svg>
          <a
            href="https://github.com/kyma-project"
            className="link link-github"
          >
            <svg
              className="sprite-icon sprite-icon--12 sprite-icon--inverse"
              role="img"
              aria-labelledby="githublLink"
            >
              <title id="githublLink">{`${t("github")} ${t("logo")}`}</title>
              <use xlinkHref="#github" />
            </svg>
            {t("github")}
          </a>
          <a
            href="https://twitter.com/kymaproject"
            className="link link-twitter"
          >
            <svg
              className="sprite-icon sprite-icon--12 sprite-icon--inverse"
              role="img"
              aria-labelledby="twitterlLink"
            >
              <title id="twitterlLink">t{`${t("twitter")} ${t("icon")}`}</title>
              <use xlinkHref="#twitter" />
            </svg>
            {t("twitter")}
          </a>
          <a
            href="https://join.slack.com/t/kyma-community/shared_invite/enQtNDAwNzE4Mjk2NDE3LTJhOTlmZjM5YzkwNmEzNmY3ZjE2MTU2OTMxOGE4ZDM0MmU4ZWRkZGJiODgzNmRmMTYxMDYwNjZiMDAwMTA2OWM"
            className="link link-slack"
          >
            <svg
              className="sprite-icon sprite-icon--12 sprite-icon--inverse"
              role="img"
              aria-labelledby="slackLink"
            >
              <title id="slackLink">{`${t("slack")} ${t("icon")}`}</title>
              <use xlinkHref="#slack" />
            </svg>
            {t("slack")}
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

export default translate("Footer")(Footer);
