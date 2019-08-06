import to from "await-to-js";
import { VError } from "verror";
import { exec } from "child_process";

import { CoreConfig } from "../config";

export class GitClient {
  private config: CoreConfig;
  private destination: string;

  constructor() {
    this.config = {} as CoreConfig;
    this.destination = "";
  }

  withConfig = (config: CoreConfig, destination: string) => {
    this.config = config;
    this.destination = destination;
  };

  clone = async () => {
    const repository = `https://github.com/${this.config.organization}/${this.config.repository}.git`;

    const [err] = await to(
      this.execShellCommand(`git clone "${repository}" "${this.destination}"`),
    );

    if (err) {
      throw new VError(
        err,
        `while cloning ${repository} to ${this.destination}`,
      );
    }
  };

  checkout = async (branch: string) => {
    const [err] = await to(
      this.execShellCommand(
        `cd "${this.destination}" && git checkout "${branch}"`,
      ),
    );
    if (err) {
      throw new VError(err, `while checkout to branch: ${branch}`);
    }
  };

  checkoutTag = async (tag: string) => {
    const [err] = await to(this.checkout(`tags/${tag}`));
    if (err) {
      throw err;
    }
  };

  private execShellCommand = (cmd: string) =>
    new Promise((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        error ? reject(error) : resolve(stdout ? stdout : stderr);
      });
    });
}

export default new GitClient();
