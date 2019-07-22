# Kyma Knative WG was closed

The Knative Working Group (WG) focused on bringing together the worlds of Kyma and Knative closed (not so) recently. After two months 
of hard work, the group achieved all of its goals, not without cutting the initial scope, though. When we created this WG, we wanted to focus on these three goals:

 * Installing Kyma alongside Knative on the same cluster
 * Implementing the Kyma Event Bus using Knative eventing under the hood
 * Implementing Kyma Serverless with Knative serving instead of Kubeless
 
As the scopes of releases 0.6, 0.7, and 0.8 got established, we had to limit the goals of the WG and drop the Serverless-related plans.

Aside from this adjustment, the WG met the expectations and delivered the rest of the scope. Thanks to that, starting with release 0.8 you can have Kyma and Knative on the same Kubernetes cluster and watch both of them flourish. Moreover, in addition to the old 
implementation Kyma Event Bus can now run on the NATS Streaming Provisioner which, by the way, is a Kyma contribution to 
Knative.

Was this an easy ride? Not at all. We had to make both frameworks work on one cluster with a single Istio instance. Both Kyma nad Knative make extensive use of Istio and provide their own customizations. After we made them both running, we still had a long way to go. 
The WG had to reimplement almost all of the Event Bus without any other Kyma component noticing that change. 

Despite the challenges, working in the WG was a time of learning for all of the members. We had to understand what's going on under the hood of Knative, which turned some of us into active members of the Knative community. We learned that even the most carefully planned scope may change and that we need to cope with that. Finally, we felt the pain of integration of two rapidly evolving products on our own skin.

During the two months of its work, the WG Knative laid solid foundations for the Kyma-Knative integration. Now we are looking for new ways to
utilize it and make the fusion even more effective.
