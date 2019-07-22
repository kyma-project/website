# Component folder consolidation

## Introduction
The [`components`](https://github.com/kyma-project/kyma/tree/master/components) folder of the `kyma-project` contains all Kyma components which are not related to the Kyma Console. A Kyma component is a project based on source code or scripts, always resulting in docker images which are then referenced in Kyma modules/charts.
Each subfolder in the `components` directory defines one component.

## Problem

Each component subfolder uses a different naming convention. For example `ui-api-layer` or `metadata-service`.

As a result:
- It's difficult to decide which naming convention to follow when creating a new component. What is the difference between a layer and a service?
- It's not always possible to derive the related Kyma module or domain. For example, you don't know which domain or module the `configurations-generator` relates to.
- It's not always possible to derive the nature or kind of component. For example, you don't know if `environments` serves an API or needs access to the K8S API Server.

## Goal

Propose a well-defined terminology for components and introduce a naming pattern based on that.

## Considerations

After evaluating all the components in the Kyma repository, it turns out that they are either exposing an API, dealing with the Kubernetes API Server, or just proxying/aggregating a component as in **ui-api-layer** and **api-server-proxy**.
Grouping the components into the `API` and `K8S` categories sounds meaningful as it already implies the following technical aspects:
- Access to API Server required (Service Account, Role Binding, ..)
- Port exposure required (Istio routing)
- Publicly accessible or secured (authentication/authorization)
- Runtime workload or management workload only (auto-scaling)
- ...

Naming standard Business API specific components `service`  sounds feasible, as they serve an API and usually require to prefix the API with the domain it is bound to, such as **application-connector-service**. Here, the **api-ui-layer** should be counted in as well, as its main intention is to expose a public business API requiring a security model (even if it is accessing the API Server). Besides that, there is a special category of API which is implementing the **OpenServiceBrokerAPI**. As we have multiple of them, the suggested name is `broker`.

The Kubernetes API specific components usually follows one of the well-known Kubernetes patterns like `controller` and `operator`. Currently, one component which is a `job` does not match any pattern. The components proxying other components do not fit well into any of the categories, but for now, they are proxying only K8S specific components, so we could categorize them the same way and create a new `proxy` sub-category.

## Proposal

### Categories and Naming Pattern

The proposed naming pattern for the component folders are defined per sub-category and contain the sub-category name as a suffix. The main category is not included as it is implied.

Kubernetes API-specific categories:
- `controller` is a [Kubernetes Controller](https://kubernetes.io/docs/concepts/extend-kubernetes/extend-cluster/). It uses the name of the primary Kubernetes resource which it controls. For example, **api-controller**.
- `operator` is a [Kubernetes Operator](https://coreos.com/operators/). It uses the name of the module it operates. For example, **application-operator**.
- `job` is a [Kubernetes Job](https://kubernetes.io/docs/tasks/job/), performing a task once or periodically. It uses the name of the task it performs. For example, **istio-patch-job**.
- `proxy`  proxies an existing component, usually introducing a security model for the proxied component. It uses the component name. For example, **api-server-proxy**.

Business API-specific categories:
- `service` serves an HTTP/S-based API, usually exposed securely to the public. It uses the domain name and the API it serves. For example, **application-connector-service**.
- `broker` is implementing the OpenServiceBroker API. It uses the name of the provider it integrates with. For example, **azure-broker**.

### Action Items

- A `README.md` file in the `components` folder to explain the naming convention for components
- Link the `README.md` file in the developer guide
- Keep all folders in the root components folder but rename them according to the patterns in the table:

|type| old folder | new folder | action required |
|------------|------------|-----------------|----|
|**-broker**|application-broker|application-broker| - |
| |helm-broker`*`|helm-broker| - |
|**-controller**|api-controller|api-controller| - |
| |binding-usage-controller|service-binding-usage-controller| yes |
| |connection-token-handler|request-token-controller| yes|
| |namespace-controller|namespace-controller|no|
| |idppreset|idppreset-controller|yes|
| |event-bus`**`/event-bus-sv|event-activation-controller|yes|
| |event-bus`**`/event-bus-push|subscription-controller|yes|
|**-operator**|application-operator|application-operator| - |
| |installer|kyma-operator| yes|
|**-service**|configurations-generator|iam-kubeconfig-service|yes|
| |connector-service|application-connector-service|yes|
| |application-registry| application-registration-service|yes|
| |event-service|application-event-service| yes|
| |application-proxy|application-proxy-service|yes|
| |event-bus`**`/event-bus-publish|event-publish-service|yes|
| |ui-api-layer|console-backend-service|yes|
|**-proxy**|apiserver-proxy|apiserver-proxy| - |
| |k8s-dashboard-proxy|k8s-dashboard-proxy| - |
|**-job**|istio-kyma-patch|istio-patch-job|yes|

`*` should be split into the helm-broker and tooling for bundle repositories outside the `Kyma`repo

`**` should be split into the different components, the common parts not specific to eventing should be moved to the Kyma common parts to avoid duplication

## Addition

Going the extra mile we should also have a look at the `tools` folder. Currently, the term **tool** is not specified. To define it, let's define a module and a component first:

- **module** A Kyma module is a helm chart installed by the installer. It is located in the `kyma/resources` folder. A module can be optional for a Kyma installation. For example,  `service-catalog` is a module consisting mainly of 3rd party images but also leveraging some Kyma components, such as the `binding-usage-controller`.
- **component** A Kyma component is any Pod/container/image deployed with a Kyma module to provide its functionality. A component is made of sources located in the `kyma/components` folder.

An image which adds functionality to Kyma,  but does not prevent it from working properly with it's absent, is a **tool**. For example, the watch-pods container which is used for testing/monitoring. Without it, Kyma works as well. 

Having that definition in mind, there are tools listed in the `tools` folder which can be treated as components and should be moved:

|type| old folder | new folder | action required | description |
|----|------------|------------|-----------------|-------------|
|**-job**|tools/etcd-backup|components/etcd-backup-job|yes| used in Service Catalog only as a cronjob |
| |tools/etcd-tls-setup|components/etcd-tls-setup-job|yes| used in Service Catalog as a job, misused in ark module (should be removed) and mentioned in helm-broker (should be removed) |
|**-configurer**|tools/alpine-net|components/alpine-net-configurer|yes| base image having net-utils installed, used only as init container for dependency checks|
| |tools/ark-plugins|components/ark-plugins-configurer|yes| init-container for configuring ark|
| |tools/static-users-generator|components/dex-static-user-configurer|yes| init-container for configuring dex with generated user credentials|

Furthermore, the following tools, used in the release process or test infrastructure, should be moved into the `test-infra` repository:

|old folder | new folder | action required | description |
|-----------|------------|-----------------|-------------|
|kyma:tools/changelog-generator|test-infra:changelog-generator|yes| used in release process only|
|kyma:tools/watch-pods|test-infra:watch-pods|yes| used for integration test execution |
|kyma:tools/stability-checker|test-infra:stability-checker|yes| used for continuous functional testing against a running cluster|

The following 3 tools left for now should be moved somewhere else having the goal in mind to have no general purpose tools folder at all, proposals are welcome:

|old folder | new folder | action required | description |
|-----------|------------|-----------------|-------------|
|kyma:tools/docsbuilder|-|-|used to create docker images containing the documentation. It is a temporary solution and will be removed soon|
|kyma:gcp-broker-provider|?|?| script for provisioning a gcp broker into a Namespace, main usage is as helm broker bundle, so maybe have it in the `bundles` repository?|
|kyma:kyma-installer|?|?|the ultimate installer, should be released together with Kyma modules/charts always, maybe should be closer to the current `resources` folder?
