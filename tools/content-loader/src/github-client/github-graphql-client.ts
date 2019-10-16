import to from "await-to-js";
import { VError } from "verror";
import { graphql } from "@octokit/graphql";

import { CoreConfig } from "../config";

export class GitHubGraphQLClient {
  private config: CoreConfig;
  private graphql: any;

  constructor() {
    this.graphql = null;
  }

  withConfig = (config: CoreConfig) => {
    this.config = config;

    if (config.token) {
      this.graphql = graphql.defaults({
        headers: {
          authorization: `token ${config.token}`,
        },
      });
    }
  };

  query = async (query: string, options: any) => {
    const [err, data] = await to(this.graphql(query, options));
    if (err) {
      throw new VError(err, `while query: ${query}`);
    }

    return data;
  };
}

export default new GitHubGraphQLClient();
