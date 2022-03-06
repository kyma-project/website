import { ReposGetReleaseResponse } from "@octokit/rest";
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
    // const newReleases = validReleases.sort((first, second) => {
    //   const firstDate = first.tag_name;
    //   const secondDate = second.tag_name;
    //   return Number.parseFloat(secondDate) - Number.parseFloat(firstDate);
    // });
    // const mappedReleases = new Map<string, ReposGetReleaseResponse>();
    // newReleases.forEach(release =>
    //   mappedReleases.set(release.tag_name, release),
    // );

    const newestReleases = ReleaseFetcher.getNewestReleases(releases);
    const newestPrereleases = ReleaseFetcher.getNewestReleases(prereleases);

    const filteredPrereleases = ReleaseFetcher.filterReleased(
      newestPrereleases,
      newestReleases,
      numberOfReleases,
    );
    //   const tempTags = new Map<string, string>();

    //   mappedReleases.forEach((releaseInfo, tagName) => {
    //     tempTags.set(tagName, tagName);
    //   });
    //   const extractedtags = new Map([...tempTags.entries()].slice(0, 1));

    //   return {
    //     releases: extractedtags,
    //     prereleases: extractedtags,
    //   };
    // };

    const extractedTagsRel = ReleaseFetcher.extractTags(
      newestReleases,
      numberOfReleases,
    );
    const extractedTagsPre = ReleaseFetcher.extractTags(filteredPrereleases);
    console.log("tags rel", extractedTagsRel);
    console.log("tags pre", extractedTagsPre);
    return {
      releases: extractedTagsRel,
      prereleases: extractedTagsPre,
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
