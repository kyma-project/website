import React from "react";

import { FormattedMessage } from "@common/i18n";

import ReactMarkdown from "@components/shared/ReactMarkdown";
import Button from "@components/shared/Button";
import Link from "@components/shared/Link";

import config from "@config";

import { ReleaseButtonsWrapper } from "../styled";

interface ReleaseTemplatePostProps {
  markdown: string;
  assetsPath: string;
  releaseTag?: string;
}

const ReleaseTemplatePost: React.FunctionComponent<
  ReleaseTemplatePostProps
> = ({ markdown, assetsPath, releaseTag }) => (
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
    <ReactMarkdown
      source={markdown}
      escapeHtml={false}
      assetsPath={assetsPath}
    />
  </>
);

export default ReleaseTemplatePost;
