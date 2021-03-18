---
title: "Kyma 1.21 Berlin"
author:
  name: "Maja Kurcius, Technical Writer @Kyma"
tags:
  - release-notes
type: release
releaseTag: "1.21.0"
redirectFrom:
  - "/blog/release-notes-121"
---

Herzlich Wilkommen! 
We left the windy Amsterdam, but we're staying within the area of the West Germanic group of languages, this time stopping at Berlin, the capital of Germany and a world city of culture, politics, media, and science. 
But don't be fooled by the great historical buildings, universities, and museums. 
Berlin does a great job at combining this rich heritage with the new and avant-garde, and it does all that ahead of the rest, too. 
Contemporary art, numerous festivals, artisanal coffee shops, craft beer, and the famous nightlife are just part of it. 
Just like Berlin, Kyma also combines a solid foundation with innovation, providing high quality that will not cost you an arm and a leg. 
This time, we focused on CLI, Monitoring, and Eventing, so grab a cup of (artisanal) coffee, and read on.

<!-- overview -->

> **CAUTION:** In this release, the Eventing component was switched completely from Knative to Kyma-internal Subscription custom resource (CR), which is based on the NATS server. Before upgrading to 1.21, read the [Migration Guide](https://github.com/kyma-project/kyma/blob/release-1.21/docs/migration-guides/1.20-1.21.md) for details on Troubleshooting and Upgrade.

See the overview of all changes in this release:

- [CLI](#cli) - alpha commands stabilized, `run` command available locally
- [Monitoring](#monitoring) - dynamic datasource configuration, deriving traces from Loki logs
- [Eventing](#eventing) - Knative-based Eventing replaced by NATS 

## CLI

### New alpha commands stabilized 

We've recently added new alpha commands: `alpha provision k3s`, `alpha deploy`, `alpha delete`, and  `alpha version`.
In this release, we stabilized these commands, and they are now ready for beta-testing.
For more information, read the [Alpha Command Usage Examples](https://kyma-project.io/docs/master/cli/overview#details-kyma-cli-alpha-command-usage-examples) and the command help. 
 
### Test-run Functions locally 

Kyma CLI provides a set of helpful commands for Function developers.
They support developers in starting development, pushing local code to the Runtime, and syncing Functions.
In this release, we have added one more command, to facilitate your developer experience even more.
The `run` command allows you to run the Function's code locally, before applying it to the Kyma runtime.
For more information, read the [Kyma CLI documentation](https://kyma-project.io/docs/1.21/cli/commands/#kyma-run-function-kyma-run-function). 

## Monitoring

### Dynamic data source configuration 

We enabled the Grafana feature to collect and load data source definitions from Kubernetes ConfigMaps at startup. 
By doing that, we were able to move the individual pre-configured data sources into the related components. For example, the data source for Loki moved into the `logging` component. This way, we improved the resource organization. 

### Deriving traces from Loki logs 

The Loki data source for Grafana now contains a new derived field for `traceId`. 
By default, Grafana checks every log in the Grafana View for the `traceId=(\w+)` pattern. 
If it finds this `traceId`, it displays the link to the corresponding Jaeger trace.
For more information about derived fields, read the [Grafana documentation](https://grafana.com/docs/grafana/latest/datasources/loki/#derived-fields).

## Eventing

### Knative-based Eventing replaced by NATS 

In this release, we removed Knative-based Eventing. 
The new Eventing is based on [NATS](https://github.com/nats-io/nats-server) with a Kyma-specific Subscription custom resource (CR). 
For upgrade scenarios, refer to the [Migration Guide](https://github.com/kyma-project/kyma/blob/release-1.21/docs/migration-guides/1.20-1.21.md).
For more information on the new Eventing, read the [documentation](https://kyma-project.io/docs/master/components/eventing).