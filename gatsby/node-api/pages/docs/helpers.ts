import compareVersions from "compare-versions";
import { DocsVersions } from "./types";
import {
  DocsGeneratedVersions,
  DocsBranchesVersion,
  DocsReleasesVersion,
} from "../../../../tools/content-loader/src/prepare-docs/docs-versions";
import { DocsNavigation } from "../utils";

const getDocsVersions = (versions: DocsGeneratedVersions): DocsVersions => {
  const versionsByType: DocsVersions = {};

  const appendType = (
    type: string,
    versions: Array<DocsReleasesVersion | DocsBranchesVersion>,
    versionsByType: DocsVersions,
  ) => {
    if (!versions || versions.length === 0) {
      return;
    }

    const sortedVersions = versions
      .map(version => version.name)
      .sort(compareVersions)
      .reverse();

    versionsByType[type] = sortedVersions;
  };

  appendType("releases", versions.releases, versionsByType);
  appendType("prereleases", versions.pre_releases, versionsByType);
  appendType("branches", versions.branches, versionsByType);

  return versionsByType;
};

const sortNavigation = (navigation: DocsNavigation): DocsNavigation => {
  const groups = Object.keys(navigation).sort((a, b) => {
    const nameA = a.toString().toLowerCase();
    const nameB = b.toString().toLowerCase();

    if (nameA === "root") {
      return -1;
    }
    if (nameB === "root") {
      return 1;
    }
    return 0;
  });

  const sortedNavigation: DocsNavigation = {};
  groups.map(group => {
    sortedNavigation[group] = navigation[group];
  });

  return sortedNavigation;
};

export { getDocsVersions, sortNavigation };
