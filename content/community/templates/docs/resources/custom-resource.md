---
title: {CRD kind}
type: Custom Resource
---

> **NOTE:** Blockquotes in this document provide instructions. Remove them from the final document. Add more sections to the CR document if you need to explain a given custom resource in more details. Use H2 (##) to introduce a new section.
>
> This document is a ready-to-use template for a custom resource (CR) document type that provides a sample custom resource and description of its elements. Additionally, the document points to the CustomResourceDefinition (CRD) used to create CRs of the given kind. Follow the `06-{00}-{CRD-kind}.md` convention to name the document. If there is only one document of a certain type, remove the `type` metadata completely so that the document displays well on the UI.
For reference, see the existing documents for the [Installation](https://kyma-project.io/docs/master/root/kyma/#custom-resource-installation) and the [Api](https://kyma-project.io/docs/master/components/api-gateway/#custom-resource-api) CRs.

The `{CRD name}` CustomResourceDefinition (CRD) is a detailed description of the kind of data and the format used to {provide the CRD description}. To get the up-to-date CRD and show the output in the `yaml` format, run this command:

```
kubectl get crd {CRD name} -o yaml
```

## Sample custom resource

> In this section, provide an example custom resource created based on the CRD described in the introductory section. Describe the functionality of the CR and highlight all of the optional elements and the way they are utilized.
Provide the custom resource code sample in a ready-to-use format.

This is a sample resource that {provide a description of what the example presents}.

```
apiVersion:
kind:
metadata:
  name:
{another_field}:
```

## Custom resource parameters

This table lists all the possible parameters of a given resource together with their descriptions:


| Parameter   | Mandatory |  Description |
|-------------|:---------:|--------------|
| **metadata.name** |    YES   | Specifies the name of the CR. |
| **{another_parameter}** |    {YES/NO}   | {Parameter description} |


## Related resources and components

These are the resources related to this CR:

| Custom resource |   Description |
|-----------------|---------------|
| {Related CRD kind} |  {Briefly describe the relation between the resources}. |

These components use this CR:

| Component   |   Description |
|-------------|---------------|
| {Component name} |  {Briefly describe the relation between the CR and the given component}. |
