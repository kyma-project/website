# DR 005: Istio as the Gateway in Kyma

Created on 2017-12-11 by Damian Pacierpnik (@damianpacierpnikatsap).

## Context

The API Gateway is going to be one of the Kyma core components.
This component will be responsible for security, monitoring, and traffic management.
All APIs should be exposed in the platform in a consistent manner.     

This component must be a cloud-native solution, with good support for Kubernetes, as this is the platform chosen for Kyma.

It also should be open-source, giving the ability to contribute to the project development. The aim is to escape the limits imposed by the project roadmap and waiting for the implementations of fixes. It is crucial to ensure the desired SLAs.

## Decision

The decision is to use [Istio](https://istio.io) as the API Gateway in Kyma.

Istio is an open platform to connect, manage, and secure microservices.
It provides an easy way to create a network of deployed services with load balancing, service-to-service authentication,
monitoring, and more, without requiring any changes in the code of the service.
To add Istio support to services, deploy a special sidecar proxy throughout your environment. It intercepts
all of the network communication between the configured and managed microservices using Istio control plane functionality.

## Status

Accepted on 2017-12-11.

## Consequences

Istio provides most of the required features. It was possible to integrate it with DEX, the authentication provider for Kyma.

All of the APIs in Kyma, including the Kubernetes API, will be shared in a consistent manner through Istio. The same security concept will be applied to all of the APIs, and all of the APIs will be accessible with ID tokens issued by Dex.

The extensibility model in Istio is not perfect. The source code of the existing components needs modification. Docker images, including Istio components, must be built. The build process requires many tools. For example, to rebuild a Go component, you need Bazel with Java.
The build process is also quite complicated because of the Bazel configuration. On MacOS, it forces the use of the dedicated Docker image, as the build process is Linux-dependent.
Moreover, the build process in the Docker container currently takes a lot of time. There is room for improvement, as the Bazel cache can be more persistent. Unfortunately, the first attempt to implement such a solution failed because of the Docker permission policy for mounted directories.

There has been no attempt to contribute to Istio yet. To contribute to Istio, fill out the [Google CLA](https://cla.developers.google.com/)
and discuss the change request or idea in the appropriate [working group](https://github.com/istio/community/blob/master/WORKING-GROUPS.md).
When there is a general agreement that the feature is useful, create a GitHub issue to track the discussion.
In some cases, you must also create a design document that follows the format.
Once there is a general agreement on the technical direction, you can submit a pull request.
