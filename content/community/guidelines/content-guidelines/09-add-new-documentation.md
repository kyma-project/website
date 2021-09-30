---
title: Add new documentation to the website
---
​
This document explains how to render a new topic in the documentation on the [Kyma website](https://kyma-project.io) from various sources in repositories under [`kyma-project`](https://github.com/kyma-project). It also describes how to modify an existing topic if you want OpenAPI specifications to show in a given topic's documentation.  

## Add a new documentation topic

Follow these steps:

<div tabs name="documentation-topic" group="new-documentation">
  <details>
  <summary label="kyma-repository">
  Kyma repository
  </summary>

1. Create a pull request with `.md` files for the new documentation topic. Place the `.md` files under a new `docs` subfolder in the repository, such as `docs/serverless/`.

2. In the same PR, create a `.yaml` file under the [`templates`](https://github.com/kyma-project/kyma/tree/main/resources/core/charts/docs/charts/content-ui/templates) folder to add a [ClusterAssetGroup CR](https://kyma-project.io/docs/components/rafter/#custom-resource-cluster-asset-group) for your topic. For example, if you add a ClusterAssetGroup CR for the Serverless component, name it `docs-components-serverless-cag.yaml`. ​

   See the example definition:
    ​
   ```yaml
   apiVersion: rafter.kyma-project.io/v1beta1
   kind: ClusterAssetGroup
   metadata:
     labels:
       rafter.kyma-project.io/view-context: docs-ui
       rafter.kyma-project.io/group-name: components
       rafter.kyma-project.io/order: "11"
     name: serverless
   spec:
     displayName: "Serverless"
     description: "Overall documentation for Serverless"
     sources:
       - type: markdown
         name: docs
         mode: package
         url: https://github.com/{{ .Values.global.kymaOrgName }}/kyma/archive/{{ .Values.global.docs.clusterAssetGroupVersion }}.zip
         filter: /docs/serverless/
   ```

3. Adjust values for these fields:

- **rafter.kyma-project.io/order** defines the number of your topic on the list in the left navigation, such as `"11"`. To add it correctly, check in other `.yaml` files which number is assigned to the last documentation topic in the navigation on the website, and add a consecutive number to your component. If you decide to modify the existing topic order, change values for this parameter in all other `.yaml` files accordingly to avoid duplicates.
- **metadata.name** defines the CR name, such as `serverless`.
- **spec.displayname** defines the component name displayed on the website, such as `"Serverless"`.
- **spec.sources.filter** defines the location of the new topic's document sources, such as `/docs/serverless/`.

4. Merge the changes and wait until the website is rebuilt.

  </details>
  <details>
  <summary label="other-repositories">
  Other repositories
  </summary>

1. Create a pull request with `.md` files for the new documentation topic. Place the `.md` files under a new `docs` subfolder in the repository, such as `docs/commands/`.

2. In the same PR, create a `.yaml` file under the `.kyma-project-io` folder in the same repository to add a [ClusterAssetGroup CR](https://kyma-project.io/docs/components/rafter/#custom-resource-cluster-asset-group) for your topic. Use the `{topic-name}-cag.yaml` format for the file name.

   See the example definition:
    ​
   ```yaml
   apiVersion: rafter.kyma-project.io/v1beta1
   kind: ClusterAssetGroup
   metadata:
     labels:
       rafter.kyma-project.io/view-context: cli
       rafter.kyma-project.io/group-name: cli
       rafter.kyma-project.io/order: "2"
     name: commands
   spec:
     displayName: "Commands"
     description: "Overall documentation for Kyma CLI Commands"
     sources:
       - type: markdown
         name: docs
         mode: package
         filter: /docs/commands/
   ```

3. Adjust values for these fields:

- **rafter.kyma-project.io/order** defines the number of your topic on the list in the left navigation, such as `"2"`. To add it correctly, check in other `.yaml` files which number is assigned to the last documentation topic in the navigation on the website, and add a consecutive number to your component. If you decide to modify the existing topic order, change values for this parameter in all other `.yaml` files accordingly to avoid duplicates.
- **metadata.name** defines the CR name, such as `commands`.
- **spec.displayname** defines the component name displayed on the website, such as `"Commands"`.
- **spec.sources.filter** defines the location of the new topic's document sources, such as `/docs/commands/`.

4. Merge the changes and wait until the website is rebuilt.

  </details>
</div>

> **NOTE:** Before merging your PR, you can check if the topic you added is rendered properly on the website thanks to [`docs-preview`](#documentation-preview-documentation-preview) built on every PR.

## Add a single OpenAPI specification

In addition to documentation, there are also [OpenAPI](https://swagger.io/specification/) specifications rendered on the [Kyma website](https://kyma-project.io). You can find these specifications under the **API Consoles** type in the right navigation panel of a given documentation topic.

To add a new specification, follow these steps:

<div tabs name="openapi-specification" group="new-documentation">
  <details>
  <summary label="kyma-repository">
  Kyma repository
  </summary>

1. Go to the [`templates`](https://github.com/kyma-project/kyma/tree/main/resources/core/charts/docs/charts/content-ui/templates) folder and locate the ClusterAssetGroup CR that you want to modify.

2. Add a new source entry in the **sources** field:

   ``` yaml
   sources:
     ...
     - type: {SPECIFICATION_TYPE}
       name: {SPECIFICATION_NAME}
       mode: single
       url: {SPECIFICATION_URL}
   ```

   where:

   - **{SPECIFICATION_TYPE}** defines a type of a given specification. Currently, only [OpenAPI](https://swagger.io/specification/) specifications are supported and they are defined under the `openapi` type.
   - **{SPECIFICATION_NAME}** defines a unique identifier of a given specification. This field defines the URL on https://kyma-project.io/docs under which the specification is displayed. For example, if the specification is added in the `application-connector` ClusterAssetGroup CR with the `connectorapi` value in the **name** field, its URL is `https://kyma-project.io/docs/{VERSION_OF_DOCS}/components/application-connector/specifications/connectorapi/`.
   - **{SPECIFICATION_URL}** defines the location of the specification. It may contain directives with values defined in `values.yaml` files. For internal specifications defined in the [`kyma`](https://github.com/kyma-project/kyma) repository, it is recommended to use the directive with a Kyma version and the organization name, such as:

   ``` yaml
   url: https://raw.githubusercontent.com/{{ .Values.global.kymaOrgName }}/kyma/{{ .Values.global.docs.clusterAssetGroupsVersion }}/docs/application-connector/assets/connectorapi.yaml
   ```

   See the example:

   ``` yaml
   sources:
     ...
     - type: openapi
       name: connectorapi
       mode: single
       url: https://raw.githubusercontent.com/{{ .Values.global.kymaOrgName }}/kyma/{{ .Values.global.docs.clusterAssetGroupsVersion }}/docs/application-connector/assets/connectorapi.yaml
   ```

3. Merge the changes and wait until the website is rebuilt.

  </details>
  <details>
  <summary label="other-repositories">
  Other repositories
  </summary>

1. Go to the `.kyma-project-io` folder in the given repository and locate the ClusterAssetGroup CR that you want to modify.

2. Add a new source entry in the **sources** field:

   ``` yaml
   sources:
     ...
     - type: {SPECIFICATION_TYPE}
       name: {SPECIFICATION_NAME}
       mode: single
       url: {SPECIFICATION_URL}
   ```

   where:

   - **{SPECIFICATION_TYPE}** defines a type of a given specification. Currently, only [OpenAPI](https://swagger.io/specification/) specifications are supported and they are defined under the `openapi` type.
   - **{SPECIFICATION_NAME}** defines a unique identifier of a given specification. This field defines the URL on https://kyma-project.io/docs under which the specification is displayed. For example, if the specification is added in the `commands` ClusterAssetGroup CR with the `provision` value in the **name** field, its URL is `https://kyma-project.io/docs/{VERSION_OF_DOCS}/cli/commands/specifications/provision/`.
   - **{SPECIFICATION_URL}** defines the location of the specification. It may contain directives with values defined in `values.yaml` files:

   ``` yaml
   url: https://raw.githubusercontent.com/{{ .Values.global.kymaOrgName }}/cli/{VERSION_OF_DOCS}/docs/commands/assets/provision.yaml
   ```

   See the example:

   ``` yaml
   sources:
     ...
     - type: openapi
       name: connectorapi
       mode: single
       url: https://raw.githubusercontent.com/kyma-project/cli/{VERSION_OF_DOCS}/docs/commands/assets/provision.yaml
   ```

3. Merge the changes and wait until the website is rebuilt.

  </details>
</div>

> **NOTE:** Before merging your PR, you can check if the specification you added is rendered properly on the website thanks to [`docs-preview`](#documentation-preview-documentation-preview) built on every PR.

## Add a new repository documentation

Follow these steps if you want the documentation from a repository under the [`kyma-project`](https://github.com/orgs/kyma-project/) or [`kyma-incubator`](https://github.com/kyma-incubator`) organization to be rendered on the website under the **Docs** view.

> **NOTE:** Documents should follow the [content strategy](https://kyma-project.io/community/guidelines/content/#content-strategy-content-strategy-documentation-types), have proper types, metadata, and numbering. See the [Kyma docs](https://github.com/kyma-project/kyma/tree/main/docs/kyma) for reference.  

1. Create  the `.kyma-project-io` folder in the given repository and add appropriate [documentation topics](#add-new-documentation-to-the-website-add-new-documentation-to-the-website-add-a-new-documentation-topic) to this folder.

2. Add the new entry in the **docs** field in [`config.json`](https://github.com/kyma-project/website/blob/main/config.json):

   ```json
   docs: {
   ...
      "{REPOSITORY_NAME}": {
          "displayName": "{DISPLAY_NAME}",
          "organization": "{ORGANIZATION_NAME}",
          "repository": "{REPOSITORY_NAME}",
          "branches": {BRANCHES},
          "lastReleases": {LAST_RELEASES},
          "navPath": "{NAV_PATH}",
          "rootPath": {
            "docsType": "{DOCS_TYPE}",
            "docsTopic": "{DOCS_TOPIC}"
          }
      }
   }
   ```

   where:

   - **{REPOSITORY_NAME}** is the name of the repository with documentation sources.
   - **{DISPLAY_NAME}** is the name you want to be visible under the **Docs** drop-down menu in the main navigation panel on the [Kyma website](https://kyma-project.io).
   - **{ORGANIZATION_NAME}** is the name of the organization under which the repository sits. It can be either `kyma-project` or `kyma-incubator`.
   - **{BRANCHES}** are the names of branches that will be rendered. It should contain at least the `main` branch.
   - **{LAST_RELEASES}** is the number of the last release that will be rendered. If you only want to display branches, set the value to `0`.
   - **{NAV_PATH}** is the URL path you want to assign to your docs entry under the **Docs** drop-down menu. For example, if you add CLI docs, specify `cli` as the path to be be redirected to `https://kyma-project.io/docs/cli` after selecting ** CLI** from the **Docs** drop-down menu.
   - **{DOCS_TYPE}** is the document type that should be visible under the navigation path.
   - **{DOCS_TOPIC}** is the documentation topic that should be visible under the navigation path.

   See this example:

   ```json
   "{REPOSITORY_NAME}": {
      "displayName": "CLI",
      "organization": "kyma-project",
      "repository": "cli",
      "branches": ["main"],
      "lastReleases": 0,
      "navPath": "cli",
      "rootPath": {
        "docsType": "cli",
        "docsTopic": "overview"
      }
   }
   ```

3. Create a PR, wait for the review, merge the changes, and wait for the website to be rebuilt. The new entry with the new documentation will appear under the **Docs** drop-down menu in the main navigation panel on the [Kyma website](https://kyma-project.io).
