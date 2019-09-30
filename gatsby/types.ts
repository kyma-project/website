import { Node } from "gatsby";

interface ActionPlugin {
  name: string;
}

interface ActionOptions {
  [key: string]: any;
}

export interface CreatePageFnArgs {
  path: string;
  component?: string;
  context?: Record<string, any>;
}

export type CreatePageFn = (
  args: CreatePageFnArgs,
  plugin?: ActionPlugin,
  option?: ActionOptions,
) => void;

export type OriginalCreatePageFn = (
  args: Required<CreatePageFnArgs>,
  plugin?: ActionPlugin,
  option?: ActionOptions,
) => void;

export type CreateRedirectFn = (
  redirect: {
    fromPath: string;
    isPermanent?: boolean;
    toPath: string;
    redirectInBrowser?: boolean;
    force?: boolean;
    statusCode?: number;
    [key: string]: unknown;
  },
  plugin?: ActionPlugin,
) => void;

export type CreateNodeField = (
  args: {
    node: Node;
    fieldName?: string;
    fieldValue?: string;
    name?: string;
    value: any;
  },
  plugin?: ActionPlugin,
  options?: ActionOptions,
) => void;

export type GraphQLFunction = <TData = any, TVariables = any>(
  query: string,
  variables?: TVariables,
) => Promise<{
  errors?: any;
  data?: TData;
}>;
