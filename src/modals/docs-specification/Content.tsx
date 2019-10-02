import React from "react";
import { Sources } from "@kyma-project/documentation-component";

import {
  GenericComponent,
  LayoutType,
} from "@components/generic-documentation";
import { Specification } from "@typings/docs";

import { ModalContentWrapper } from "./styled";

interface Props {
  specification: Specification;
}

export const ModalContent: React.FunctionComponent<Props> = ({
  specification,
}) => {
  const sources: Sources = [
    {
      source: {
        type: specification.type,
        rawContent: specification.spec,
      },
    },
  ];

  return (
    <ModalContentWrapper>
      <GenericComponent
        sources={sources}
        layout={LayoutType.DOCS_SPECIFICATION}
      />
    </ModalContentWrapper>
  );
};
