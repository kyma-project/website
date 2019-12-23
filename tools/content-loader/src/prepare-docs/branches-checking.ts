import to from "await-to-js";
import { VError } from "verror";

import BranchesSerializer from "./branches-serializer";
import ReleaseFetcher from "./release-fetcher";
import TagsFetcher from "./tag-fetcher";

export class BranchesChecking {
  releases = async (numberOfReleases: number) => {
    let err: Error | null;

    let allReleases;
    [err, allReleases] = await to(ReleaseFetcher.get());
    if (err) {
      throw err;
    }

    let tags;
    [err, tags] = await to(TagsFetcher.get());
    if (err) {
      throw err;
    }

    if (!allReleases || !tags) return;

    const validReleases = ReleaseFetcher.filterInvalidReleases(
      allReleases,
      tags,
    );
    const releasesByType = ReleaseFetcher.groupReleaseByType(validReleases);

    const releases = ReleaseFetcher.groupReleaseByName(
      releasesByType.get("releases"),
    );
    const prereleases = ReleaseFetcher.groupReleaseByName(
      releasesByType.get("prereleases"),
    );

    const newestReleases = ReleaseFetcher.getNewestReleases(releases);
    const newestPrereleases = ReleaseFetcher.getNewestReleases(prereleases);

    const filteredPrereleases = ReleaseFetcher.filterReleased(
      newestPrereleases,
      newestReleases,
    );

    return {
      releases: ReleaseFetcher.extractTags(newestReleases, numberOfReleases),
      prereleases: ReleaseFetcher.extractTags(filteredPrereleases),
    };
  };

  branches = async (configBranches: string[]) => {
    const [err, branches] = await to(BranchesSerializer.get(configBranches));
    if (err) {
      throw new VError(err, `while getting branches`);
    }

    return branches;
  };
}

export default new BranchesChecking();
