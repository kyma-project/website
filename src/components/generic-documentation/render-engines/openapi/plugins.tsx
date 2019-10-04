import React from "react";

const plugins = {
  wrapComponents: {
    parameters: (Original: React.ElementType, _: any) => (props: any) => (
      <Original {...props} allowTryItOut={false} />
    ),
    authorizeBtn: () => () => null,
    authorizeOperationBtn: () => () => null,
    info: () => () => null,
    tags: () => () => null,
  },
};

export const OpenAPIPlugins = (_: any) => ({
  ...plugins,
});
