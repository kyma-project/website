import React from "react";
import { PersonasI18nTarget } from "@typings/landingPage";
import { IntlInterface, injectIntl } from "@common/i18n";
import H from "@components/shared/H";
import { ImageWrapper, PersonaWrapper, TextWrapper } from "./styled";
import codingPNG from "@views/landingPage/assets/landing-page/personas/coding.png";
import effectivePNG from "@views/landingPage/assets/landing-page/personas/effective.png";
import { FormattedMessage } from "react-intl";
import Grid from "@common/styled/Grid";

const getImageForPersona = (persona: PersonasI18nTarget) => {
  switch (persona) {
    case PersonasI18nTarget.CODING:
      return codingPNG;
    case PersonasI18nTarget.EFFECTIVE:
      return effectivePNG;
    default:
      return null;
  }
};

interface ColumnProps {
  persona: PersonasI18nTarget;
}

const ImageColumn: React.FunctionComponent<ColumnProps> = ({ persona }) => (
  <ImageWrapper>
    <img src={getImageForPersona(persona)} alt={persona} />
  </ImageWrapper>
);

const TextColumnRaw: React.FunctionComponent<ColumnProps & IntlInterface> = ({
  persona,
  formatMessage,
  formatArray,
}) => (
  <TextWrapper>
    <div>
      <H as="h3">{formatMessage({ id: `${persona}.title` })}</H>
      <ul>
        {formatArray({ id: `${persona}.paragraphs` }).map((desc, id) => (
          <li key="{id}">{desc}</li>
        ))}
      </ul>
    </div>
  </TextWrapper>
);

const TextColumn = injectIntl("landingPage.personas.personas")(TextColumnRaw);

interface Props {
  persona: PersonasI18nTarget;
  inverted?: boolean;
}

export const Persona: React.FunctionComponent<Props> = ({
  persona,
  inverted,
}) => {
  const first = inverted ? (
    <ImageColumn persona={persona} />
  ) : (
    <TextColumn persona={persona} />
  );
  const second = inverted ? (
    <TextColumn persona={persona} />
  ) : (
    <ImageColumn persona={persona} />
  );

  return (
    <PersonaWrapper>
      <Grid.Container>
        <Grid.Row>
          <Grid.Unit df={6} sm={12}>
            {first}
          </Grid.Unit>
          <Grid.Unit df={6} sm={12}>
            {second}
          </Grid.Unit>
        </Grid.Row>
      </Grid.Container>
    </PersonaWrapper>
  );
};
