import React from "react";

import Icon from "@components/shared/Icon";
import Button from "@components/shared/Button";
import LinkTypes from "@components/shared/Link";
import { FormattedMessage } from "@common/i18n";

import { NewsroomI18nTarget } from "@typings/landingPage";

import {
  CardHeader,
  CardContentWrapper,
  CardContent,
  CardHeaderIconWrapper,
  CardButtonWrapper,
} from "./styled";

interface Props {
  i18nTarget: NewsroomI18nTarget;
  iconName: string;
  iconPrefix?: string;
  link: string;
}

export const Card: React.FunctionComponent<Props> = ({
  i18nTarget,
  iconName,
  iconPrefix,
  link,
  children,
}) => {
  const Link = link.startsWith("http")
    ? LinkTypes.External
    : LinkTypes.Internal;

  return (
    <>
      <CardHeader>
        <h3>
          <CardHeaderIconWrapper>
            <Icon iconName={iconName} iconPrefix={iconPrefix} />
          </CardHeaderIconWrapper>
          <FormattedMessage id={`landingPage.newsroom.${i18nTarget}Header`} />
        </h3>
      </CardHeader>
      <CardContentWrapper className="newsroom-card-wrapper">
        <div>
          <CardContent className="newsroom-card-content">
            {children}
          </CardContent>
          <CardButtonWrapper>
            <Link to={link}>
              <Button.Emphasized size="sm">
                <FormattedMessage
                  id={`landingPage.newsroom.${i18nTarget}Button`}
                />
              </Button.Emphasized>
            </Link>
          </CardButtonWrapper>
        </div>
      </CardContentWrapper>
    </>
  );
};
