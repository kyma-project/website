import React from "react";

import Link from "@components/shared/Link";

import { FormattedMessage, getTranslation } from "@common/i18n";

import { Adopter } from "@typings/landingPage";

import {
  StyledAdoptersItem,
  StyledAdoptersItemContent,
  StyledAdoptersItemLink,
} from "./styled";

const gt = getTranslation("landingPage.keyFeatures");

export const AdoptersItem: React.FunctionComponent<Adopter> = ({
  url,
  logo,
  content,
}) => {
  const handleOnDragStart = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault();

  return (
    <StyledAdoptersItem onDragStart={handleOnDragStart}>
      <Link.External to={url}>
        <img src={logo} />
      </Link.External>
      <StyledAdoptersItemContent>{content}</StyledAdoptersItemContent>
      <StyledAdoptersItemLink to={url}>
        <FormattedMessage id={gt("readMoreLink")} />
      </StyledAdoptersItemLink>
    </StyledAdoptersItem>
  );
};
