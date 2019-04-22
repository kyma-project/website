import to from "await-to-js";
import {
  ReposGetReleaseResponse,
  ReposListTagsResponseItem,
} from "@octokit/rest";

import GitHubClient from "../github-client/github-client";
import { DocsReleasesVersion } from "./docs-versions";

class ReleaseFetcher {
  async get() {
    const [err, releases] = await to(GitHubClient.getReleases());
    if (err) throw err;

    return releases;
  }

  filterInvalidReleases(
    releases: ReposGetReleaseResponse[],
    tags: ReposListTagsResponseItem[],
  ) {
    const tagsArray = tags.map(tag => tag.name);

    return releases.filter(release => {
      const fullName = release.name ? release.name : release.tag_name;
      return tagsArray.includes(fullName);
    });
  }

  groupReleaseByName(releases: ReposGetReleaseResponse[]) {
    return this.groupBy(releases, current => {
      return this.getReleaseName(current);
    });
  }

  getReleaseName(release: ReposGetReleaseResponse) {
    const fullName = release.name ? release.name : release.tag_name;
    const result = fullName.match(/^v?[0-9]+.[0-9]+/);
    return result.length ? result[0] : "";
  }

  groupReleaseByType(releases: ReposGetReleaseResponse[]) {
    return this.groupBy(releases, current => {
      return current.prerelease ? "prereleases" : "releases";
    });
  }

  groupBy(array: any[], fn) {
    return array.reduce((prv, curr) => {
      const key = fn(curr);
      let values = prv.get(key);

      if (!values) {
        values = [];
        prv.set(key, values);
      }

      values.push(curr);
      return prv;
    }, new Map());
  }

  getNewestReleases(groupedReleases) {
    const result = new Map<string, ReposGetReleaseResponse>();

    groupedReleases.forEach((value, key) => {
      const sorted = value
        .sort((first, second) => {
          const firstDate = new Date(first.published_at);
          const secondDate = new Date(second.published_at);
          return firstDate.getTime() - secondDate.getTime();
        })
        .reverse();

      result.set(key, sorted[0]);
    });

    return result;
  }

  filterReleased(prereleases, releases) {
    const result = new Map<string, ReposGetReleaseResponse>();

    prereleases.forEach((value, key) => {
      if (!releases.has(key)) {
        result.set(key, value);
      }
    });

    return result;
  }

  extractTags(releases) {
    const result = new Map<string, string>();

    releases.forEach((release, key) => {
      result.set(key, release.tag_name);
    });

    return result;
  }
}

export default new ReleaseFetcher();
