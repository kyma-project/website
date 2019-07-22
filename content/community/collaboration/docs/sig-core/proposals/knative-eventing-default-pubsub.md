# Specify a default Messaging middleware

Created on 2019-04-10 by Gaurav Abbi (@abbi-gaurav).

## Status

Proposed on 2019-04-10.

## Context

As an operator, I want to configure a default messaging middleware that my Kyma cluster should use for eventing.

As a developer, I want to configure a subscription for an event type from a source in Kyma. I don't want to care about the underlying details.

## Requirements

* The pluggable Knative layer for the messaging middleware (Knative ClusterChannelProvisioner) is available and deployable.
* The operator provisions the pluggable layer into Kyma (Knative ClusterChannelProvisioner).
  > **NOTE**: There will be some examples that customers can follow. The provisioning/deployment will be an operator action as customers can choose an implementation specific to their needs.
* Kyma is updated to use Knative version 0.4+.

## Proposal

### The out-of-the-box Kyma installation

The OOTB Kyma installation will have NATS Streaming set as the default messaging middleware. The required Knative configurations will be set to use it.

### When to specify the default?

**Post Installation**

* The operator either creates a PubSub instance or uses the existing one.

  >**NOTE:** To create an instance, the operator can use service catalog. This is not a must.

* The operator deploys the cluster channel provisioner and injects the secrets.

* Use [Knative semantics](https://github.com/knative/docs/blob/master/docs/eventing/channels/default-channels.md#setting-the-default-channel-configuration) to specify the default ClusterChannelProvisioner.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: default-channel-webhook
  namespace: knative-eventing
data:
  default-channel-config: |
    clusterdefault:
      apiversion: eventing.knative.dev/v1alpha1
      kind: ClusterChannelProvisioner
      name: cloud-pubsub
    namespacedefaults:
      some-namespace:
        apiversion: eventing.knative.dev/v1alpha1
        kind: ClusterChannelProvisioner
        name: cloud-pubsub
```

  * A separate concept will be added, where the operator is able to specify a non-default messaging middleware.

**Why not during installation?**

* There is no standard way to deploy a provisioner. It can be done via Helm Chart, plain Kubernetes deployments or other mechanisms. 
* We do not intend to impose a restriction as provisioners will be implemented in Knative open source or by customers or partners themselves.
* The injection of secrets during installation will be tricky.
* There may be scenarios assuming the reuse of some existing instance.

**What happens to NATS Streaming?**

* The operator has the possibility pf deprovisioning to save costs. 
  >**NOTE:** The detailed deprovisioning/migration will be solved in the future through the collaboration with Knative community.

## Can the default be changed?

**Yes, default can be changed**.

* The existing channels/subscriptions still stay the same with the previous PubSub. [Same approach](https://github.com/knative/docs/blob/master/docs/eventing/channels/default-channels.md#caveats-1) as followed by Knative.

## How to support the operator

With great power comes great responsibility. The operator will have the power to leverage the pluggability of messaging middleware. This implies the responsibility for not breaking the system.

* Add possible validations in place that can prevent the operator from a destructive operation.

* There should be some User Interface that can help operator to avoid mistakes. The details include:
  * Existing ClusterChannelProvisioner in the system.
  * Any channels/resources related for the ClusterChannelProvisioner. If there is none, then operator knows that deprovisioning is safe.
  * Additionally, each channel features a drill down to view channel details and resources. This will help the operator to better understand the existing setup.
