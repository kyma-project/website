```
---
title: "Kyma 2.0"
author:
  name: "Technical Writers @Kyma"
tags:
  - release-notes
type: release
releaseTag: "2.0"
redirectFrom:
  - "/blog/release-notes-20"
---
```

We are happy to announce the release of the long-awaited Kyma 2.0! This major release brings a lot of simplification and improvements to the product.

<!-- overview -->

> Add a **CAUTION** at the beginning of the release notes whenever there are any important migration and/or update steps required for users to perform before migrating to the new Kyma version. Link to a separate migration guide under `kyma/docs/migration-guides` in which you provide these steps, describe the changes and reasons behind them, and list potential benefits for the users.  

See the overview of all changes in this release:

- [API Exposure](#api-exposure) - Exposing workloads on custom domains
- [Application Connectivity](#application-connectivity) - New way to reach registered services, Application Connectivity improvements
- [CLI](#cli) - Switching from Minikube to k3d, revamped way of installation, values instead of configuration overrides, the `kyma test` command deprecated, the `kyma dashboard` command instead of `kyma console`
- [Kyma Dashboard](#kyma-dashboard) - Kyma Console replaced with new technology, Kyma Dashboard new features, new list views, easier resource creation
- [Observability](#observability) - Authentication for Grafana, Kiali, and Jaeger UIs, improved security for logs in Kyma Dashboard, containerd support, Prometheus mTLS, Observability services updated
- [Security](#security) - Native Kubernetes authentication in Kyma, ORY Oathkeeper without Dex, ORY components update
- [Serverless](#serverless) - Python 3.8 deprecation
- [Service Management](#service-management) - Service Catalog deprecation
- [Website](#website) - New landing page, new documentation structure, removed roadmap

- [Known issues](#known-issues) - {List of all known issues}
- [Fixed security vulnerabilities](#fixed-security-vulnerabilities) - {List of all fixed security vulnerabilities}

## API Exposure

### Exposing workloads on custom domains

Kyma 2.0 allows you to expose Istio workloads using custom, user-managed domains. In the previous Kyma versions, the only supported scenario was to use the main Kyma domain for API exposure. Now, provided you own a domain, you can expose any Kyma-hosted workload using this domain. In addition, a TLS certificate may be automatically generated for you. You can have multiple workloads using multiple custom domains. See the [Use a custom domain to expose a service](https://kyma-project.io/docs/kyma/latest/03-tutorials/00-api-exposure/apix-01-own-domain/) tutorial for details.


## Application Connectivity

### New way to reach registered services

Kyma 2.0 brings some fresh air to the Application Connectivity area. There is now a possibility to call an external registered service without the need of creating ServiceInstances and binding them to the workload. [Central Application Gateway](https://github.com/kyma-project/kyma/tree/main/components/central-application-gateway) is a new component responsible for this part.

In the future, this will be the default way of creating Application-related flows, as [Service Catalog will be removed](#service-management) and the option to create ServiceInstances and bindings will go away. While we will support the already existing flows for some time, we highly recommend you try out the new, simplified approach now.

### Application Connectivity improvements

We are reducing the complexity and resource usage of the whole Application Connectivity area. For this reason, two new components were introduced:
- Central Application Gateway
- Central Connectivity Application Validator

The changes allow us to drop per-application deployments (Gateways and Validators). We are also looking at detaching Application Connector from Service Catalog and Rafter as well.

With these changes, some of the components, such as Application Operator, will become obsolete. We will be removing them in the following releases. This, however, will have no effect on the existing functionality.


## CLI

### Switching from Minikube to k3d

With Kyma 2.0, we're switching the local Kubernetes tool from Minikube to k3d, which allows a faster and more lightweight installation. The steps needed to set up a local and a remote cluster are now the same.

### Revamped way of installation

We fundamentally improved and simplified the way to install Kyma, phasing out the Kyma Installer component. With this change, Kyma is up to date with the current Kubernetes security, authorization, and identity standards. Cluster admins can restrict user permissions as desired; the permissions are evaluated based on the kubeconfig. There is no god-mode Service Account within the cluster anymore, and the Kyma installation is now entirely client-side.

The commands for installation have been updated as well:
- The `deploy` command replaces the `install` and `upgrade` commands.
- The `undeploy` command replaces the `uninstall` command.

### Values instead of configuration overrides

Instead of the deprecated `--override` flag, use the `deploy` command to change Kyma settings. With the `--values-file` flag, you can change Kyma settings by providing a plain YAML file. Alternatively, you can provide values inline with the `--value` flag. Learn more in [Change Kyma Settings](https://kyma-project.io/docs/kyma/latest/04-operation-guides/operations/03-change-kyma-config-values/).

### The `kyma test` command deprecated

The test framework changed and now, testing happens entirely client-side. The `kyma test` command is deprecated.  	

### The `kyma dashboard` command instead of `kyma console`

To open the graphical user interface for Kyma, use the `kyma dashboard` command. The `kyma console` command is now deprecated.


## Kyma Dashboard

### Kyma Console replaced with new technology

Kyma 2.0 brings you the new user interface. Kyma Dashboard, based on the [Busola project](https://github.com/kyma-project/busola), replaces the old Kyma Console.

Kyma Dashboard is decoupled from the Kyma cluster. It's not part of the initial Kyma installation, but you can add it to the cluster manually, or run it on your local machine using Kyma CLI.

Moreover, we removed the Console Backend Service and now we connect directly with the Kubernetes API.

### Kyma Dashboard new features

Kyma Dashboard provides you with many new, useful features:

- You can work with multiple clusters, switch between them, and add external clusters.
- The new deep linking functionality allows you to easily jump between your apps and the resources involved.
- For a better accessibility, you can choose between the light and dark mode, and high contrast themes.

### New resources view

You can now view all Kyma and most of the Kubernetes resources in the Kyma Dashboard:
- Service Accounts
- Cluster Nodes
- Jobs
- Cron Jobs
- Stateful Sets
- Damon Sets
- Gateways
- Issuers
- Certificates
- DNS Providers
- DNS Entries

### Easier creation of resources

We introduced new create resource views for:
- Roles
- RolesBindings
- Service Accounts
- Deployment
- CronJobs
- Jobs
- ConfigMaps
- Secrets
- Issuers
- Certificates
- DNS Providers
- DNS Entries
- ReplicaSets


## Observability

### Authentication for Grafana, Kiali, and Jaeger UIs

The deprecation of Dex allows a simpler and more consistent authentication for the Observability user interfaces. Grafana, Kiali, and Jaeger UIs are no longer exposed by default. Instead, you have the flexibility to set up your preferred OIDC provider for each service. Learn how to [expose a services securely](https://kyma-project.io/docs/kyma/latest/04-operation-guides/security/sec-06-access-expose-kiali-grafana).

As a result, all users are logged on anonymously and see the same UI. If you prefer a user-specific configuration for Grafana UI, use the Grafana login solution and switch off the OAuth proxy.

### Improved security for logs in Kyma Dashboard

Logs displayed in Kyma Dashboard are now based on the Kubernetes API server. This way, Loki is no longer exposed to the external network, which reduces an attack vector.

### Containerd support

With the update of Fluent Bit to version 1.8, we activated the new multiline support feature and configured support for Docker and containerd.

### Prometheus mTLS

By enabling Prometheus mTLs, you can improve the security in your Service Mesh and keep the strict mTLS mode for custom metrics. You don't have to weaken the authentication policy when you're scraping workloads deployed in the Service Mesh. Learn more in [Enable mTLS for custom metrics](https://kyma-project.io/docs/kyma/latest/01-overview/main-areas/observability/obsv-03-istio-monitoring#enable-m-tls-for-custom-metrics).

### Observability services updated

Moreover, these Observability services have been updated:

- FluentBit has been bumped up to the latest version 1.8.
- Loki and Grafana use the latest version with Apache 2 license: Loki 2.2. and Grafana 7.5.
- Prometheus Node Exporter uses version 1.1.


## Security

### Native Kubernetes authentication in Kyma

With 2.0, we untangled authentication concepts in Kyma. We removed the complexity of having a built-in authentication component - Dex, and proxies to the Kubernetes API server - API Server Proxy and Console Backend Service. We decided to use plain Kubernetes authentication and authorization options:
- [OpenID Connect tokens](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#openid-connect-tokens)
- [Role Based Access Control (RBAC)](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)

With such a change, we were able to remove many service accounts with high privileges and several other attack vectors that could lead to unauthorized access to your cluster resources. For example, static users in Dex configuration - `admin@kyma.cx` or kubeconfig pointing to `apiserver-proxy` with a token valid for several hours.

See the full list of removed authentication and authorization components:

- API Server Proxy
- Console Backend Service
- Dex
- IAM Kubeconfig Service
- Permission Controller
- UAA Activator

The list is quite big but it doesn't affect most of the production use cases. The components were used mainly for exposing Kyma UI in the development/standalone mode (static users). For such use cases, we have provided refactored, better, and faster [Kyma Dashboard](#kyma-dashboard).

### ORY Oathkeeper without Dex

With Kyma 2.0, the Dex component becomes deprecated. Therefore, ORY Oathkeeper will no longer use Dex to verify JWT tokens. Existing API Rules that have a JWT access strategy defined must be enriched with an individual **jwks_url** pointing to a custom OpenID Connect-compliant identity provider.

### ORY components update

As of the Kyma 2.0 release, we upgraded the following ORY components:

- ORY Oathkeeper from 0.38.11 to 0.38.15
- ORY Hydra from 1.8.5 to 1.10.7
- ORY Hydra Maester from 0.0.21 to 0.0.24
- ORY Oathkeeper Maester from 0.1.4 to 0.1.5

See the official list of changes for [ORY Oathkeeper](https://github.com/ory/oathkeeper/releases/tag/v0.38.15-beta.1), [ORY Hydra](https://github.com/ory/hydra/releases/tag/v1.10.7), [ORY Hydra Maester](https://github.com/ory/hydra-maester/releases/tag/v0.0.24), [ORY Oathkeeper Maester](https://github.com/ory/oathkeeper-maester/releases/tag/v0.1.5).


## Serverless

### Python 3.8 deprecation

In this release, we deprecate Python 3.8 and in the upcoming releases we will remove it from the list of supported runtimes. Kyma already has Python 3.9 available in Serverless and we recommend that you configure all your Python 3.8 Functions to run on the Python 3.9 runtime.


## Service Management

### Service Catalog deprecation

As we deprecated Service Catalog, in Kyma 2.0 we recommend using service operators for Service Management. These are the examples of service operators provided by hyperscale cloud providers that you can use:
- [GCP](https://cloud.google.com/config-connector/docs/how-to/getting-started)
- [Azure](https://github.com/Azure/azure-service-operator)
- [AWS](https://github.com/aws-controllers-k8s/community)

Note that with the Service Catalog removal, it will no longer be possible to manage the existing hyperscalers' instances using Kyma, and the migration for these instances will not be provided. You will only be able to manage them from the hyperscalers' side. All the existing Secrets with credentials to services will stay in the cluster and will be still injected to you deployments and Functions.

Service Catalog removal will also affect [Application Connectivity](#application-connectivity) in Kyma. Service Catalog objects will not be used anymore, and both ServiceInstances and ServiceBindings will not be required.


## Website

### New landing page

[Kyma website](https://kyma-project.io/) now has a brand new landing page. The new content explains at first glance what Kyma is, what its main features are, and what problems it solves.

### New documentation structure

We have restructured [Kyma documentation](https://kyma-project.io/docs/kyma/latest/) quite significantly in the 2.0 release. We no longer divide the left navigation based on Kyma components. Instead, we structured the navigation based on the tasks you would normally face when using Kyma. We split rather long documents into shorter, more digestible chunks. On top of that, the collapsible tabs on the left-side navigation group the content into categories that help you find answers to your questions quicker.

### Removed roadmap

We removed the **Roadmap** section from the Kyma website. Refer to [Kyma GitHub issues](https://github.com/kyma-project/kyma/issues) to find the details about planned features.

## Known issues


## Fixed security vulnerabilities

> Describe any solved security vulnerability issues related to the Kyma project. Provide a short issue description, its calculated risk assessment, and a link to the pull request that solves the issue. You can also include a GitHub link to the issue itself. The calculated risk assessment is provided in each issue of the [Security Vulnerability](https://github.com/kyma-project/kyma/issues/new?template=security-vulnerability.md) type created on Github.

### {Area name}

> Describe related security fixes here.
