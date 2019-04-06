import to from 'await-to-js';
import { VError } from 'verror';

import DocsBranches from "./branches";
import DocsReleases from "./releases";
import DocsTags from "./tags";

class Checking {
  releases =  async () => {
    let err: Error | null;

    let allReleases;
    [err, allReleases] = await to(DocsReleases.get());
    if(err) throw err

    let tags;
    [err, tags] = await to(DocsTags.get());
    if(err) throw err

    if(!allReleases || !tags) return;

    const validReleases = DocsReleases.filterInvalidReleases(allReleases, tags);
    const releasesByType = DocsReleases.groupReleaseByType(validReleases);

    const releases = DocsReleases.groupReleaseByName(
      releasesByType.get("releases"),
    );
    const prereleases = DocsReleases.groupReleaseByName(
      releasesByType.get("prereleases"),
    );

    const newestReleases = DocsReleases.getNewestReleases(releases);
    const newestPrereleases = DocsReleases.getNewestReleases(prereleases);

    const filteredPrereleases = DocsReleases.filterReleased(
      newestPrereleases,
      newestReleases,
    );

    return {
      releases: DocsReleases.extractTags(newestReleases),
      prereleases: DocsReleases.extractTags(filteredPrereleases),
    }
  }

  branches =  async (configBranches: string[]) => {
    const [err, branches] = await to(DocsBranches.get(configBranches));
    if(err) throw new VError(err, `while getting branches`);

    return branches;
  }
}

export default new Checking();