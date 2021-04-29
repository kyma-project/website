---
title: "Kyma 1.22 Cappadocia"
author:
  name: "Aleksandra Simeonova, Technical Writer @Kyma"
tags:
  - release-notes
type: release
releaseTag: "1.22.0"
redirectFrom:
  - "/blog/release-notes-122"
---

Hoşgeldiniz!
We are leaving Western Europe this month and heading to the beautiful Cappadocia in Central Turkey. This region has a very rich history beginning as early as the Bronze age. It is famous for the magical-looking Fairy Chimneys, massive rock formations caused by volcanic eruptions. In the tall vertical rocks, visitors can find houses and temples carved thousands of years ago. Today, hot-air ballooning is popular in Cappadocia, often adding to its other-worldly appearance as the colorful aircraft rise above the Fairy Chimneys at sunrise. Let's embark on our own journey now and explore the horizons of Kyma 1.22.

<!-- overview -->

See the overview of all changes in this release:

- [Installation](#installation) - Istio upgrade to 1.9.1, ORY charts update
- [CLI](#cli) - Option to deploy a specific Kyma branch
- [Other](#other) - Inclusive language

## Installation

### Istio upgrade to 1.9.1

With this release, we upgraded Istio from 1.8.2 to 1.9.1. You can find more details in the [Istio 1.9.1 release notes](https://istio.io/latest/news/releases/1.9.x/announcing-1.9/).

### ORY charts update

In Kyma 1.22, ORY charts were updated to the latest versions from ORY repositories. These charts are not a direct copy because of many customizations and extensions specific to Kyma. The main changes resulting from this update are:
- The Hydra chart was updated to version 0.5.5, Hydra version 1.8.5. Find more details in the [Hydra 1.8.5 release notes](https://github.com/ory/hydra/releases/tag/v1.8.5).
- The Oathkeeper chart was updated to version 0.5.7, Oathkeeper version v0.38.9-beta.1. Find more details in the [Oathkeeper v0.38-9-beta.1 release notes](https://github.com/ory/oathkeeper/releases/tag/v0.38.9-beta.1).
- Hydra-Maester and Oathkeeper-Maester charts were updated accordingly.

The update also caused important changes in Hydra autoscaling (HPA) overrides. The ORY charts now provide a more recent and configurable set of overrides. Existing overrides defined in the `hpa.hydra` entry were replaced by a configuration defined in `hydra.deployment.autoscaling`. Take a look at the [`values.yaml`](https://github.com/kyma-project/kyma/blob/release-1.22/resources/ory/charts/hydra/values.yaml) file for a default configuration.

## CLI

### Option to deploy a specific Kyma branch

Starting from this release, you can use the `kyma alpha deploy` command to specify any branch of the official Kyma repository as a source to install or update Kyma. You can find more details in the [CLI documentation](https://kyma-project.io/docs/cli/commands/#kyma-alpha-deploy-kyma-alpha-deploy).

## Other

### Inclusive language

Following [good practices from GitHub](https://github.com/github/renaming), we adjusted our repositories to use more inclusive language and got rid of phrases such as "whitelist", "blacklist", and "slave" wherever possible. We also renamed the `master` branches to `main` in the following repositories:

- `kyma-project` organization:
  - [`busola`](https://github.com/kyma-project/busola)
  - [`busola-migrator`](https://github.com/kyma-project/busola-migrator)
  - [`cli`](https://github.com/kyma-project/cli)
  - [`community`](https://github.com/kyma-project/community)
  - [`control-plane`](https://github.com/kyma-project/control-plane)
  - [`examples`](https://github.com/kyma-project/examples)
  - [`hydroform`](https://github.com/kyma-project/hydroform) (moved from `kyma-incubator`)
  - [`kyma`](https://github.com/kyma-project/kyma)
  - [`test-infra`](https://github.com/kyma-project/test-infra)
  - [`third-party-images`](https://github.com/kyma-project/third-party-images) (moved from `kyma-incubator`)
  - [`website`](https://github.com/kyma-project/website)

- `kyma-incubator` organization:
  - [`api-gateway`](https://github.com/kyma-incubator/api-gateway)
  - [`documentation-component`](https://github.com/kyma-incubator/documentation-component)
  - [`metris`](https://github.com/kyma-incubator/metris)

To update the local setup of your forks, run these commands:

```bash
git branch -m master main
git fetch upstream
git branch -u upstream/main main
```