type SocialMedia = {
  [key: string]: {
    name: string;
    shortName: string;
    url: string;
    icon: string;
  };
};

const SOCIAL_MEDIA: SocialMedia = {
  twitter: {
    name: "Twitter",
    shortName: "Twitter",
    url: "https://twitter.com/kymaproject",
    icon: "twitter",
  },
  github: {
    name: "GitHub",
    shortName: "GitHub",
    url: "https://github.com/kyma-project",
    icon: "github",
  },
  slack: {
    name: "Slack",
    shortName: "Slack",
    url:
      "https://join.slack.com/t/kyma-community/shared_invite/enQtNDAwNzE4Mjk2NDE3LTJhOTlmZjM5YzkwNmEzNmY3ZjE2MTU2OTMxOGE4ZDM0MmU4ZWRkZGJiODgzNmRmMTYxMDYwNjZiMDAwMTA2OWM",
    icon: "slack",
  },
  linkedIn: {
    name: "LinkedIn",
    shortName: "LinkedIn",
    url: "https://www.linkedin.com/company/kyma-project/",
    icon: "linkedin-in",
  },
  youTube: {
    name: "YouTube",
    shortName: "YouTube",
    url: "https://www.youtube.com/channel/UC8Q8bBtYe9gQN-dQ-_L8JvQ",
    icon: "youtube",
  },
  stackOverflow: {
    name: "StackOverflow",
    shortName: "Stack",
    url: "https://stackoverflow.com/questions/tagged/kyma",
    icon: "stack-overflow",
  },
};

export default SOCIAL_MEDIA;
