import React, { useState, useEffect } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton,
} from "react-share";

import config from "@config";
import Button from "@components/shared/Button";
import Tooltip from "@components/shared/Tooltip";

import { useScrollPosition } from "@common/hooks/useScrollPosition";
import { injectIntl, IntlInterface } from "@common/i18n";
import { BLOG_POST_VISIBILITY_OFFSET_BREAKPOINT } from "@common/constants";

import { PostSocialList } from "./styled";

const iconNames = {
  facebook: "facebook-f",
  twitter: "twitter",
  linkedin: "linkedin-in",
  reddit: "reddit-alien",
};

interface PostSocialProps {
  postUrl: string;
  title: string;
  tags?: string[];
}

const PostSocial: React.FunctionComponent<PostSocialProps & IntlInterface> = ({
  postUrl,
  title,
  tags = [],
  formatMessage,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const scrollPosition = useScrollPosition();

  useEffect(() => {
    if (scrollPosition >= BLOG_POST_VISIBILITY_OFFSET_BREAKPOINT && !visible) {
      setVisible(true);
    }
    if (scrollPosition < BLOG_POST_VISIBILITY_OFFSET_BREAKPOINT && visible) {
      setVisible(false);
    }
  }, [scrollPosition]);

  const url = `${config.siteMetadata.siteUrl}${
    postUrl.startsWith("/") ? postUrl.substr(1) : postUrl
  }`;

  return (
    <PostSocialList visible={visible}>
      <li>
        <Tooltip title={formatMessage({ id: "facebook" })} position="right">
          <FacebookShareButton url={url} quote={title}>
            <Button.Normal iconName={iconNames.facebook} />
          </FacebookShareButton>
        </Tooltip>
      </li>
      <li>
        <Tooltip title={formatMessage({ id: "twitter" })} position="right">
          <TwitterShareButton
            url={url}
            title={title}
            via={config.siteMetadata.twitterUsername}
            hashtags={tags}
          >
            <Button.Normal iconName={iconNames.twitter} />
          </TwitterShareButton>
        </Tooltip>
      </li>
      <li>
        <Tooltip title={formatMessage({ id: "linkedin" })} position="right">
          <LinkedinShareButton url={url} title={title}>
            <Button.Normal iconName={iconNames.linkedin} />
          </LinkedinShareButton>
        </Tooltip>
      </li>
      <li>
        <Tooltip title={formatMessage({ id: "reddit" })} position="right">
          <RedditShareButton url={url} title={title}>
            <Button.Normal iconName={iconNames.reddit} />
          </RedditShareButton>
        </Tooltip>
      </li>
    </PostSocialList>
  );
};

export default injectIntl("blog.share")(PostSocial);
