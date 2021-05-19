---
title: "Kyma 1.23 Dhahran"
author:
  name: "Klaudia Grzondziel, Technical Writer @Kyma"
tags:
  - release-notes
type: release
releaseTag: "1.23.0"
redirectFrom:
  - "/blog/release-notes-123"
---

Marhaba! مرحبا !
While we're staying in the Middle East, we are still moving forward, this time having a short stop in Dhahran, Saudi Arabia. With our eyes set on the horizon and focused on delivering Kyma 2.0, we still keep providing regular improvements, this time for Serverless, Loki, and Service Mesh. So imagine you're with us in Dhahran, sitting under one of the palm trees, and read on to learn more about the recent changes.

<!-- overview -->

> **CAUTION:** In this release, the Loki volume size was increased. Before upgrading to 1.23, read the [Migration Guide](https://github.com/kyma-project/kyma/blob/release-1.23/docs/migration-guides/1.22-1.23.md) for details about the upgrade process.

See the overview of all changes in this release:

- [Serverless](#serverless) - Node.js runtime changes - v14 in, v10 out
- [Logging](#logging) - Loki volume size increased
- [Service Mesh](#service-mesh) - Istio upgraded to version 1.9.5
- [Known issues](#known-issues) - Python's standard library strips leading zeros from IP addresses

## Serverless  

### Node.js runtime changes - v14 in, v10 out

As we announced some time ago, we removed Node.js 10 from the [list of supported runtimes](https://kyma-project.io/docs/1.23/components/serverless/#details-runtimes) for Functions. At the same time, we introduced a new runtime, Node.js 14, and set it as the default one. From now on, you can create Functions using:
- Node.js 12
- Node.js 14
- Python 3.8

We also updated Kyma CLI to reflect the new runtime changes. Kyma CLI 1.23 now sets Node.js 14 as the default runtime for your Functions. If you update Kyma CLI without updating Kyma, you will face an incompatibility when initiating Functions with Kyma CLI. To resolve it, override the runtime version with the [`--runtime` flag](https://kyma-project.io/docs/1.23/cli/commands/#kyma-init-function-kyma-init-function).

## Logging

### Loki volume size increased

We increased the persistence for Loki from 1 to 5 days. To accommodate this change, we also increased the default volume size of PersistentVolumeClaim for Loki from 10Gi to 30Gi. Read the [Migration Guide](https://github.com/kyma-project/kyma/blob/release-1.23/docs/migration-guides/1.22-1.23.md) to learn more about the upgrade process.

## Service Mesh

### Istio upgraded to version 1.9.5

With this release, we upgraded Istio to version 1.9.5. This upgrade fixes several security vulnerabilities and a few minor issues. See [Istio 1.9.5 release announcements](https://istio.io/latest/news/releases/1.9.x/announcing-1.9.5/) for more information.

## Known issues

### Python's standard library strips leading zeros from IP addresses

The `ipaddress` module of the Python standard library suffers from the IP address validation vulnerability ([CVE-2021-29921](https://nvd.nist.gov/vuln/detail/CVE-2021-29921)). Up to the date of Kyma 1.23 release, there is no security patch for Python 3.8.x. We will track the vulnerability and issue a patch release for Kyma as soon as the [fix](https://bugs.python.org/issue36384) is available.

It is rather uncommon to pass IPv4 addresses with leading zeros, but if you want to tolerate leading zeros in your Serverless Python-based Functions, you can pre-process your inputs as described in the [workaround](https://bugs.python.org/msg390353).
