import React from "react";

import Grid from "@styled/Grid";

import { FormattedMessage } from "@common/i18n";

import Link from "@components/shared/Link";
import Icon from "@components/shared/Icon";

import { Post } from "@typings/blog";

import {
  PrevNextSectionWrapper,
  PrevWrapper,
  NextWrapper,
  PrevNextSectionPostTitle,
} from "./styled";

interface PrevNextSectionProps {
  previous?: Post;
  next?: Post;
}

export const PrevNextSection: React.FunctionComponent<PrevNextSectionProps> = ({
  previous,
  next,
}) => (
  <PrevNextSectionWrapper>
    <Grid.Row>
      {previous && (
        <Grid.Unit df={next ? 6 : 12} sm={12}>
          <PrevWrapper>
            <Link.Internal to={previous.fields.slug}>
              <Icon iconName="arrow-left" iconPrefix="fas" />
              <FormattedMessage id="blog.previousPostButton" />
              <PrevNextSectionPostTitle>
                {previous.frontmatter.title}
              </PrevNextSectionPostTitle>
            </Link.Internal>
          </PrevWrapper>
        </Grid.Unit>
      )}
      {next && (
        <Grid.Unit df={previous ? 6 : 12} sm={12}>
          <NextWrapper>
            <Link.Internal to={next.fields.slug}>
              <FormattedMessage id="blog.nextPostButton" />
              <Icon iconName="arrow-right" iconPrefix="fas" />
              <PrevNextSectionPostTitle>
                {next.frontmatter.title}
              </PrevNextSectionPostTitle>
            </Link.Internal>
          </NextWrapper>
        </Grid.Unit>
      )}
    </Grid.Row>
  </PrevNextSectionWrapper>
);
