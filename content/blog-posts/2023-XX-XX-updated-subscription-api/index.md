
--
title: "Introducing a new subscription API"
author:
  name: Korbinian Stoemmer, PO @Kyma"
tags:
  - kyma
  - eventing

redirectFrom:
  - "/blog/subscription-api"
---

As part of the Kyma team working on the Eventing components, I'd like to let you know that we're updating the Subscription API used to subscribe to events in Kyma.
In this blog post, I'd like explain the how and the why.

## Why change the subscription CR

At the moment, Kyma supports two backends for Eventing:
- NATS Jetstream, a high-performance messaging infrastructure running inside the Kyma cluster
- EventMesh, an external service used to interconnect multiple applications

Both backends have their own benefits and limitations:

NATS Jetstream is only accessible within the Kyma cluster. This brings the limitation that all events handled by it must originate from the cluster and must be subscribed to in the cluster. The benefit is that those events never leave the cluster.

EventMesh allows subscribing to events that to not originate from the cluster, and it also means that you can send events there and subscribe to them in a different, connected application. The drawback is that in order to subscribe to such events, your workload must be exposed to the internet.

With those different use cases in mind, it makes sense that EventMesh imposes stricter naming conventions on the CloudEvents. With NATS Jetstream as the active backend, we are in control of these limitations.

Previously, we followed the same strict rules on both backends. While this simplified switching from one backend to the other, it also introduced confusion because we internally ensured that events that did not match these limitations were modified to match the criteria.

Example:

An application sent events of event type `object.operation`. To allow sending such event to EventMesh, we had to introduce a prefix as part of the EventMesh requirements. Then, we sent those events to the Eventing backend with eventtype `prefix.object.operation`. When these events were delivered to our internal subscribers, they were not of type `object.operation` (the original eventtype), but they were delivered with eventtype `prefix.object.operation`.

Modifying the subscriptions that way also limited to which events you could subscribe. It was only possible to subscribe to events that had 

The updated Subscription CR simplifies this for the user.

## The new subscription CR

The idea of the new subscription CR is "you get what you ask for (when possible)".

For Eventing with the NATS backend, it is not required to send CloudEvents with a prefix and also it is not required to specify the prefix in the subscriptions.
If you send events of type `object.operation` you can now subscribe to `object.operation` and you will receive events of type `object.operation`

For eventing with EventMesh as the active backend you can do the same thing. 
But for EventMesh, we now also support subscribing to events that have *not* been sent using Kyma.
In this case, you can now configure subscriptions that will not be internally modified to match our requirements.
This way, you can subscribe to `myownprefix.object.operation`, and we will create the corresponding filter on EventMesh. 


## Summary

With the introduction of our new `v1alpha2` subscription CR, you can now subscribe to internal events without the need of a prefix.
At the same time, you can now finally subscribe all your CloudEvents on EventMesh without being limited to events sent by Kyma.
