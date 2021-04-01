---
title: Use Kyma CLI
type: Details
---

Kyma CLI comes with a set of commands, each of which has its own specific set of flags. Use them to provision the cluster locally or using a chosen cloud provider, install, and test Kyma.

For the commands and flags to work, they need to follow this syntax:

```bash
kyma {COMMAND} {FLAGS}
```

- **{COMMAND}** specifies the operation you want to perform, such as provisioning the cluster or installing Kyma.
- **{FLAGS}** specifies optional flags you can use to enrich your command.

See the example:

```bash
kyma install -s latest
```

>**TIP:** Documentation for particular commands is generated automatically with the code. See [the full list of commands and flags](https://github.com/kyma-project/cli/tree/main/docs/gen-docs).

|     Command        | Child commands   |  Description  | Example |
|--------------------|----------------|---------------|---------|
| [`completion`](/cli/commands#kyma-completion)| None| Generates and displays the bash or zsh completion script. | `kyma completion`|
| [`console`](/cli/commands#kyma-console)| None| Launches Kyma Console in a browser window. | `kyma console` |
| [`install`](/cli/commands#kyma-install)| None| Installs Kyma on a cluster based on the current or specified release. | `kyma install`|
| [`provision`](/cli/commands#kyma-provision)| [`minikube`](/cli/commands#kyma-provision-minikube)<br> [`gardener`](/cli/commands#kyma-provision-gardener) <br> [`gke`](/cli/commands#kyma-provision-gke) <br> [`aks`](/cli/commands#kyma-provision-aks)| Provisions a new cluster on a platform of your choice. Currently, this command supports cluster provisioning on GCP, Azure, Gardener, and Minikube. | `kyma provision minikube`|
| [`test`](/cli/commands#kyma-test)|[`definitions`](/cli/commands#kyma-test-definitions)<br> [`delete`](/cli/commands#kyma-test-delete) <br> [`list`](/cli/commands#kyma-test-list) <br> [`run`](/cli/commands#kyma-test-run) <br> [`status`](/cli/commands#kyma-test-status)<br> [`logs`](/cli/commands#kyma-test-logs) <br> | Runs and manages tests on a provisioned Kyma cluster. Using child commands, you can run tests, view test definitions, list and delete test suites, display test status, and fetch the logs of the tests.| `kyma test run` |
| [`version`](/cli/commands#kyma-version)|None| Shows the cluster version and the Kyma CLI version.| `kyma version` |
