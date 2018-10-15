const octokit = require("@octokit/rest");

class GitHub {
  constructor(organization, repository, token) {
    this.organization = organization;
    this.repository = repository;
    this.token = token;
    this.octokit = octokit();

    if (token) {
      this.octokit.authenticate({
        type: "oauth",
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

  async getLatestRelease() {
    const response = await this.octokit.repos.getLatestRelease({
      owner: this.organization,
      repo: this.repository,
    });

    return response.data;
  }
}

module.exports = {
  GitHub,
};
