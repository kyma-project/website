import React from "react";
import { Content } from "@kyma-project/documentation-component";

import { StylesOpenAPI } from "../render-engines/openapi/StyledOpenApi";

export const DocsSpecificationLayout: React.FunctionComponent = () => (
  <StylesOpenAPI>
    <Content />
  </StylesOpenAPI>
);
