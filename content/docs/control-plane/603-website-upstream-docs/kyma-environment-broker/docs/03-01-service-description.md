---
title: Service description
type: Details
---

Kyma Environment Broker (KEB) is compatible with the [Open Service Broker API](https://www.openservicebrokerapi.org/) (OSBA) specification. It provides a ServiceClass that provisions Kyma Runtime on a cluster.

## Service plans

Currently, KEB ServiceClass provides one ServicePlan that allows you to provision Kyma Runtime on Azure.

| Plan name | Description |
|-----------|-------------|
| `azure` | Installs Kyma Runtime on the Azure cluster. |

## Provisioning parameters

These are the provisioning parameters for this plan:

| Parameter Name | Type | Description | Required | Default value |
|----------------|-------|-------------|:----------:|---------------|
| **name** | string | Specifies the name of the cluster. | Yes | None |
| **nodeCount** | int | Specifies the number of Nodes in a cluster. | No | `3` |
| **volumeSizeGb** | int | Specifies the size of the root volume. | No | `50` |
| **machineType** | string | Specifies the provider-specific virtual machine type. | No | `Standard_D8_v3` |
| **region** | string | Defines the cluster region. | No | `westeurope` |
| **zones** | string | Defines the list of zones in which the Runtime Provisioner creates the cluster. | No | `["1", "2", "3"]` |
| **purpose** | string | Defines the purpose of the created cluster. The possible values are: `development`, `evaluation`, `production`, `testing`. | No | `development` |
| **autoScalerMin** | int | Specifies the minimum number of virtual machines to create. | No | `2` |
| **autoScalerMax** | int | Specifies the maximum number of virtual machines to create. | No | `4` |
| **maxSurge** | int | Specifies the maximum number of virtual machines that are created during an update. | No | `4` |
| **maxUnavailable** | int | Specifies the maximum number of VMs that can be unavailable during an update. | No | `1` |
| **components** | array | Defines optional components that are installed in Kyma Runtime. The possible values are `kiali` and `tracing`. | No | [] |
| **providerSpecificConfig.AzureConfig.VnetCidr** | string | Provides configuration variables specific for Azure. | No | `10.250.0.0/19` |
| **kymaVersion** | string | Provides Kyma version on demand. | No | None |
