# Application Connector as an addon

Created on 2018-09-04 by Lukasz Szymik (@lszymik)

## Status

Proposed on 2018-09-07

## Motivation

The Application Connector must be removed as a separate addon which can be applied on demand. That is directly related to the Kyma modularization project.

## Goals

- Install the Application Connector as an addon on demand.
- Create a Remote Environment on demand as soon as the Application Connector is installed.

## Current status

- Nginx-Ingress-Controller is installed as a sub-chart of the core Helm chart
- Application Connector is installed as a sub-chart of the core Helm chart (Metadata Service and Connector Service)
- Remote Environment CRD is installed separately as cluster-essential
- Remote Environments, like ec-default, are installed as a separate Helm chart

## New approach

### Helm chart with the Application Connector

There will be a separate Helm chart which will install all necessary items:

- Remote Environment CRD
- Nginx-Ingress controller
- Connector service
- Metadata service
- Remote Environment broker
- A Remote Environment operator
- UI for Application Connector need to be added as well. It must be discussed with Swinka team.

The helm chart can be used manually and can be integrated with Kyma addons, Kyma bundles for service catalog or Kyma core as Gardener addon, [Bouquet](https://github.com/gardener/bouquet).

### Remote Environment Operator

There will be a new Remote Environment operator which will replace Helm charts for RE. The operator will react to modification of the RE custom resource and will add all required items, like Event service, Proxy service.

### Use cases

- An administrator is creating a new RE custom resource, like EC-Prod. The operator will discover that new RE was created and will deploy Event service, Proxy service, all required Ingresses, etc.

- Administrator deletes the RE custom resource. The operator will deinstall all components.

- An operator will also react to changes in RE custom resource and propagate them to the components. That requires further discussion.

## What needs to be considered

- All items need to have default values. Essential for installation on Minikube.
- SSL certificate and Root CA certificate for Nginx-Ingress controller must be provided in the same way as it is done for Istio. Consider using the same secret name for SSL cert.
- No hardcoded values.
- No custom logic in the installation process.
- Backward compatibility must be ensured. We cannot apply any breaking changes.
- We need to sync with all the teams involved.
