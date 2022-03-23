---
title: "Kyma 2.1"
author:
  name: "Maja Kurcius, Technical Writer @Kyma"
tags:
  - release-notes 
type: release
releaseTag: "2.0.0"
redirectFrom:
  - "/blog/release-notes-20"
---

Ahoy, mateys! We're calling at the port again to load up with a fresh portion of new features, improvements, and upgrades, but also to unload stuff that we no longer need on this journey and that's been slowing us down. Support for Kubernetes 1.21, a new alpha option for the `deploy` command, support for non-alphanumeric characters in event types, restructure of metrics, and Istio refactorization are just some of those things that we happily bring aboard. Read on to find out more about this Kyma 2.1 ship!

<!-- overview -->

> **CAUTION:** Before upgrading to Kyma 2.1, read the [Migration Guide](https://kyma-project.io/docs/kyma/2.1/migration-guide-2.0-2.1).

See the overview of all changes in this release:

- [General](#general) - Support for Kubernetes 1.21.
- [CLI](#cli) - Dry-run option for the `deploy` command in alpha, specifying components with **downloadURL** and **version**, generating schema for Function manifests
- [Eventing](#eventing) - Support for non-alphanumeric characters in event types
- [Observability](#observability) - Kiali and Jaeger upgraded, monitoring upgraded, metrics restructured, Grafana dashboards improved, the `alertmanager` chart revamped, logging chart updated and Loki improved
- [Serverless](#serverless) - Node.js 12 deprecated
- [Service Mesh](#service-mesh) - FIPS distroless Istio images provided by Solo, Istio refactored and upgraded to 1.12.3

## General

With release 2.1, we now officially support and test against Kubernetes 1.21.

## CLI

### `deploy` command has the dry-run option in an alpha version

<!-- TODO: waiting for input -->

### Specify components with **downloadURL** and **version**

<!-- TODO: waiting for input -->

### Generate schema for Function manifests

We improved development experience for Functions developers. We added schema generation for the `config.yaml` manifests. This, when combined with dedicated plugins in your IDE, helps you avoid mistakes via validation and auto-completion.

- If you use the VSCode IDE to develop Function code, just  use the `--vscode` option when generating the Function project:
  ```bash
  kyma init function --vscode
  ```
  This command  creates the `.vscode` folder, which contains the schema for `config.yaml`. Install a [YAML plugin](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) in your IDE and the VSCode will automatically pick it up for validation and autocompletion.


- If you just want to generate the schema, use the following command:

  ```bash
  kyma get schema serverless
  ```

  This will print out the JSON schema so that you can import it in your preferred IDE.


## Eventing

### Support for non-alphanumeric characters in event types

The naming in event types comes with certain restrictions.
Previously, we only supported ASCII alphanumeric characters from the range `[a-zA-Z0-9]+`. If your name contained an offensive character, the event sending was failed.

Starting from this release, we no longer fail sending such events. Instead, unsupported characters are automatically dropped from events sent to Kyma and also from event types specified in the Subscription CRD.

Read about the [event names](https://kyma-project.io/docs/kyma/2.1/05-technical-reference/evnt-01-event-names) and [Subscription CRD](https://kyma-project.io/docs/kyma/2.1/05-technical-reference/00-custom-resources/evnt-01-subscription) in more detail.

## Observability

### Kiali and Jaeger upgraded

With Kyma 2.1, the Kiali and Tracing components got updated to the following recent versions:
- Kiali 1.44
- Jaeger 1.30.0

### Monitoring upgraded

Speaking of upgrades, the different components of the monitoring area also got one. While doing that, we felt inspired and updated the used Helm chart, too, and adapted it to the upstream charts. The components were upgraded to the following versions:

- Node-exporter 1.3.1
- Kube-state-metrics 2.3.0
- Prometheus 2.32.1
- Prometheus-operator 0.53.1
- Alertmanager 0.23.0
- Pushgateway 1.4.2
- Grafana 7.5.15
- Oauth2-proxy 7.2.1

### Metrics restructured

As the kube-state-metrics component got a major upgrade to version 2.x, some metrics got restructured. The following metrics were affected:

- The `kube_pod_container_resource_requests` and `kube_pod_container_resource_limits` metrics replaced the following metrics:
  - `kube_pod_container_resource_requests_cpu_cores`
  - `kube_pod_container_resource_limits_cpu_cores`
  - `kube_pod_container_resource_requests_memory_bytes`
  - `kube_pod_container_resource_limits_memory_byte`

- The `kube_node_status_capacity` and `kube_node_status_allocatable` metrics replaced the following metrics:
  - `kube_node_status_capacity_pods`
  - `kube_node_status_capacity_cpu_cores`
  - `kube_node_status_capacity_memory_bytes`
  - `kube_node_status_allocatable_pods`
  - `kube_node_status_allocatable_cpu_cores`
  - `kube_node_status_allocatable_memory_bytes`

- The following metrics got renamed:

  - `kube_daemonset_updated_number_scheduled` → `kube_daemonset_status_updated_number_scheduled`
  - `kube_hpa_*` → `kube_horizontalpodautoscaler_*`

<!-- TODO: is it better as a table? -->

The following table shows how the labels were restructured:

| Previously  | Now |
|-------------|-----|
| `kube_pod_container_resource_requests_cpu_cores`, <br /> `kube_pod_container_resource_limits_cpu_cores`, <br /> `kube_pod_container_resource_requests_memory_bytes`, <br /> `kube_pod_container_resource_limits_memory_byte`            | `kube_pod_container_resource_requests`, <br /> `kube_pod_container_resource_limits`   |
| `kube_node_status_capacity_pods`, <br /> `kube_node_status_capacity_cpu_cores`, <br /> `kube_node_status_capacity_memory_bytes`, <br /> `kube_node_status_allocatable_pods`, <br /> `kube_node_status_allocatable_cpu_cores`, <br /> `kube_node_status_allocatable_memory_bytes`,            | `kube_node_status_capacity`, <br /> `kube_node_status_allocatable`   |
| `kube_daemonset_updated_number_scheduled`            | `kube_daemonset_status_updated_number_scheduled`    |
| `kube_hpa_*`            | `kube_horizontalpodautoscaler_*`    |

Furthermore, the `envoy_` metrics exposed by the istio-sidecar running with every workload are not getting collected by default anymore. 
However, we continue to collect the more relevant `istio_` metrics which are used in the Istio-specific dashboards. 
It turned out that the `envoy_` metrics were helpful only in advanced troubleshooting scenarios and introduced too big a cardinality, resulting in big resource consumption. Still, you can enable them as optional. 
See [#issue 13659](https://github.com/kyma-project/kyma/issues/13659) for more details.

### Grafana dashboards improved

Several improvements were applied to the dashboards coming with the Grafana in Kyma.

- The Loki dashboard got improved by adding a new top section with the most relevant metrics displayed.
- All dashboards were adjusted to the metric changes coming with the major upgrade of kube-state-metrics.
- The dashboards tagged as `kubernetes-mixins` were updated to the latest available version from the community.
- `node-exporter` and Prometheus dashboards were replaced by the version provided by the community.
- The Kyma `frontends` and `backends` dashboards were removed, as they had no additional value to existing dashboards.
- The Kyma `Controllers` dashboards were revamped to have relevant reconciliation metrics included, and they were rolled out to all Kyma controllers.

### The `alertmanager` chart revamped

The Kyma `alertmanager` chart, which is a sub-chart of the monitoring component, got refactored more heavily. Mainly, we tried to remove customizations that were in contrast to the available community chart, to simplify future updates.

With that, the following changes were applied:

- The dedicated configuration options for VictorOps were removed. Use the typical options for configuration of notification channels instead.
- New alert rules were added.
  - `AlertmanagerFailedToSendAlerts`
  - `AlertmanagerClusterFailedToSendAlerts`
  - `AlertmanagerClusterFailedToSendAlerts Warning`
  - `AlertmanagerClusterDown`
  - `AlertmanagerClusterCrashlooping`
  - `ConfigReloaderSidecarErrors`
  - `KubeStateMetricsShardingMismatch`
  - `KubeStateMetricsShardsMissing`
  - `KubeAPITerminatedRequests`
  - `NodeFileDescriptorLimit`
  - `PrometheusLabelLimitHit`
  - `PrometheusTargetSyncFailure`
  - `PrometheusOperatorSyncFailed`
- The following alert rules were renamed:
  - `AggregatedAPIDown` → `KubeAggregatedAPIDown`
  - `AggregatedAPIErrors` → `KubeAggregatedAPIErrors`

### Logging chart updated and Loki improved

<!-- COMMENT: The "app" label available in Loki as log stream filter was based on the values of the kubernetes "app" labels. Now, we also mapped the  "app.kubernetes.io/name" label to the loki "app" label.
There is a mistake in my sentence. We mapped the "app.kubernetes.io/name" kubernetes label to a new loki label called "component" -->

We updated the logging component to the latest available FluentBit version 1.8.13.
Furthermore, the label map for the Loki integration got improved by:
- Mapping additionally the labels `app.kubernetes.io/component` and `app.kubernetes.io/name` to the `app` label
- Removing the `release` and `serverless.kyma-project.io/uuid` labels to improve the chunk size handling in Loki 

Moreover, besides having data retention **by time**, we introduced a new sidecar taking care of data retention **by size**. With that, Loki will not crash anymore when reaching the volume size limit. Oldest data gets deleted first.

## Serverless

### Node.js 12 deprecated

The base image for [Node.js 12 will be maintained only until April 2022](https://nodejs.org/en/about/releases/). Thus, following the recommendations from Node.js, we are planning to remove Node.js 12 from the list of supported runtimes soon. This basically means that Node.js 12-based Functions will continue to work, but you won’t be able to create a new Function on this runtime or edit the existing Function to run on it.

For now, we recommend that you re-configure all your Node.js 12 Functions to run on the Node.js 14 runtime.

## Service Mesh

### FIPS distroless Istio images provided by Solo

With the Kyma 2.1, both [Istio control plane and data plane](https://istio.io/latest/docs/ops/deployment/architecture/) now use distroless images compliant with Federal Information Processing Standards (FIPS). [Solo](https://www.solo.io/) provides the FIPS-certified images. To learn more, read about [Distroless FIPS-compliant Istio](https://www.solo.io/blog/distroless-fips-compliant-istio/).

### Istio upgraded to 1.12.3

With this release, we upgraded Istio from 1.11.4 to 1.12.3. For more details on the introduced changes, read the official [Istio 1.12.3 release notes](https://istio.io/latest/news/releases/1.12.x/announcing-1.12.2/).

### Istio refactored

With Kyma 2.1, we improved the Istio component, splitting it into Istio and Istio Resources charts. The Istio component is now solely responsible for pure Istio installatoion. The Istio Resources chart includes Kyma-specific configuration.
The Istio Configuration chart was renamed to Istio. 