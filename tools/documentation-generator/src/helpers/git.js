const { execSync } = require("child_process");

class Git {
  constructor(organization, repository, destination) {
    this.organization = organization;
    this.repository = repository;
    this.destination = destination;
  }

  clone() {
    execSync(
      `git clone "https://github.com/${this.organization}/${
        this.repository
      }.git" "${this.destination}"`,
    );
  }

  checkout(tag) {
    execSync(`cd "${this.destination}" && git checkout "tags/${tag}"`);
  }

  checkoutBranch(branch) {
    execSync(`cd "${this.destination}" && git checkout "${branch}"`);
  }
}

module.exports = {
  Git,
};
