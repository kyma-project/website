import React from "react";

import { FormattedMessage } from "@common/i18n";
import { useScrollPosition } from "@common/hooks";

import { Specification } from "@typings/docs";

import Link from "@components/shared/Link";

import {
  SpecificationsListWrapper,
  SpecificationsListHeader,
  SpecificationsListItem,
} from "./styled";

interface Props {
  specifications?: Specification[];
}

export const SpecificationList: React.FunctionComponent<Props> = ({
  specifications = [],
}) => {
  const scrollPosition = useScrollPosition();

  if (!specifications.length) {
    return null;
  }

  const list = specifications.map(specification => (
    <SpecificationsListItem key={specification.id}>
      <Link.Internal
        to={specification.pageUrl}
        state={{
          scrollPosition,
        }}
      >
        <span>{specification.info.title}</span>
      </Link.Internal>
    </SpecificationsListItem>
  ));

  return (
    <SpecificationsListWrapper>
      <SpecificationsListHeader>
        <FormattedMessage id="docs.navigation.specifications" />:
      </SpecificationsListHeader>
      {list}
    </SpecificationsListWrapper>
  );
};
