```
---
title: "Kyma 2.0"
author:
  name: "{Name and surname}, Technical Writers @Kyma"
tags:
  - release-notes
type: release
releaseTag: "2.0"
redirectFrom:
  - "/blog/release-notes-20"
---
```

> Write an introductory paragraph and present the most important release highlights from all components. List the highlights as bullet points and provide relative links to their corresponding sections.

<!-- overview -->

> Add a **CAUTION** at the beginning of the release notes whenever there are any important migration and/or update steps required for users to perform before migrating to the new Kyma version. Link to a separate migration guide under `kyma/docs/migration-guides` in which you provide these steps, describe the changes and reasons behind them, and list potential benefits for the users.  

See the overview of all changes in this release:

- [Application Connectivity](#application-connectivity) - New way to reach registered services, Application Connector improvements
- [CLI](#cli) - From Minikube to K3d, Revamped way of installation, Deploy values instead of configuration overrides, Kyma installation now entirely client-side, Obsolete command: `kyma test`  /  New way to test Kyma
- [Observability](#observability) - Authentication for Grafana, Kiali, and Jaeger UIs, Improved security for logs in Kyma Dashboard, Prometheus mTLS, Observability services updated
- [Security](#security) - Leveraging basic kubernetes authentication, ORY oathkeeper will no longer use dex
- [Service Management](#service-management) - Service Catalog deprecation
- [Website](#website) - New landing page, new documentation structure, removed roadmap


- [Known issues](#known-issues) - {List of all known issues}
- [Fixed security vulnerabilities](#fixed-security-vulnerabilities) - {List of all fixed security vulnerabilities}


## Application Connectivity

### New way to reach registered services!

Kyma 2.0 brings some fresh air to the Application Connector area as well. There is now a possibility to call an external registered service without the need of creating ServiceInstances and binding them to the workload. Central Application Gateway is a new component responsible for this part. Read about how to do that [here](https://github.com/kyma-project/kyma/tree/main/components/central-application-gateway).

In the future, this will be the default way of creating Application-related flows as Service Catalog will be removed and the option to create ServiceInstances and bindings will go away. While we will support already existing flows for some time, we highly recommend that the users try out the new, simplified approach now.

### Application Connector improvements

We are reducing the complexity and resource usage of the whole Application Connector area. For this reason, two new components were introduced:
	• Central Application Gateway
	• Central Connectivity Application Validator

The changes allow us to drop per-application deployments (Gateways and Validators). We are also looking at detaching Application Connector from Service Catalog and Rafter as well.

With these changes, some of the components, such as Application Operator, will become obsolete. We will be removing them in the following releases. This, however, will have no effect on the existing functionality.


## CLI

### From Minikube to K3d

Switching the local Kubernetes tool from minikube to k3d allows a faster and more lightweight installation. The steps needed to set up a local or remote cluster are now consistent.

### Revamped way of installation

We simplified the way to install Kyma and changed the following commands:
	• The `deploy` command replaces the `install` and `upgrade` commands.
	• The `undeploy` command replaces the `uninstall` command.

### Deploy values instead of configuration overrides

Instead of the deprecated `--override` flag, use the `deploy` command to change the Kyma settings: With the `--values-file` flag, you can provide a plain yaml file. Alternatively, you can provide values inline with the `--value` flag. Learn more in Change Kyma Settings.

### Kyma installation now entirely client-side
TBD

### Obsolete command: `kyma test`  /  New way to test Kyma
TBD


## Observability

### Authentication for Grafana, Kiali, and Jaeger UIs

The deprecation of dex allows a simpler and more consistent authentication concept for the observability user interfaces. Grafana, Kiali, and Jaeger UIs are no longer exposed by default. Instead, you have the flexibility to set up your preferred OIDC provider for each service. Learn how to expose the services securely.

As a result, all users are logged on anonymously and see the same UI. If you prefer a user-specific configuration for Grafana UI, use the Grafana login solution and switch off the OAuth proxy.

### Improved security for logs in Kyma Dashboard

The logs displayed in Kyma Dashboard are now based on the Kubernetes API server. This way, Loki is no longer exposed to the external network, reducing an attack vector.

### Prometheus mTLS

By enabling Prometheus mTLs, you can improve the security in your Service Mesh: You can keep the strict mTLS mode for custom metrics. You don't have to weaken the authentication policy when you're scraping workloads  deployed in the Service Mesh. Learn more in Enable mTLS for custom metrics.

### Observability services updated

	• FluentBit has been bumped up to the latest version 1.8.
	• Loki and Grafana are using the latest version with Apache 2 license: Loki 2.2. and Grafana 7.5.
	• Prometheus Node Exporter uses ???


## Security

### Leveraging basic kubernetes authentication

With 2.0, we untangled authentication concepts in Kyma. We removed the complexity of having a built-in authentication component (dex) and proxies to the Kubernetes API server ("apiserver-proxy" and "console-backend-service"). We decided to just use plain kubernetes authentication and authorization options:
	• [OpenID Connect tokens](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#openid-connect-tokens])
	• Role Based Access Control ([RBAC](https://kubernetes.io/docs/reference/access-authn-authz/rbac/))
With such change, we were able to remove many service accounts with high privileges and several other attack vectors that could lead to unauthorized access to your cluster resources (like static users in dex configuration - admin@kyma.cx or kubeconfig pointing apiserver-proxy with the token valid for several hours).
The full list of removed autn/authz components:
	• apiserver-proxy
	• console-backend
	• dex
	• iam-kubeconfig-service
	• permission-controller
	• uaa-activator
As the list is quite big it doesn't affect most of the production use cases. The components were used mainly for exposing Kyma UI in the development/standalone mode (static users). For such use cases we have provided refactored, better, and faster Kyma Dashboard described in another section.

### ORY oathkeeper will no longer use dex

Within Kyma 2.0, dex will be deprecated. Therefore ORY oathkeeper will no longer use dex to verify jwt tokens.  Existing APIRules which do have an access strategy "jwt" defined need to be enriched with an individual jwks_url pointing to your custom OpenID Connect-compliant identity provider.


## Service Management

### Service Catalog deprecation

As we deprecated Service Catalog, in Kyma 2.0 we recommend using service operators for Service Management. These are the examples of service operators provided by hyperscale cloud providers that you can use:
- [GCP](https://cloud.google.com/config-connector/docs/how-to/getting-started)
- [Azure](https://github.com/Azure/azure-service-operator)
- [AWS](https://github.com/aws-controllers-k8s/community)

Note that with the Service Catalog removal, it will no longer be possible to manage the existing hyperscalers' instances using Kyma, and the migration for these instances will not be provided. You will only be able to manage them from the hyperscalers' side. All the existing Secrets with credentials to services will stay in the cluster and will be still injected to you deployments and Functions.

Service Catalog removal will also affect Application Connectivity in the Kyma Environment. Service Catalog objects will not be used anymore, and both ServiceInstances and ServiceBindings will not be required.


## Website

### New landing page
TBD

### New documentation structure
TBD

### Removed roadmap
TBD

## Known issues


## Fixed security vulnerabilities

> Describe any solved security vulnerability issues related to the Kyma project. Provide a short issue description, its calculated risk assessment, and a link to the pull request that solves the issue. You can also include a GitHub link to the issue itself. The calculated risk assessment is provided in each issue of the [Security Vulnerability](https://github.com/kyma-project/kyma/issues/new?template=security-vulnerability.md) type created on Github.

### {Area name}

> Describe related security fixes here.