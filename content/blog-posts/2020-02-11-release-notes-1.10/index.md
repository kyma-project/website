---
title: "Kyma 1.10 Quebec"
author:
  name: "Karolina Zydek, Technical Writer @Kyma"
tags:
  - release-notes
type: release
releaseTag: "1.10.0"
redirectFrom:
  - "/blog/release-notes-110"
---

The journey all the way from Paris 1.9 to Quebec 1.10 turned out to be quite extensive but rewarding for the Kyma crew. We reached Quebec with recharged batteries, leveling them up to Kubernetes 1.16, Istio 1.4.3, Minikube 1.6, and Velero 1.2. We created production profiles for Istio and ORY, made a few tweaks in Compass, and introduced native DNS support for Kyma provisioned on Gardener clusters. Finally, we managed to add a few optional features, such as the API Rules view in the Console UI or the new Knative Kafka channel for event forwarding. For more details, read the full story behind Kyma 1.10 Quebec.

<!-- overview -->

>**CAUTION:** Before upgrading your Kyma deployment to 1.10, you must upgrade Tiller. Follow the [Migration Guide](https://github.com/kyma-project/kyma/blob/release-1.10/docs/migration-guides/1.9-1.10.md) for details. If you upgrade to the new release without performing the steps described in the migration guide, you can compromise the functionality of your cluster or make it unusable.

See the overview of all changes in this release:

- [Known issues](#known-issues) - Monitoring-related issues with AKS metrics
- [Backup](#backup) - Updated Velero and improved Azure support
- [CLI](#cli) - Support for Minikube 1.6, removal of the `uninstall` command
- [Compass](#compass) - Automatic Runtime registration in the Director, custom configuration of Runtimes, automatic Runtime-Director connection, new templates for Application registration
- [Console](#console) - Possibility to create Access Rules for APIs from the Console UI
- [Eventing](#eventing) - Knative Kafka Channel integration, new Grafana dashboards for the Knative Eventing Mesh
- [Installation](#installation) - Native Gardener DNS support, installation of components from remote locations, Kubernetes 1.16 compatibility
- [Logging](#logging) - Support for Fluent Bit as the new log collector
- [Service Management](#service-management) - Possible failed status for created ServiceInstances, Helm Broker blocks deleting (Cluster)ServiceBrokers with dependencies
- [Service Mesh](#service-mesh) - Istio upgraded to 1.4.3, production profile for Istio, production profile for ORY

## Known issues

### AKS metrics

Current Monitoring deployment does not allow Prometheus to scrape metrics, such as CPU, memory, and Network, from the kubelet on AKS. As a consequence, metrics are not displayed in Grafana. To solve this problem, you need to apply the patch for the `monitoring-kubelet` ServiceMonitor. For detailed instructions, see [this](https://github.com/kyma-project/kyma/issues/6846) issue.

## Backup

### Updated Velero and improved Azure support

To resolve issues related to AKS-based environments, we updated the Velero version to 1.2. The purpose of the upgrade was to ensure that the backup and restore procedure works smoothly on AKS clusters.

## CLI

### Support for Minikube 1.6

CLI and Kyma were tested with the latest Minikube version 1.6 that has now become the officially supported version.

### Uninstall command removed

The `uninstall` command was one of the first commands available in the Kyma CLI. It was based on a very simple implementation that turned out to work unreliably. We plan to redesign it but due to other priorities at the moment, we decided to remove the command for now and restore it only when this feature is stabilized.

## Compass

### Runtime Provisioner registers Runtimes in the Director

With the 1.10 release, the default flow no longer requires manual registration of Runtimes in the Director – it is now done automatically by the Runtime Provisioner when it receives the request for Runtime provisioning. It also introduced a few minor API changes – the mutation now requires input parameters for the Runtime registration.

### Custom configuration of Runtimes

The new functionality was introduced in the Runtime Provisioner's API. Starting from this release, you can specify which components you want to have installed on your Runtime. The Runtime Provisioner's API now accepts a list of components (with override values) that are passed on to the Kyma Installer. This is used to create the Installation CR and should contain only components that are already available in Kyma.

### Automatic Runtime-Director connection

The features for the Runtime Provisioner now include establishing the automatic connection – newly Provisioned Runtimes will have their Agents supplied with all necessary information to create and maintain a connection with the Director.

### Applications registration from templates

It is now possible to register new Applications using predefined templates. In this case, all you need to do is select a template and fill in the values for all placeholders that a given template requires.

![Application template](./application-template.png)

## Console

###  Creation of Access Rules for your APIs from the Console UI

Kyma comes with a built-in API Gateway Controller that allows you to define API Rules for your services. With this release, it is now possible to define those API Rules from the Console UI.

> **NOTE:** This view is still considered experimental. You can use it only after enabling **Experimental functionalities** under **General Settings**.  

![API rules](./api-rules.png)

With the new API Rules view, you can define three types of access strategies:
- `noop` that stands for "no operation" and means access without any token
- `OAuth2` for app-to-app access management
- `JWT` for authenticated users only

![API rules 2](./api-rules2.png)

## Eventing

### Knative Kafka Channel integration

Thanks to Knative Eventing that allows you to provide implementations of various channels for event forwarding, Kyma now comes with an optional [Knative Kafka channel](https://github.com/kyma-incubator/knative-kafka) that was tested against Azure Event Hubs. You can read how to use it in the Knative Eventing Mesh [here](https://kyma-project.io/docs/components/event-bus/#details-knative-eventing-mesh-alpha-kafka).

### Grafana dashboards for Knative Eventing Mesh

The fact that Knative Eventing Mesh has many moving parts creates the need for increased observability over the mesh components. We've started introducing multiple Grafana dashboards that are dedicated to Knative Eventing Mesh. For a start, Kyma 1.10 comes with a dashboard for Pods' health monitoring in the Knative Eventing Mesh.

![Eventing Mesh dashboard](./event-mesh.png)

## Installation

### Native Gardener DNS support

The `xip-patch` component that is installed with the default Kyma setup now offers full Gardener DNS support. This refers to use cases when you have a Gardener cluster and install Kyma with its default configuration on it, without any custom overrides. `xip-patch` automatically recognizes your Gardener environment, creates custom resources that Gardener first reads and then in response:
- Assigns a domain to your cluster.
- Generates a corresponding wildcard certificate for the generated domain.
- Configures the Gardener-based DNS entry for your domain.

These steps are now performed automatically, without any manual configuration required on your end.

### Installation of components from remote locations

The Kyma Installer has a new feature that allows you to install your components from remote locations that are either GitHub repositories or HTTP servers. Previously, in order to install a new component using Installer, you had to build the Installer on your own. Currently, the Installation CR contains the **source.url** field in which you can specify the remote location of your Helm chart. The Installer tries to fetch sources from this location three times before the installation or upgrade fails. To learn more, see our [docs](https://kyma-project.io/docs/root/kyma/#configuration-install-components-from-user-defined-ur-ls).

### Kubernetes 1.16 compatibility

Kubernetes 1.16 provides new features but also drops support for old API versions. In this release, we migrated the Kubernetes API versions used by Kyma to the latest ones to meet the compatibility requirements. Thanks to this, it is now possible to install Kyma on Kubernetes 1.16.

## Logging

### Support for Fluent Bit as the new log collector

To enable more integrations with external logging systems, the Promtail log collector that came together with Loki got replaced with [Fluent Bit](https://fluentbit.io/). Fluent Bit is a well-known component in the Kubernetes ecosystem and provides many integrations with other systems out of the box. The integration with the bundled Loki is still assured as part of Kyma's Logging component.

## Service Management

### Possible failed status for created ServiceInstances

If your ServiceInstance creation was successful and yet the release is marked as `FAILED` on the releases list when running the `helm list` command, it means that there is an error on the Helm's side that was not passed on to the Helm Broker. To get the error details, check Tiller's logs.

### Helm Broker blocks deleting (Cluster)ServiceBrokers with dependencies

If a ServiceBroker or ClusterServiceBroker custom resource (CR) is deleted before you remove the corresponding ServiceInstance, the ServiceInstance cannot be deprovisioned from the Service Catalog. As of this release, Helm Broker doesn't remove the (Cluster)ServiceBroker CR if there are any ServiceInstances in the cluster provisioned by the Helm Broker. The Helm Broker will remove the (Cluster)ServiceBroker CR only when there are no related ServiceInstances remaining.

## Service Mesh

### Istio upgraded to 1.4.3

The latest release comes with a new version of Istio 1.4.3. This change has affected our Istio installation as now it is installed using [istioctl](https://istio.io/docs/reference/commands/istioctl/). The reason behind upgrading Kyma to the latest Istio version was that the support for 1.3 will end [soon](https://istio.io/news/support/announcing-1.3-eol/). To read more about all changes introduced in 1.4.3, see [Istio release notes](https://istio.io/news/releases/1.4.x/announcing-1.4.3/).

### Production profile for Istio

The default cluster configuration provides Istio that is good enough for playground purposes but not sufficient for a production-grade workload. This release comes with the production profile for Istio which increases Application scalability (updated HPA) and provides higher CPU and memory limits/requests for the Istio control plane components. These changes improve the overall Istio components' performance and stability. The production profile configuration is optional, not enabled by default. To learn more about the profile, read our [docs](https://kyma-project.io/docs/components/service-mesh/#configuration-service-mesh-production-profile).

### Production profile for ORY

The latest release also ships with the production profile for ORY. This involves increased CPU requests for the Oathkeeper and an automatically deployed PostgreSQL database in which Hydra stores data. This profile isn't enabled by default. Currently, if you enable the production profile during the Kyma upgrade, you will need to manually synchronize clients in Hydra. We will be working on this synchronization mode during the next release cycle.  
