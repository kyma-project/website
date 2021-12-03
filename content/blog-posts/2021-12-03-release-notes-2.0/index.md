---
title: "Kyma 2.0"
author:
  name: "Klaudia Grzondziel and Nina Hingerl, Technical Writers @Kyma"
tags:
  - release-notes
type: release
releaseTag: "2.0"
redirectFrom:
  - "/blog/release-notes-20"
---

We are happy to announce the release of Kyma 2.0! This major release brings a lot of fresh air to the project: we simplified and improved many areas, and also provided some brand new features, such as Kyma Dashboard. Read on to find out what Kyma 2.0 has to offer!

<!-- overview -->

> **CAUTION:** In this release, authentication and authorization methods in Kyma have changed. Before upgrading to Kyma 2.0, read the [Migration Guide](https://kyma-project.io/docs/kyma/latest/migration-guide-1.25-2.0).

See the overview of all changes in this release:

- [API Exposure](#api-exposure) - Exposing workloads on custom domains
- [Application Connectivity](#application-connectivity) - New way to reach registered services, Application Connectivity improvements
- [CLI](#cli) - Switch from Minikube to k3d, revamped way of installation, values instead of configuration overrides, `kyma test` command deprecated, `kyma console` command replaced  with `kyma dashboard`
- [Eventing](#eventing) - NATS Operator replaced with NATS Helm chart
- [Kyma Dashboard](#kyma-dashboard) - Kyma Console replaced with new technology, Kyma Dashboard features, new resources views, easier resource creation
- [Observability](#observability) - Authentication for Grafana, Kiali, and Jaeger UIs, improved security for logs in Kyma Dashboard, containerd support, Prometheus mTLS, Observability services updated
- [Security](#security) - Native Kubernetes authentication in Kyma, Ory Oathkeeper without Dex
- [Serverless](#serverless) - Support for Python 3.8 deprecated
- [Service Management](#service-management) - Service Catalog deprecation update
- [Website](#website) - New landing page, new documentation structure, roadmap removed

- [Known issues](#known-issues) - {List of all known issues}
- [Fixed security vulnerabilities](#fixed-security-vulnerabilities) - {List of all fixed security vulnerabilities}

## API Exposure

### Exposing workloads on custom domains

Kyma 2.0 allows you to expose Istio workloads using custom, user-managed domains. In previous Kyma versions, the only supported scenario was to use the main Kyma domain for API exposure. Now, provided you own a domain, you can expose any Kyma-hosted workload using your domain. In addition, a TLS certificate can be automatically generated for you. You can have multiple workloads using multiple custom domains. Read how to [use a custom domain to expose a service](https://kyma-project.io/docs/kyma/latest/03-tutorials/00-api-exposure/apix-01-own-domain/) for details.

## Application Connectivity

### New way to reach registered services

Kyma 2.0 brings some fresh air to the Application Connectivity area. There is now a possibility to call an external registered service without creating ServiceInstances and binding them to the workload. [Central Application Gateway](https://github.com/kyma-project/kyma/tree/main/components/central-application-gateway) is a new component responsible for this part.

In the future, this will be the default way of creating Application-related flows, as [Service Catalog will be removed](#service-management) and the option to create ServiceInstances and bindings will go away. While we will support the existing flows for some time, we highly recommend you try out the new, simplified approach now.

### Application Connectivity improvements

We are reducing the complexity and resource usage of the whole Application Connectivity area. For this reason, two new components were introduced:
- Central Application Gateway
- Central Application Connectivity Validator

The changes allow us to drop per-application deployments (Gateways and Validators). We are also looking at detaching Application Connector from Service Catalog and Rafter.

With these changes, some of the components, such as Application Operator, will become obsolete. We will remove them in the following releases. This, however, will have no effect on the existing functionality.


## CLI

### Switch from Minikube to k3d

With Kyma 2.0, we switched the local Kubernetes tool from Minikube to k3d, which allows for a faster and more lightweight installation. The steps needed to set up a local and remote cluster are now the same.

### Revamped way of installation

We fundamentally improved and simplified the way to install Kyma, phasing out the Kyma Installer component. With this change, Kyma is up to date with the current Kubernetes security, authorization, and identity standards. Cluster admins can restrict user permissions as desired; the permissions are evaluated based on the kubeconfig. There is no god-mode Service Account within the cluster anymore, and the Kyma installation is now entirely client-side.

The commands for installation have been updated as well:
- The `deploy` command replaces the `install` and `upgrade` commands.
- The `undeploy` command replaces the `uninstall` command.

### Values instead of configuration overrides

Instead of the deprecated `--override` flag, we now use the `deploy` command to change Kyma settings. With the `--values-file` flag, you can change Kyma settings by providing a plain YAML file. Alternatively, you can provide values inline with the `--value` flag. Learn more in [Change Kyma Settings](https://kyma-project.io/docs/kyma/latest/04-operation-guides/operations/03-change-kyma-config-values/).

### The `kyma test` command deprecated

With Kyma 2.0, the test framework changed and now testing happens entirely client-side. As of this release, the `kyma test` command is deprecated.  	

### The `kyma console` command replaced  with `kyma dashboard`

Starting from this release, to open the graphical user interface for Kyma, use the `kyma dashboard` command. The `kyma console` command is now deprecated.


## Eventing

### NATS Operator replaced with NATS Helm chart

In Kyma 2.0, we removed the [NATS Operator](https://github.com/kyma-project/kyma/tree/release-1.24/components/nats-operator) and its CRDs from Eventing. Instead, we now use the [NATS Helm chart](https://github.com/nats-io/k8s/tree/main/helm/charts/nats). This has no impact on the user, since all configurations have been mapped to the new NATS Helm chart.


## Kyma Dashboard

### Kyma Console replaced with new technology

Kyma 2.0 brings you a new user interface. Kyma Dashboard, based on the [Busola project](https://github.com/kyma-project/busola), replaces the old Kyma Console.

Kyma Dashboard is decoupled from the Kyma cluster. It is not part of the initial Kyma installation, but you can add it to the cluster manually, or run it on your local machine using Kyma CLI.

Moreover, we removed the Console Backend Service and now we connect with the Kubernetes API directly.

### Kyma Dashboard features

Kyma Dashboard provides many new features:

- You can work with multiple clusters, switch between them, and add external clusters.
- The new deep linking functionality allows you to easily jump between your apps and the related resources.
- For better accessibility, you can choose from the light, dark, and high contrast themes.

### New resources views

You can now view all Kyma and most Kubernetes resources in the left navigation panel of Kyma Dashboard. These are the new resources views:

- **Service Accounts**
- **Cluster Overview** > **Nodes**
- **Jobs**
- **Cron Jobs**
- **Stateful Sets**
- **Daemon Sets**
- **Gateways**
- **Issuers**
- **Certificates**
- **DNS Providers**
- **DNS Entries**

### Easier resource creation

Kyma Dashboard also allows you to easily create new resources:

- Roles
- Role Bindings
- Service Accounts
- Deployment
- Cron Jobs
- Jobs
- Config Maps
- Secrets
- Issuers
- Certificates
- DNS Providers
- DNS Entries
- Replica Sets

 You can create these resources directly in the UI by going to the appropriate resource view in the left navigation panel.


## Observability

### Authentication for Grafana, Kiali, and Jaeger UIs

With the deprecation of Dex, authentication for the Observability user interfaces is now much simpler and more consistent. Grafana, Kiali, and Jaeger UIs are no longer exposed by default. Instead, you have the flexibility to set up your preferred OIDC provider for each service.

As a result, all users are logged on anonymously and see the same UI. If you prefer a user-specific configuration for Grafana UI, use the Grafana log-in solution and switch off the OAuth proxy.

Read our documentation to learn how to [expose services securely](https://kyma-project.io/docs/kyma/latest/04-operation-guides/security/sec-06-access-expose-kiali-grafana).

### Improved security for logs in Kyma Dashboard

Logs displayed in Kyma Dashboard are now based on the Kubernetes API server. This way, Loki is no longer exposed to the external network, which reduces the attack vector.

### Containerd support

With the update of Fluent Bit to version 1.8, we activated the new multiline support feature and configured support for Docker and containerd.

### Prometheus mTLS

By enabling Prometheus mTLS, you can improve the security in your Service Mesh and keep the strict mTLS mode for custom metrics. You don't have to weaken the authentication policy when you are scraping workloads deployed in the Service Mesh. Learn more in [Enable mTLS for custom metrics](https://kyma-project.io/docs/kyma/latest/01-overview/main-areas/observability/obsv-03-istio-monitoring#enable-m-tls-for-custom-metrics).

### Observability services updated

With this release, we have also refreshed Observability a bit (no pun intended). Fluent Bit has been upgraded to the latest version 1.8.10, Grafana got a minor upgrade to 7.5.11, Loki has been upgraded to 2.2.1, and OAuth2 Proxy was bumped to version 7.2.0.

For more information, read the release notes for [Fluent Bit](https://fluentbit.io/announcements/v1.8.10/), [Grafana](https://grafana.com/docs/grafana/v7.5/whatsnew/whats-new-in-v7-5/), [Loki](https://github.com/grafana/loki/releases/tag/v2.2.1), and [OAuth2 Proxy](https://github.com/oauth2-proxy/oauth2-proxy/releases/tag/v7.2.0).


## Security

### Native Kubernetes authentication in Kyma

With 2.0, we untangled authentication concepts in Kyma. We removed the complexity of having a built-in authentication component (Dex) and proxies to the Kubernetes API server (API Server Proxy and Console Backend Service). We decided to use plain Kubernetes authentication and authorization options:
- [OpenID Connect tokens](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#openid-connect-tokens)
- [Role Based Access Control (RBAC)](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)

With this change, we were able to remove many service accounts with high privileges, and several other attack vectors that could lead to unauthorized access to your cluster resources - for example, static users in Dex configuration - `admin@kyma.cx` or kubeconfig pointing to `apiserver-proxy` with a token valid for several hours.

See the full list of removed authentication and authorization components:

- API Server Proxy
- Console Backend Service
- Dex
- IAM Kubeconfig Service
- Permission Controller
- UAA Activator

The list is quite long, but it doesn't affect most of the production use cases. The components were used mainly for exposing Kyma UI in the development/standalone mode (static users). For such use cases, we provide the refactored, better and faster [Kyma Dashboard](#kyma-dashboard).

### Ory Oathkeeper without Dex

With Kyma 2.0, the Dex component becomes deprecated. Therefore, Ory Oathkeeper will no longer use Dex to verify JWT tokens. Existing API Rules that have a JWT access strategy defined must be enriched with an individual **jwks_url** parameter pointing to a custom OpenID Connect-compliant identity provider.


## Serverless

### Support for Python 3.8 deprecated

In this release, we deprecate support for Python 3.8, and in the upcoming releases, we will remove it from the list of supported runtimes. Kyma already has Python 3.9 available in Serverless, and we recommend that you configure all your Python 3.8 Functions to run on the Python 3.9 runtime.


## Service Management

### Service Catalog deprecation update

As we announced the [deprecation of Service Catalog](https://kyma-project.io/blog/2021/6/2/release-notes-123/#service-management) in Kyma 1.23 Dhahran, in Kyma 2.0 we recommend using service operators for Service Management. These are the examples of service operators provided by hyperscale cloud providers that you can use:
- [Google Cloud](https://cloud.google.com/config-connector/docs/how-to/getting-started)
- [Azure](https://github.com/Azure/azure-service-operator)
- [AWS](https://github.com/aws-controllers-k8s/community)

Note that with the Service Catalog removal, it will no longer be possible to manage the existing hyperscalers' instances using Kyma, and the migration for these instances will not be provided. You will only be able to manage them on the hyperscaler's side. All the existing Secrets with credentials to services will stay in the cluster and will still be injected to your deployments and Functions.

The Service Catalog removal will also affect [Application Connectivity](#application-connectivity) in Kyma. Service Catalog objects will not be used anymore, and both ServiceInstances and ServiceBindings will not be required.


## Website

### New landing page

The [Kyma website](https://kyma-project.io/) now has a brand new landing page. The new content gives you an overview of what Kyma is, what its main features are, and what problems it solves.

### New documentation structure

We restructured the [Kyma documentation](https://kyma-project.io/docs/kyma/latest/) quite significantly in the 2.0 release. We no longer divide the left navigation based on Kyma components. Instead, it's structured based on the tasks you would normally face when using Kyma. We split rather long documents into shorter, more digestible chunks. On top of that, the collapsible tabs in the left navigation panel group the content into categories that help you find answers to your questions faster.

### Roadmap removed

We removed the **Roadmap** section from the Kyma website. Refer to [Kyma GitHub issues](https://github.com/kyma-project/kyma/issues) to find the details about planned features.


## Known issues

> Describe any known issues that the users can face, together with the way on how to solve these issues.

### {Area name and a brief issue description}

> Describe related known issues here. Add a link to a GitHub issue for tracking purposes, if applicable.
