import React from "react";

import Grid from "@styled/Grid";

import H from "@components/shared/H";

import { FormattedMessage } from "@common/i18n";

import { Card } from "./Card";
import { LastBlogPosts } from "./LastBlogPosts";
import { YouTubeFrame } from "./YouTubeFrame";
import { TwitterFrame } from "./TwitterFrame";

import { NewsroomI18nTarget } from "@typings/landingPage";
import { Post } from "@typings/blog";

import { NewsroomWrapper } from "./styled";

import config from "@config";

interface Props {
  latestBlogPosts: Post[];
}

export const Newsroom: React.FunctionComponent<Props> = ({
  latestBlogPosts,
}) => (
  <NewsroomWrapper id={config.landingPage.ids.newsroom}>
    <Grid.Container as="section">
      <Grid.Row>
        <Grid.Unit df={12}>
          <H as="h2" center={true}>
            <FormattedMessage id="landingPage.newsroom.headline" />
          </H>
        </Grid.Unit>
        <Grid.Unit df={4} md={6} sm={12} className="newsroom-twitter">
          <Card
            i18nTarget={NewsroomI18nTarget.TWITTER}
            iconName={config.socialMedia.twitter.icon}
            link={config.socialMedia.twitter.url}
          >
            <TwitterFrame
              twitterUsername={config.siteMetadata.twitterUsername}
            />
          </Card>
        </Grid.Unit>
        <Grid.Unit df={4} md={6} sm={12} className="newsroom-blog-posts">
          <Card
            i18nTarget={NewsroomI18nTarget.Blog_POST}
            iconName="rss"
            iconPrefix="fas"
            link="/blog"
          >
            <LastBlogPosts latestBlogPosts={latestBlogPosts} />
          </Card>
        </Grid.Unit>
        <Grid.Unit df={4} md={12} sm={12} className="newsroom-youtube">
          <Card
            i18nTarget={NewsroomI18nTarget.YOUTUBE}
            iconName={config.socialMedia.youTube.icon}
            link={config.socialMedia.youTube.url}
          >
            <YouTubeFrame videos={config.newsroomYoutubeVideos} />
          </Card>
        </Grid.Unit>
      </Grid.Row>
    </Grid.Container>
  </NewsroomWrapper>
);
