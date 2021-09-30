---
title: Custom Resource Definition
---

This document provides guidelines on writing CustomResourceDefinition (CRD) files. The document explains where to place the CRD files and what content to include in them, and specifies the naming conventions to use.

## Third party CRDs

If you use a third-party CRD, apply the [location and file name](#custom-resource-definition-custom-resource-definition-location-and-file-name) recommendations from this guide. Keep the content unaltered if the technical requirements allow it. The content must comply with the company's software usage policy and the third-party CRD's license.

## Location and file name

Place the Kyma CRDs in the `cluster-essentials` Helm chart folder under the `files` subdirectory, and use singular file names, for example `crontab.crd.yaml`. Include additional names or terms in the file names to differentiate them from other CRDs, for example `crontab-v1.crd.yaml`. In the file name, do not include words which appear in the file path. For example, `/resources/cluster-essentials/templates/resources-crontab.crd.yaml` is not compliant because the word "resources" appears both in the file name and the path.

To differentiate CRDs from other types of Kubernetes resource files, end the file names with the `.crd.yaml` suffix and include the CRD name or any subset of it. If a file name consists of several words, separate them with hyphens, and use only lowercase letters.

## CRD ConfigMaps

During the initial phase of installation or upgrade, all CRDs from the `files` subdirectory are bundled by and mounted into [ConfigMaps](https://github.com/kyma-project/kyma/blob/main/resources/cluster-essentials/templates/crd-install-config-map.yaml). Those ConfigMaps are located under [`resources/cluster-essentials/templates`](https://github.com/kyma-project/kyma/tree/main/resources/cluster-essentials/templates), in the same location as the installation and upgrade Job, the ServiceAccount that the Job uses to apply CRDs, and the ClusterRoleBinding which binds the ServiceAccount with the proper ClusterRole for adequate permissions. The number of ConfigMaps depends on the number of CRDs located under [`resources/cluster-essentials/files`](https://github.com/kyma-project/kyma/tree/main/resources/cluster-essentials/files) but is not equal to their number. One ConfigMap cannot exceed the maximum size limit of 1 MB so can hold only a limited number of CRDs. That is why, the number of ConfigMaps that Helm creates during Kyma upgrade and installation tightly depends on the overall number of CRDs to apply.

## CRD installation and upgrade

To make the installation process more efficient and maintainable, we decoupled CRDs from charts and now store them in the `cluster-essentials` component.

All Kyma CRDs are installed or updated at the very beginning by the [Kubernetes Job](https://github.com/kyma-project/kyma/blob/main/resources/cluster-essentials/templates/crd-install-job.yaml) that is triggered by Helm's [pre-install and pre-upgrade](https://helm.sh/docs/topics/charts_hooks/#the-available-hooks) hooks.

There is one unified Job for all components. Its name starts with the `crd-install-` prefix, like all other Kubernetes objects that participate in the process of CRD installation and upgrade:

- [`crd-install-cluster-role-binding.yaml`](https://github.com/kyma-project/kyma/blob/main/resources/cluster-essentials/templates/crd-install-cluster-role-binding.yaml)
- [`crd-install-config-map.yaml`](https://github.com/kyma-project/kyma/blob/main/resources/cluster-essentials/templates/crd-install-config-map.yaml)
- [`crd-install-job.yaml`](https://github.com/kyma-project/kyma/blob/main/resources/cluster-essentials/templates/crd-install-job.yaml)
- [`crd-install-service-account.yaml`](https://github.com/kyma-project/kyma/blob/main/resources/cluster-essentials/templates/crd-install-service-account.yaml)

## Consideration

This is an example of a CRD:

`resources/cluster-essentials/files/crontab.crd.yaml`:

```
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  # the name must match the spec fields below, and be in the format: <plural>.<group>
  name: crontabs.batch.kyma-project.io
spec:
  # the group name to use for REST API: /apis/<group>/<version>
  group: batch.kyma-project.io
  # the version name to use for REST API: /apis/<group>/<version>
  version: v1
  # either Namespaced or Cluster
  scope: Namespaced
  names:
    # plural name to be used in the URL: /apis/<group>/<version>/<plural>
    plural: crontabs
    # singular name to be used as an alias on the CLI and for display
    singular: crontab
    # the kind is normally the CamelCased singular type. Your resource manifests use this.
    kind: CronTab
    # shortNames allow shorter string to match your resource on the CLI
    shortNames:
    - ct			 
```

When you deploy a CRD to the cluster, the Kubernetes API server delivers the specified custom resource. When you create a new CRD, the Kubernetes API server reacts by creating a new RESTful resource path. Therefore, when implementing a naming strategy for CRDs, keep in mind that the names in the **spec** field define the new resource path, which looks as follows:

```
/apis/{spec:group}/{spec:version}/{scope}/*/{names:plural}/
```

## Naming

To define a CRD for Kyma, refer to the example and follow these guidelines:

- **metadata:name**: Use as a name for the CustomResourceDefinition. It must use the `{plural-name}.{group}` format and use the values from the **group** and **plural** fields. If you do not follow these rules, you receive a validation error when installing the CRD.

- **spec:group**: The API group should reflect the collection of logically related objects. For example, all batch objects, such as Job or ScheduledJob, can belong to the batch API Group, such as `batch.kyma-project.io`. As best practice, use the fully-qualified domain name of the organization (`kyma-project.io`) preceded by a subgroup if necessary, for example `crontab.kyma-project.io`. The group name should reflect a capability-related and not an implementation-related name. For example, for eventing use `eventing.kyma-project.io` and not `nats.kyma-project.io`. Avoid prefixing the name with more than a subgroup, like in this example: `user.crontab.kyma-project.io`. If the subgroup consists of multiple words, do not use spaces, hyphens, or CamelCase.

- **spec:version**: Each API Group can exist in multiple versions. Use the version name in the URL, for example `v1alpha1`, `v1beta1`, or `v1`. For more details, see the [Consideration](#custom-resource-definition-custom-resource-definition-consideration) section. For more information on versioning CRDs, see the [Versioning](#custom-resource-definition-custom-resource-definition-versioning) section.

- **names:plural**: Use the plural name in the URL. The **plural** field must be the same as the resource in an API URL, for example `crontabs`. If the name consists of multiple words, do not use spaces, hyphens, or CamelCase.

- **names:singular**: Use the singular name as an alias in the CLI and for display. If the name consists of multiple words, do not use spaces, hyphens, or CamelCase.

- **names:kind**: The kind of objects that you can create. The type must use CamelCase, for example `CronTab`.

- **names:shortNames**: Specify a shorter string to match your resource in the CLI. Even though it is a list, include a single entry that is the most intuitive short name for the resource definition name, for example `ct` or `ctabs`.

Guidelines for other terms:

- **spec:scope**: Scope must be either `namespaced` or `cluster`. By default, a CustomResourceDefinition is cluster-scoped and available in all projects. The scope defined here is meant for the resources created using this CRD.

## Versioning

Because you install and use the CRDs in a Kubernetes cluster, make sure that their versioning is consistent with the Kubernetes versioning conventions.

The relevant convention implies the usage of different API versions for different levels of stability and support.

These are the versioning criteria:
- The version names must contain the word **alpha**, for example `v1alpha1`, if the software contains bugs, if enabling a feature can expose the bugs, and if a feature might be disabled by default.
- The version name must contain the word **beta**, for example `v2beta3`, if the software is well-tested, enabling features is safe, has the features enabled by default, and support for the features is available, even though the details can change.
- A stable definition must be versioned as `vX` where X is an integer, for example `v1`, and it contains features which appear in multiple subsequent versions of the released software.

For more details about the criteria, see the [API changes documentation](https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api_changes.md#alpha-beta-and-stable-versions).

### GA release

Before the first GA release of Kyma, use the **alpha** versions to handle the unplanned scope changes. Alternatively, use a **beta** version if you do not plan to make any further changes, the CRD is covered by end-to-end tests, and you provide support, including the migration paths for version updates. After the GA release of Kyma, upgrade the existing CRDs to stable versions and ensure that you meet the [requirements](https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api_changes.md#alpha-beta-and-stable-versions).

## Validation

Because Kyma aims to use Kubernetes version V1.9 or higher, the system can validate custom objects. However, validation is a beta feature which can be disabled. Therefore, always check if the validation takes place and is reliable.

Use the available validation of custom objects with OpenAPI v3 schema. For more details, see the [OpenAPI specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#schema-object).

Additionally, these restrictions apply to the schema:

- You cannot set the fields **default**, **nullable**, **discriminator**, **readOnly**, **writeOnly**, **xml**, and **deprecated**.
- You cannot set the field **uniqueItems** to `true`.
- You cannot set the field **additionalProperties** to `false`.

## References

For more details, see these documents:

- https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources
- https://kubernetes.io/docs/tasks/access-kubernetes-api/custom-resources/custom-resource-definitions
- https://kubernetes.io/docs/concepts/overview/kubernetes-api/#api-versioning
- https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api_changes.md#alpha-beta-and-stable-versions
- https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#schema-object  
- https://docs.openshift.org/latest/admin_guide/custom_resource_definitions.html
