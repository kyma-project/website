const octokit = require("@octokit/rest");

class GitHub {
  constructor(organization, repository, token) {
    this.organization = organization;
    this.repository = repository;
    this.token = token;
    this.octokit = octokit();

    if (token) {
      this.octokit.authenticate({
        type: "token",
        token: token,
      });
    }
  }

  async getReleases() {
    const response = await this.octokit.repos.getReleases({
      owner: this.organization,
      repo: this.repository,
    });

    return response.data;
  }

  async getLatestCommit(branch) {
    const response = await this.octokit.repos.getBranch({
      owner: this.organization,
      repo: this.repository,
      branch: branch,
    });

    const result = {
      name: branch,
      commit: response.data.commit.sha,
    };

    return result;
  }

  async getTags() {
    const response = await this.octokit.repos.getTags({
      owner: this.organization,
      repo: this.repository,
      per_page: 100,
    });

    return response.data;
  }
}

module.exports = {
  GitHub,
};
