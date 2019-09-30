import React from "react";
import { WrapPageElementBrowserArgs } from "gatsby";
import { LayoutWrapper } from "../../src/layouts";

export const wrapPageElement = ({
  element,
  props,
}: WrapPageElementBrowserArgs): any => (
  <LayoutWrapper {...props}>{element}</LayoutWrapper>
);
