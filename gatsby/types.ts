import { Node } from "gatsby";

interface ActionPlugin {
  name: string;
}

interface ActionOptions {
  [key: string]: any;
}

export type CreatePageFn = (
  args: { path: string; component: string; context: Record<string, any> },
  plugin?: ActionPlugin,
  option?: ActionOptions,
) => void;

export type CreateRedirectFn = (
  redirect: {
    fromPath: string;
    toPath: string;
    isPermanent?: boolean;
    redirectInBrowser?: boolean;
    force?: boolean;
    statusCode?: number;
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
