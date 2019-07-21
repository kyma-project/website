import React from "react";
import { WrapPageElementBrowserArgs } from "gatsby";
import { LayoutsWrapper } from "../../src/layouts";

export const wrapPageElement = ({
  element,
  props,
}: WrapPageElementBrowserArgs) => (
  <LayoutsWrapper {...props}>{element}</LayoutsWrapper>
);
