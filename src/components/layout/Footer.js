import React from "react";

const Footer = () => {
  return (
    <footer className="bg-f">
      <div className="container">
        <svg
          className="sprite-icon sprite-icon--79 sprite-icon--inverse kyma-footer-logo"
          role="img"
          aria-labelledby="title"
        >
          <title id="title">Kyma Logo</title>
          <use xlinkHref="#logo-single" />
        </svg>
        <a
          href="https://github.com/kyma-project/kyma"
          className="link link-github"
        >
          <svg
            className="sprite-icon sprite-icon--12 sprite-icon--inverse"
            role="img"
            aria-labelledby="githublLink"
          >
            <title id="githublLink">twitter icon</title>
            <use xlinkHref="#github" />
          </svg>
          GitHub
        </a>
        <a href="https://twitter.com/kymaproject" className="link link-twitter">
          <svg
            className="sprite-icon sprite-icon--12 sprite-icon--inverse"
            role="img"
            aria-labelledby="twitterlLink"
          >
            <title id="twitterlLink">twitter icon</title>
            <use xlinkHref="#twitter" />
          </svg>
          Twitter
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
            <title id="slackLink">slack icon</title>
            <use xlinkHref="#slack" />
          </svg>
          Slack
        </a>

        <div className="copyright">
          <p>
            Copyright © 2018 The Kyma project authors.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
