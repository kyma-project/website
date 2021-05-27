import React from "react";

import Grid from "@styled/Grid";

import {
  FormattedMessage,
  getTranslation,
  injectIntl,
  FunctionComponentIntl,
} from "@common/i18n";

import {
  HeadlineWrapper,
  FormattedBrand,
  IconWrapper,
  ButtonWrapper,
  SpellingOfText,
} from "./styled";
import Button from "@components/shared/Button";
import Link from "@components/shared/Link";
import Icon from "@components/shared/Icon";
import { scrollToAnchor } from "@common/utils/scrollToAnchor";
import { featuresID } from "../Features";

const gt = getTranslation("landingPage.manifesto");

const scrollToFeatures = (target: ManifestoProps["scrollRef"]) => (
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
) => {
  e.preventDefault();

  if (target && target.current) {
    scrollToAnchor({
      target: target.current,
      timeout: 250,
      smooth: true,
    })();
  }
};

interface ManifestoProps {
  scrollRef: React.RefObject<HTMLElement>;
}

const ManifestoRaw: FunctionComponentIntl<ManifestoProps> = ({
  formatMessage,
  scrollRef: innerRef,
}) => (
  <Grid.Container as="header">
    <Grid.Row>
      <Grid.Unit df={8} sm={12}>
        <HeadlineWrapper>
          <FormattedMessage
            id={gt("paragraph")}
            tagName={React.Fragment}
            values={{
              brand: (
                <FormattedBrand>
                  {formatMessage({ id: "brand" })}
                </FormattedBrand>
              ),
              spelling: (
                <SpellingOfText>
                  {formatMessage({ id: "spelling" })}
                </SpellingOfText>
              ),
            }}
          />
        </HeadlineWrapper>
        <ButtonWrapper>
          <Link.External to="https://github.com/kyma-project/kyma">
            <Button.Normal iconName="github-alt" iconPrefix="fab">
              <FormattedMessage id={gt("githubButton")} />
            </Button.Normal>
          </Link.External>
        </ButtonWrapper>
      </Grid.Unit>
      <Grid.Unit df={12}>
        <IconWrapper>
          <Link.Hash
            to={featuresID}
            onClick={scrollToFeatures(innerRef)}
            ariaLabel={formatMessage({ id: "scrollButton" })}
          >
            <Icon
              iconName="chevron-down"
              iconPrefix="fas"
              color="#0b74de"
              size="2x"
            />
          </Link.Hash>
        </IconWrapper>
      </Grid.Unit>
    </Grid.Row>
  </Grid.Container>
);

export const Manifesto = injectIntl("landingPage.manifesto")(ManifestoRaw);
