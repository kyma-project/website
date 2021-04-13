import { VError } from "verror";
import to from "await-to-js";
import { gt as semverGt, coerce as semverCoerce, SemVer } from "semver";

import {
  ReposGetReleaseResponse,
  ReposListTagsResponseItem,
} from "@octokit/rest";

import GitHubClient from "../github-client/github-client";

export class ReleaseFetcher {
  async get() {
    const [err, releases] = await to(GitHubClient.getReleases());
    if (err) {
      throw err;
    }

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
    return this.groupBy(releases, current => this.getReleaseName(current));
  }

  getReleaseName(release: ReposGetReleaseResponse) {
    const fullName = release.name ? release.name : release.tag_name;
    const result = fullName.match(/^v?[0-9]+.[0-9]+/);

    if (!result) {
      return "";
    }

    return result.length ? result[0] : "";
  }

  groupReleaseByType(releases: ReposGetReleaseResponse[]) {
    return this.groupBy(releases, current =>
      current.prerelease ? "prereleases" : "releases",
    );
  }

  groupBy(
    array: ReposGetReleaseResponse[] = [],
    fn: (arg: ReposGetReleaseResponse) => string,
  ): Map<string, ReposGetReleaseResponse[]> {
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

  getNewestReleases(groupedReleases: Map<string, ReposGetReleaseResponse[]>) {
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

  handlePreReleasesWithoutRelease(
    releases: Map<string, ReposGetReleaseResponse>,
    numberOfReleases: number,
    prerelease: string,
  ) {
    const preReleaseSemver = semverCoerce(prerelease);
    if (!preReleaseSemver) {
      throw new VError(`Couldn't coerce ${prerelease} to SemVer`);
    }

    const latestReleaseVersions = [...releases.keys()].map(el =>
      semverCoerce(el),
    );

    if (!latestReleaseVersions.every(elem => !!elem)) {
      throw new VError(
        `All newest version in array: ${latestReleaseVersions} should be coercable to semver version`,
      );
    }

    const latestReleaseVersionsInSemver = (latestReleaseVersions as SemVer[]) // casting needed to fix types, we ensure that the types are correct in lines above
      .filter(arg => arg !== null)
      .sort((a, b) => (semverGt(a, b) ? -1 : 1))
      .map(el => el.raw)
      .slice(0, numberOfReleases);

    return latestReleaseVersionsInSemver.some(elem =>
      semverGt(preReleaseSemver, semverCoerce(elem) as SemVer),
    );
  }

  filterReleased(
    prereleases: Map<string, ReposGetReleaseResponse>,
    releases: Map<string, ReposGetReleaseResponse>,
    numberOfReleases: number,
  ) {
    const result = new Map<string, ReposGetReleaseResponse>();

    prereleases.forEach((value, key) => {
      if (
        !releases.has(key) &&
        this.handlePreReleasesWithoutRelease(releases, numberOfReleases, key)
      ) {
        result.set(key, value);
      }
    });

    return result;
  }

  extractTags(
    releases: Map<string, ReposGetReleaseResponse>,
    num?: number,
  ): Map<string, string> {
    const result = new Map<string, string>();

    releases.forEach((release, key) => {
      result.set(key, release.tag_name);
    });

    return new Map([...result.entries()].slice(0, num));
  }
}

export default new ReleaseFetcher();
