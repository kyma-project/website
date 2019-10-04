import React from "react";
import { Sources } from "@kyma-project/documentation-component";

import {
  GenericComponent,
  LayoutType,
} from "@components/generic-documentation";
import { Specification } from "@typings/docs";

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
    <GenericComponent
      sources={sources}
      layout={LayoutType.DOCS_SPECIFICATION}
    />
  );
};
