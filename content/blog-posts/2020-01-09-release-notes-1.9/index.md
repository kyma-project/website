---
title: "Kyma 1.9 Paris"
author:
  name: "Malgorzata Swieca, Technical Writer @Kyma"
tags:
  - release-notes
type: release
releaseTag: "1.9.0"
redirectFrom:
  - "/blog/release-notes-19"
---

Bonjour à tous! Welcome to Paris where we land surrounded by breathtaking architecture and renowned galleries. A little bit intimidated by the cultural capital of Europe, we stopped by to proudly exhibit Kyma 1.9 with its new features. This release we focused on Compass functionalities, monitoring updates, or new request headers and query parameters in the Application Connector. We also did some merging and renaming to create Rafter - a standalone project for managing assets through custom resources - and integrate it in Kyma. Read the full release notes for the complete list of improvements offered by the 1.9 release. Voilà!

<!-- overview -->

See the overview of all changes in this release:

- [Application Connector](#application-connector) - New custom request headers and query parameters for APIs secured with OAuth
- [Asset Store aka Rafter](#asset-store-aka-rafter) - Asset Store and Headless CMS refactored and merged into Rafter
- [CLI](#cli) - Support for Azure
- [Compass](#compass) - Provisioner enhanced, Application Templates added, API Director playground prepared to try out, redesigned list view in the Compass UI, and more
- [Console](#console) - Improved Addons Configuration view
- [Eventing](#eventing) - Knative Eventing mesh available for testing purposes
- [Installation & Documentation](#installation-&-documentation) - Gardener provisioning based on Kyma CLI documented
- [Monitoring](#monitoring) - Adjustments and update to the latest version
- [Service Management](#service-management) - Changes in the deletion process of the ServiceBroker CR
- [Known issues](#known-issues) - Workarounds for issues with backup and Ratfer, and logging components
- [Migrations and upgrades](#migrations-and-upgrades) - Rafter-related scripts and guidelines for the 1.8.0 - 1.9.0 upgrade

## Application Connector

Starting from this release, we support additional headers and query parameters in OAuth token calls. Now you can customize the flow in an easy and native way. Check the Application Connector [documentation](https://github.com/kyma-project/kyma/blob/release-1.9/docs/application-connector/08-04-register-secured-api.md#register-an-oauth-secured-api) to find the tutorial and examples.

## Asset Store aka Rafter

In the last 2 months we focused on refactoring the Asset Store and Headless CMS components. Our goals were to:

- Optimize those components for resources consumption  
- Move those components to a separate repository as they do not depend on Kyma. As a result we aimed to have an independent project with its own release cycles that is open for the wider community.

During the refactoring we noticed that after a few months of developing and making changes in the Headless CMS, that had been built on top of the Asset Store, it was generic enough to become a part of the Asset Store. We renamed a DocsTopic custom resource (CR) to an AssetGroup CR which allowed us to have a single controller manager instead of two. The final result was that we merged those 2 components into one under a new name [Rafter](https://github.com/kyma-project/rafter/).

Thanks to the fact that we use [MinIO](https://min.io/) as a backend for Rafter, we get an S3-like files/assets store managed with [CRDs](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/).

This release introduces Rafter in Kyma. For more details, read the [documentation](https://github.com/kyma-project/kyma/tree/release-1.9/docs/rafter). To make sure the switch is seamless, we prepared automated migration for your convinience. For more details, see the [Migrations and upgrades](#migrations-and-upgrades) section.

## CLI

### Azure support

Finally, you can provision a Kubernetes cluster on Azure basing on AKS. It follows the same command pattern as Google Cloud Platform basing on GKE. Give it a try and run `kyma provision azure`.

## Compass

### Provisioner

It is now possible to install Kyma on provisioned clusters. After cluster creation is finished, the Provisioner will attempt to install a basic Kyma deployment. At this point, the supported environment for the installation is Gardener with Azure or GCP credentials.

Also, starting from this relase, the `cleanupRuntimeData` mutation does not only return a cryptic operation ID but also provides a clear status. You get information whether request input has errors or if the data was deleted successfully. You only need one call to get detailed knowledge on the clean-up result.

### Runtime eventing configuration available for Applications in the same scenario  

When you create a scenario and then assign Applications and Runtimes, the first registered Runtime is nominated as the default Eventing System for all Applications. That information is spread over all Application and can be consumed by External Applications that start to send events.

However, a Compass scenario Administrator still can decide that another Runtime from a given scenario will play the role of the default Eventing System. Changimng the Runtime will adjust Applications automatically.

### Application Templates API

Now you can preconfigure Application input with Application Templates. It allows you to easily create similar Applications by defining placeholders and filling in the static configuration data.

### Play with Director API

Visit the Director API GraphQL playground and try out the Director API! We have prepared API documentation along with examples that you can access there.

### Harmonization of list views in the Compass UI

For this release, we redesigned our list component to improve and harmonise UX around list views in the Compass UI.

![List views](./list-views-in-compass-UI.png)

### Other Compass improvements

Kyma 1.9 also introduces improvements to the Compass Director API. Now the mutation and query names are more descriptive, the GraphQL input is properly validated for all mutations, and the Tenant Mapping Handler error handling is much more efficient.

## Console

### Redesigned Addons Configuration  

We redesigned the Addons Configuration view. Now, with the recent changes, you can see more detailed status of each addon that you configured via addon repositories.

![Status information](./status-info.png)

## Eventing

### Knative Eventing mesh (Alpha)

In this release, we introduced a new Knative Eventing mesh as an alpha feature which you can use for testing purposes only. It leverages Knative Eventing components to build an eventing mesh that provides event routing and pub/sub capabilities. This mesh layer abstracts the underlying messaging system and allows you to configure different persistence for each Namespace. The new Eventing Mesh runs in parallel with the existing Event Bus. The Kyma Event Bus still supports sending Events to the regular eventing endpoint, while a separate Kyma endpoint handles sending Events to the new Knative Eventing Mesh. Read more about it [here](https://github.com/kyma-project/kyma/blob/release-1.9/docs/event-bus/03-04-knative-eventing-mesh.md).

## Installation & documentation

### Gardener provisioning based on Kyma CLI documented

After having the feature of provisioning a Gardener cluster via CLI introduced last release, we documented it officially now. The instructions for provisioning a Gardener cluster on GCP or Azure is now based on Kyma CLI. Check it out in [this](https://github.com/kyma-project/kyma/blob/master/docs/kyma/04-04-cluster-installation.md#prepare-the-cluster) document under the **Gardener** tab.

## Monitoring

### Full revamp of the monitoring component

As the official Prometheus Operator has changed a lot structure-wise in recently, we finally took the chance to update to the latest version. Along with the update, the following points were addressed:

- All customized elements of the original chart are clearly marked for an easier update
- All ServiceMonitor and PrometheusRule custom resources are distributed among the monitoring components having a consistent naming convention
- The latest standard Grafana dashboards are available
- All custom Grafana dashboards are now deployed by dedicated ConfigMaps and moved to the Kyma components they belong to, being installed along with a particular component
- The Prometheus operator component got removed and was merged into the monitoring component
- The followimng default settings have adjusted values:
  - memory limit - `4GB`,
  - data retention time - `2d`,
  - data retention size - `7GB`.
  
  Still, these settings can be changed during installation.

## Service Management  

### ApplicationBroker doesn't delete the ServiceBroker custom resource (CR) if the user still has ServiceInstances created using this broker  

If the ServiceBroker CR is deleted before the removal of the corresponding ServiceInstance, the ServiceInstance can not be deprovisioned from the Service Catalog. Since this release, the Application Broker does not remove the ServiceBroker CR if there are any ServiceInstances created using this broker. Only once no related ServiceInstances are remaining, the Application Broker removes the ServiceBroker CR and deactivates the Application.

## Known issues

### Backup & Rafter

Due to some issues with Velero, right after recovering Kyma from backup you need to follow some additional manual steps related to [Rafter](https://github.com/kyma-project/kyma/blob/release-1.9/docs/rafter/01-01-rafter.md):

1. Remove the cluster-wide default bucket:

   ```bash
   kubectl delete clusterbuckets.rafter.kyma-project.io --selector='rafter.kyma-project.io/access=public
   ```

2. Remove buckets from the namespaces where you use them:

   ```bash
   kubectl delete buckets.rafter.kyma-project.io --selector='rafter.kyma-project.io/access=public' --namespace=default
   ```

### Logging

The Promtail Pod gets stuck in the CrashLoopBackoff phase. The reason is that the content of the `positions.yaml` file used by Promtail gets corrupted on the last line. You can see the following error message: `caller=main.go:56 msg="error creating promtail" error="yaml: line 107: could not find expected ':'`. A temporary workaround for the issue is as follows:

1. Create a simple Pod which runs on the same Node as the problematic Promtail Pod and mounts the `/run/promtail` folder on hostPath.
2. Exec into the Pod and delete the last line of the `/run/promtail/positions.yaml` file.
3. Delete the crashing Pod.

## Migrations and upgrades

As mentioned in the [Asset Store aka Rafter](#asset-store-aka-rafter) section, the Asset Store and Headless CMS components are replaced with a new one - Rafter. The most visible change is that DocsTopic and ClusterDocsTopic [CRs](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) are removed and replaced with AssetGroup and ClusterAssetGroup [CRs](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/). When migrating from Kyma 1.8.0 to 1.9.0 we automatically:

- Duplicate all the files from system buckets (used by the Upload Service) in a new MinIO instance to assure the recovery of assets created by the Application Registry,
- Duplicate all old resources in the new component, under the new name and apiGroups,
- Remove the Asset Store and Headless CMS components after successful migration.

To guarantee the necessary data duplication and fulfill the need to run all components during the upgrade, make sure your cluster has enough resources. The migration scripts are available [here](https://github.com/kyma-project/kyma/tree/release-1.9/resources/rafter/templates).

>**NOTE:** Old CustomResourceDefinitions (CRDs) are not removed automatically during the upgrade process. Leaving the CRDs does not influence the uprgrade. However, you can remove them using this script:
>```bash
>kubectl delete crd clusterdocstopics.cms.kyma-project.io && kubectl delete crd docstopics.cms.kyma-project.io && kubectl delete crd clusterbuckets.assetstore.kyma-project.io && kubectl delete crd buckets.assetstore.kyma-project.io && kubectl delete crd clusterassets.assetstore.kyma-project.io && kubectl delete crd assets.assetstore.kyma-project.io
>```
