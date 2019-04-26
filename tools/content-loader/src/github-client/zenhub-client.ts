import to from "await-to-js";
import { VError } from "verror";
import { exec } from "child_process";
import a, { AxiosInstance } from "axios";

import { CoreConfig } from "../config";

export class ZenHubClient {
  private token: string;
  private axios: AxiosInstance;

  constructor() {
    this.axios = null;
  }

  withConfig = (token: string) => {
    this.axios = a.create({
      baseURL: "https://api.zenhub.io/",
      headers: {
        "X-Authentication-Token": token,
      },
    });
  };

  reportForReleases = async (repo_id: string) => {
    const [err, data] = await to(
      this.axios.get(`/p1/repositories/${repo_id}/reports/releases`),
    );
    if (err)
      throw new VError(
        err,
        `while fetching reports for releases for repo: ${repo_id}`,
      );

    return data.data;
  };

  issuesForRelease = async (repo_id: string) => {
    const [err, data] = await to(
      this.axios.get(`/p1/reports/release/${repo_id}/issues`),
    );
    if (err)
      throw new VError(
        err,
        `while fetching reports for releases for repo: ${repo_id}`,
      );

    return data.data;
  };
}

export default new ZenHubClient();
