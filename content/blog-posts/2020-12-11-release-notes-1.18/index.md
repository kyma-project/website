---
title: "Kyma 1.18 Yerevan"
author:
  name: "Klaudia Grzondziel, Technical Writer @Kyma"
tags:
  - release-notes
type: release-notes
releaseTag: "1.18.0"
redirectFrom:
  - "/blog/release-notes-118"
---

The last stop in this year's Kyma journey lands in Armenia to visit Yerevan, one of the oldest cities in the world. Yerevan is called the "pink city" due to the color of the stone used for building. Staying in the same tone, we put on the rose-colored glasses and look forward to the future releases that are to come in 2021. For the time being, read about the changes introduced in 1.18 that focuses mostly on CLI, Monitoring, Kiali, and Console.

<!-- overview -->

> **CAUTION:** Read the [Migration Guide](https://github.com/kyma-project/kyma/blob/release-1.18/docs/migration-guides/1.17-1.18.md) before upgrading your Kyma deployment to 1.18.

See the overview of all changes in this release:

- [CLI](#cli) - Consistent flag names across all commands, changes to the `kyma install --source` command, more intuitive AKS provisioning command
- [Monitoring](#monitoring) - Full upgrade of all monitoring components
- [Kiali](#kiali) - Kiali Operator removed
- [Console](#console) - Baked-in docs removed from the Console UI
- [Known issues](#known-issues) - Prometheus-Istio crashes, Rafter in Gateway mode


## CLI

### Consistent flag names across all commands

In this release, we fixed the inconsistency in the naming of CLI command flags. Here is the complete list of changes:

- `kyma install` command
	* noWait -> no-wait
	* tlsCert -> tls-cert
	* tlsKey -> tls-key
	* fallbackLevel -> fallback-level

- `kyma upgrade` command
	* noWait -> no-wait
	* fallbackLevel -> fallback-level

- `kyma provision minikube` command
	* hypervVirtualSwitch -> hyperv-virtual-switch

For more information about the possible commands, flags, and options, read [Kyma CLI documentation](https://kyma-project.io/docs/1.18/cli/overview/).

### Changes to the `kyma install --source` command

In 1.18, the `--source=latest` option in the `kyma install` command was changed to `--source=master`. The previous option name gave users the wrong idea that the command installs the latest Kyma release version instead of the latest revision from the `master` branch.

Furthermore, we removed the `--source=latest-published` option and integrated this functionality with the `--source=master` option. If the artefacts for the latest revision are not available yet on the `master` branch, you will be asked if you want to use the previous revision.

### More intuitive AKS provisioning command

The `kyma provision aks` command now expects a JSON file for specifying the Azure Service Principal instead of a TOML file which turned out to be an error-prone and uncommon format.


## Monitoring

### Full upgrade of all monitoring components

All monitoring components got upgraded to the latest versions, especially Prometheus and Grafana.


## Kiali

### Kiali Operator removed

To reduce the maintenance efforts and resource consumption, we removed the Kiali Operator and now we just bundle the plain Kiali deployment with Kyma. See [this issue](https://github.com/kyma-project/kyma/issues/9866) for reference.


## Console

### Baked-in docs removed from the Console UI

As some of you might have already noticed, Rafter has recently entered the maintenance mode. It has served us for a long time as a backend mechanism for storing API specifications, Service Class-related documentation, and baked-in documentation in the Console UI. Since we are planning to replace Rafter's functionality with a different solution, we are moving slowly but surely away from it. As the first step, we have decided to remove the baked-in documentation that you could access in the top-right corner of the Console UI under the question mark icon. This way, we reduced the footprint of the runtime and made it more lightweight. Worry not as the docs are still available on our [website](https://kyma-project.io/docs/) in all of their shapes and forms.

As for Rafter, if you are interested in adopting it (and adapting to your liking), it is still [looking for some caring foster parents](https://github.com/kyma-project/rafter#rafter).


## Known issues

### Prometheus-Istio crashes

With the switch to Istio telemetry v2 (required for Istio 1.7), an important feature about metric retention is still missing in the Istio-proxy. Due to that, under heavy service topology changes, there might be proxy instances such as ORY Oathkeeper that keep orphaned metrics scraped by the Prometheus-Istio instance. That can cause an OOM crash. See [this issue](https://github.com/kyma-project/kyma/issues/9867) to learn more.

### Rafter in Gateway mode

Due to a known issue with Rafter overrides, Kyma fails to be installed and upgraded with [MinIO in Gateway mode](https://kyma-project.io/docs/1.18/components/rafter/#tutorials-set-min-io-to-gateway-mode). We are planning to provide a solution in a patch. See the [related issue](https://github.com/kyma-project/kyma/issues/10199) for details.
