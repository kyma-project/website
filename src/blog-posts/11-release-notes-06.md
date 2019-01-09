---
path: "/blog/release-notes-06"
date: "{2019-01-14}"
author: "Marco Dorn, Product Manager @Kyma"
tags:
  - release-notes
title: "Cairo release 0.6"
---

<a class="btn-blog" href="https://github.com/kyma-project/kyma/releases/tag/0.6.0" alt="Download 0.6">Download 0.6</a>

The Cairo release 0.6 brings a lot of significant changes to Kyma. The main focus of this release was to finalize the work on Prow and replace the existing CI pipeline with the new architecture. Thus, we are excited to announce that we finally have an open-source CI tool in Kyma and that the Cairo release 0.6 was already built using the Prow architecture. Apart from Prow, we made efforts to drive the Kyma-Knative integration forward, took further steps related to Kyma component modularization and naming unification, and significantly improved the website-related user experience.

Explore the changes, try the release, and get back to us with feedback and contribution!

<!-- overview -->

The most important highlights of the Cairo release 0.6 include:

- [Prow in Kyma](#prow-in-kyma) - The new open-source CI tool in Kyma.
- [Knative installation](#knative-installation) and [Knative eventing integration](#knative-adoption-first-steps) - Install Knative with Kyma and see the current status of the Knative eventing integration.
- [Remote Environment renaming](#remote-environment-renaming) and [Environment Controller renaming](#environment-controller-renaming) - As part of the naming unification scheme, we renamed Remote Environments to Applications and the Environment Controller to the Namespace Controller.
- [Console back end modularization](#back---end-modularization) and [Service Catalog modularization](#modularization) - We modularized the Console back end and the Service Catalog.
- [Google Cloud Platform Service Broker](#google-cloud-platform-service-broker) - The Service Catalog extended with Google offerings.
- [Website navigation improvements](#website) - Improved navigation and reading of docs on `kyma-project.io`.

See an overview of all changes in the Cairo release 0.6:

- [Application Connector](#application-connector) - Environment Controller renaming
- [Console](#console) - Luigi framework on board, new navigation structure, back end modularization, AsyncApi rendering
- [Continuous Integration](#continuous-integration) - Prow in Kyma
- [Eventing](#eventing) - Knative adoption first steps
- [Installation](#installation) - Environment Controller renaming, wildcard DNS `xip.io` integration, Knative installation
- [Serverless](#serverless) - Upgrade to Kubeless v1, function autoscaling
- [Service Catalog](#service-catalog) - Google Cloud Platform Service Broker, modularization, new tooling for Service Catalog UI tests
- [Website](#website) - Linking enabled, `master` branch availability in Docs, blog landing page excerpts, improved styling of Docs, Scrollspy in Docs.

---


## Application Connector

### Remote Environment renaming

As a step towards having a consistent naming scheme for all Kyma components, we renamed Remote Environments to **Applications**. This way, the Application Connector finally connects Applications instead of Remote Environments. This change was introduced consistently across the whole Kyma, including Application Connector components and the Console UI.


## Console

### Luigi framework on board

The Console UI was refactored and it now uses the [Luigi](https://github.com/kyma-project/luigi/blob/master/README.md) framework to orchestrate client-side micro front-ends. With Luigi on board, the Console enables secure and technology-agnostic UI extensibility in Kyma. 

### New navigation structure

The new navigation in the Console provides a more structured content. Immediately after you sign in, you can see all the Namespaces in the main content area. You also have all the cluster-wide information at hand in the left navigation. 

![](./assets/new-navigation-structure.png)

### Back end modularization

As you know, we want Kyma to be highly modular and allow you to plug out any component you don't need during the installation. For example, if you have your own Istio, you should be able to decide if you want to install the one Kyma provides. This requires some refactoring of the Console back end to ensure proper resiliency in the Console UI. In this release, we completed the modularization of the back end and hid it under the feature flag. The reason for such an approach was that we need to introduce further changes in the Console UI in the upcoming release. The implementation was done based on [this](https://github.com/kyma-project/community/issues/165) decision and the referenced proposal.

To quickly switch the Console back end to work in the modular mode, run the following command in the terminal:

```
kubectl set env deployment/core-ui-api MODULE_PLUGGABILITY=true -n kyma-system
```

### AsyncApi rendering  

We created a new component for rendering the [AsyncApi specification](https://www.asyncapi.com/). It now fully supports the specification and improves its look and feel, compared to the very minimalistic table we had before.

![](./assets/asyncapi-rendering.png)

The other great thing we did in this area was creating the component in a very generic way in a separate repository, and donating it to the [AsyncApi organization](https://github.com/asyncapi/asyncapi-react). This means we maintain it directly from the AsyncApi organization and you can use this component not only in the Kyma context.

Feel free to play with it and give us your feedback:

- Read the related [documentation](https://github.com/asyncapi/asyncapi-react#props).

- Test the component [playground](https://www.asyncapi.com/asyncapi-react/).

- Customize the component quickly on the [sandbox project](https://codesandbox.io/s/5vz8l9zlmn).  


## Continuous Integration

### Prow in Kyma

After a few weeks of hard work, the Prow Working Group finalized our plan of having an open-source CI tool for Kyma. All Kyma repositories and components are now handled by Prow. We defined the release pipeline and already tested it when preparing this release.

The important change that Prow introduces is that external contributors are now able to see build statuses on their pull requests. They can also check logs from jobs execution. However, to (re)run the jobs on the pull requests, external contributors need to contact a Kyma organization member as, for security reasons, this functionality is available only to internal contributors.

Visit our [`test-infra`](https://github.com/kyma-project/test-infra) repository and read more about Prow and its setup in Kyma.


## Eventing

### Knative adoption first steps

- Kyma eventing use cases

To better align with the Knative eventing community, we created basic use cases of Kyma eventing. These use cases are meant to help us and the community to drive the Knative eventing evolution forward. Read more about the use cases [here](https://github.com/kyma-project/community/blob/master/sig-and-wg/wg-knative/kyma-eventing-use-case.md).

- Kyma-Knative eventing installation design

As an initial step towards adopting Knative eventing, we need to have a design that allows us to install Kyma eventing on top of Knative eventing. This way, it will be possible to use the Knative eventing as the underlying layer in Kyma, and achieve pluggability. Read more about our plan in [this](https://github.com/kyma-project/community/issues/166) proposal.


## Installation

### Environment Controller renaming

The Environment Controller that injects limit ranges, resource quotas, and default roles into each Namespace you create, was renamed to the **Namespace Controller**. Its logic, however, is still the same and the `env=true` label remains untouched. It is also worth mentioning that the Environment-to-Namespace renaming process is ongoing. As part of it, we have already renamed Environments to **Namespaces** in the Console UI.

### Wildcard DNS xip.io integration

Now you can test Kyma on a cluster running under the `xip.io` wildcard DNS server. 

We introduced a new `xip-patch` job to Kyma as an optionally installed patch component. This patch issues a self-signed TLS certificate for the Kyma instance and configures the domain to `{LOADBALANCER_IP}.xip.io`, where `{LOADBALANCER_IP}` is the IP address of the assigned load balancer in the Kyma cluster. 

This feature allows you to install and use Kyma easier, without the need to issue the TLS certificate on your own. This solution is not suitable for a production environment and it is only a playground that you can use to get to know the product better. Read more about this optional feature [here](/docs/0.6/kyma#installation-install-kyma-on-a-gke-cluster-with-wildcard-dns).

### Knative installation

Now, you have a possibility to install Kyma together with Knative and expose APIs using the `knative-ingressgateway` service. Knative installation also enables future work on integrating Kyma eventing with Knative eventing.

Find out how to [install](/docs/0.6/kyma#installation-installtion-with-knative) Kyma with Knative and [read](/docs/0.6/kyma#overview-kyma-and-knative---brothers-in-arms) about Kyma-Knative integration plans.


## Serverless

### Upgrade to Kubeless v1

Kyma now uses Kubeless v1, the first stable release of Kubeless. 

### Function autoscaling

Lambda functions use the Kubernetes Horizontal Pod Autoscaler to scale the number of Pods based on the CPU usage. To prevent any unexpected scaling, autoscaling was limited to the Function type. We also created a frequently scheduled load test to validate the scaling behavior on Azure. 

The Horizontal Pod Autoscaler is not enabled in your local Kyma installation by default so you need to activate it manually. Read [here](/docs/0.6/kyma#installation-install-kyma-locally-from-the-release-enable-horizontal-pod-autoscaler-hpa-) how to do that.


## Service Catalog

### Google Cloud Platform Service Broker

Kyma provides the Namespace-scoped Google Cloud Platform (GCP) Service Broker. In every Namespace you can configure the GCP Broker against different Google Cloud Platforms. Install the GCP Service Broker by provisioning the **Google Cloud Platform Service Broker Provider** class exposed by the Helm Broker. Read more about this new feature [here](/docs/0.6/components/service-brokers#overview-google-cloud-platform-broker).

![](./assets/gcp-provider-class.png)

### Modularization

We split the Kyma Service Catalog module into `service-catalog` and `service-catalog-addons`. The `service-catalog` module contains the core functionality and can be excluded from the Kyma installation if the Service Catalog is already installed on the cluster. The `service-catalog-addons` module contains all features build around the core, such as automatic bindings and the UI.

Follow [these](/docs/master/0.6/kyma#installation-installation-with-custom-service-catalog-deployment) steps to install Kyma with the custom Service Catalog deployment.

### New tooling for Service Catalog UI tests

The Helm Broker Bundles repository supports the OSB API contract implemented by the Service Catalog v0.1.38. We released the testing bundle that allows you to perform e2e UI testing for the Service Catalog.

Read more about the release details [here](https://github.com/kyma-project/bundles/releases).

## Website

### Linking enabled

In the past, we kept postponing the implementation of linking between documents inside the `kyma-project.io` website. As a result, you could see such a temporary solution in place:

![](./assets/document-references.png)

In short, there was a simple but not very useful text reference to other documents. This was due to the fact that we couldn't support linking of documents on GitHub and `kyma-project.io` at the same time. We decided, however, to give the website documentation a priority and treat Markdown files on GitHub only as document sources. As for the documentation in the Console, linking between the documents allows you to stay on the Console without being redirected to the website's Docs.

As a follow-up to this new improvement, we also added:

- [Guidelines](https://github.com/kyma-project/community/blob/master/guidelines/content-guidelines/links-in-docs.md) for all contributors on how to add links to documents under `kyma/docs`.

- The **chain icon** on `kyma-project.io` that allows you to remember the link to a given document section easier. Now, when you hover the cursor over any heading in the documentation, you can see this icon. Once you click it, the address bar in the browser gets updated with the direct link to a given section.

![](./assets/linking.png)

### Master branch availability in Docs

Since we introduced a website-centric approach to linking in the documentation, we wanted to make sure you don't fail at reading it on GitHub as a contributor, by being constantly redirected to the website's Docs. Before the Cairo release 0.6, we only rendered the release-related documentation on `https://kyma-project.io/docs`. Now, as one of few open-source projects, we also render documentation for the `master` branch. This documentation is updated on the website automatically, approx. 10 minutes after every merge of changes to the `master` branch.

The good news is that we also render the documentation for pre-releases on `https://kyma-project.io/docs`, whenever they are available.

![](./assets/master-branch.png)

### Blog landing page excerpts 

We started to render only condensed excerpt of the blog posts on the landing page. Thanks to this feature, the page isn't so overloaded with information and it's easier to scroll through the list of available posts.

![](./assets/excerpts.png)

We realize there are still some things to improve in this topic. We have already aggregated our plans for the blog section in [this](https://github.com/kyma-project/website/issues/142) issue. These improvements are on our roadmap but haven't been scheduled for any particular milestone yet. Feel free to contact us if you want to contribute and improve the overall user experience in this area.

### Improved styling of Docs

With a few new tweaks in the style of the Docs section, we improved its readability. The font size change, better spacing, and sections separation make the reading more pleasurable now.

Another important change is the width of the content container. It is now consistent with the GitHub UI, which significantly improves the contributor experience. All images and diagrams that you see in the pull request are the same in terms of the width and size with what we render on `kyma-project.io` or in the documentation in the Console.

![](./assets/styling.png)

### Scrollspy

As you have probably noticed, while reading our documentation section on `https://kyma-project.io/docs`, we adhere to the rule of rendering the whole documentation for a given topic on one site. The downside of such an approach is that you get a lot of content on a single page and it is easy to get lost if you scroll too fast. This can be easily solved by the usage of the **Scrollspy** feature that we introduce in this release. This solution spies your location on the screen while scrolling. Thanks to this approach, the navigation pane is updated with the information on the document you are currently reading. When scrolling, we highlight the name of the document that you are reading at the moment.

Scrollspy is available on `https://kyma-project.io/docs`  and in the Console documentation.

![](./assets/scrollspy.gif)
