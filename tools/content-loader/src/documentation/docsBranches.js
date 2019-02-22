class DocsBranches {
  getBranches(commit, configBranches) {
    const currentBranches = configBranches ? configBranches : [];
    const master = currentBranches.find(current => current.name === "master");

    let masterCommit = commit;
    if (!commit && master) {
      masterCommit = master.commit;
    }

    return new Map([["master", masterCommit]]);
  }

  getOutdatedBranches(branches, configBranches) {
    const result = new Map();
    const currentBranches = configBranches ? configBranches : [];

    branches.forEach((commit, branch) => {
      const current = currentBranches.find(current => current.name === branch);

      if (commit && (!current || current.commit !== commit)) {
        result.set(branch, commit);
      }
    });

    return result;
  }
}

module.exports = new DocsBranches();
