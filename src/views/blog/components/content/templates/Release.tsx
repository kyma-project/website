import React from "react";

import { FormattedMessage } from "@common/i18n";

import ReactMarkdown from "@components/shared/ReactMarkdown";
import Button from "@components/shared/Button";
import Link from "@components/shared/Link";

import config from "@config";

import { ReleaseButtonsWrapper } from "../styled";

interface ReleaseTemplatePostProps {
  content: React.ReactNode;
  releaseTag?: string;
}

const ReleaseTemplatePost: React.FunctionComponent<
  ReleaseTemplatePostProps
> = ({ content, releaseTag }) => (
  <>
    {releaseTag && (
      <ReleaseButtonsWrapper>
        <Link.External
          to={`${config.links.KYMA_REPOSITORY_LINK}/releases/${releaseTag}`}
        >
          <Button.Normal iconName="cloud-download-alt" iconPrefix="fas">
            <FormattedMessage
              id="blog.downloadButton"
              values={{
                version: releaseTag,
              }}
            />
          </Button.Normal>
        </Link.External>
      </ReleaseButtonsWrapper>
    )}
    {content}
  </>
);

export default ReleaseTemplatePost;
