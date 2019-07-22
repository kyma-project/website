---
title: CLI reference
---

>**NOTE:** Blockquotes in this document provide instructions. Remove them from the final document.
>
> This document is a ready-to-use template for a Command Line Interface (CLI) reference document type that describes the syntax and the use of CLI commands for a given Kyma component. Put the name of a reference resource and a component in place of {resourcename} and {Component Name}, respectively. Do the same for {CLI tool name} and replace it with `kubectl`, `kubeless`, or `svcat`, depending on the tool you use. Follow the `07-{00}-cli-reference.md` convention to name the document.
For reference, see the existing document for the [Service Catalog](https://kyma-project.io/docs/master/components/service-catalog/#cli-reference-cli-reference).

Management of the {Component Name} is based on the custom resources specifically defined for Kyma. Manage all of these resources through `[{CLI tool name}](link)`.

> Provide a link to [kubectl](https://kubernetes.io/docs/reference/kubectl/overview/), [kubeless](https://kubeless.io/docs/quick-start/), or [svcat](https://github.com/kubernetes-incubator/service-catalog/blob/master/docs/cli.md), respectively.

## Details

This section describes the resource names to use in the `{CLI tool name}` command line, the command syntax, and examples of use.

### Resource types

{Component Name} operations use the following resources:

| Singular name  | Plural name  |
| -------------------- |-------------------|
| {singularresourcename} | {pluralresourcename} |

> For `kubeless`, only the singular name of the resource applies.

### Syntax

Follow the `{CLI tool name}` syntax, `{CLI tool name} {command} {type} {name} {flags}`, where:

* {command} is any command, such as `describe`.
* {type} is a resource type, such as `{resourcename}`.
* {name} is the name of a given resource type. Use it to make the command return the details of a given resource.
* {flags} specifies the scope of the information. For example, use flags to define the Namespace from which to get the information.

> In the `kubeless` syntax, {type} comes before {command}.

### Examples

> Provide the introductory sentence in which you mention the examples that you put in this section. Describe the examples in an unordered list. Use the code block to show the examples of commands. See the following example for reference:

```
The following examples show how to list all Subscriptions and how to get detailed information on the Subscription status.

* Get the list of all Subscriptions:

kubectl get subscription --all-namespaces

* Get the list of all Subscriptions with detailed information on their statuses:

kubectl get subscriptions -n stage -o=custom-columns=NAME:.metadata.name,STATUS:.status.conditions[*].status,STATUS\ TYPE:.status.conditions[*].type

```
