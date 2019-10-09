import React from "react";

import Grid from "@styled/Grid";
import H from "@components/shared/H";

import { FormattedMessage, getTranslation } from "@common/i18n";

import { LastBlogPost } from "@views/landingPage/SocialMedia/lastBlogPost";
import { YouTubeFrame } from "@views/landingPage/SocialMedia/YouTubeFrame";
import { TwitterFrame } from "@views/landingPage/SocialMedia/TwitterFrame";

import { Post } from "@typings/blog";

import { SocialMediaWrapper } from "./styled";

interface Props {
  lastBlogPost: Post;
}

const gt = getTranslation("landingPage.social-media");

export const SocialMedia: React.FunctionComponent<Props> = ({
  lastBlogPost,
}) => (
  <SocialMediaWrapper>
    <Grid.Container as="section">
      <Grid.Row>
        <Grid.Unit df={12}>
          <FormattedMessage id={gt("headline")}>
            {headline => (
              <H as="h2" center={true}>
                {headline}
              </H>
            )}
          </FormattedMessage>
        </Grid.Unit>
        <Grid.Unit df={12}>
          <Grid.Row>
            <Grid.Unit df={6}>
              <TwitterFrame />
            </Grid.Unit>
            <Grid.Unit df={6}>
              <Grid.Row>
                <Grid.Unit df={12}>
                  <YouTubeFrame />
                </Grid.Unit>
                <Grid.Unit df={12}>
                  <LastBlogPost {...lastBlogPost} />
                </Grid.Unit>
              </Grid.Row>
            </Grid.Unit>
          </Grid.Row>
        </Grid.Unit>
      </Grid.Row>
    </Grid.Container>
  </SocialMediaWrapper>
);
