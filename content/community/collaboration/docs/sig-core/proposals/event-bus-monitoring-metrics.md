# Event Bus Monitoring Metrics Proposal
Created on 2019-04-16 by Ahmed Hamouda (@montaro).

## Status

Proposed on 2019-04-16.

## Motivation

The Event Bus monitoring dashboard uses metrics to allow for improved performance monitoring and faster issue troubleshooting.

## Event Bus Metrics

|Metric Name |Description |Motivation |
|------------|------------|-----------|
|throughput |The number of all delivered Events that were successfully received by the publish-app per minute | Provides information on the whole system performance.|
|event propagation time 99 percentile |Event propagation time 99 percentile | Provides more accurate data on the whole system performance and Event delivery.|
|lag | The number of Events in queue | Helps to diagnose system performance as well as ensure troubleshooting unsuccessful Event deliveries.|
|kyma subscriptions per {namespace &\| source ID &\| event type &\| event type version &\| ready &\| endpoint} |The number of Kyma Subscriptions per {namespace &\| source ID &\| event type &\| event type version &\| ready &\| endpoint} | Facilitates troubleshooting unsuccessful Event deliveries and provides data on the Subscriptions distribution over multiple criteria.|
|event activations per {namespace &\| source ID} | The number of Event activations per {namespace &\| source ID} | Facilitates troubleshooting unsuccessful Event deliveries and filtering the activated subscriptions based on different criteria.|
|knative subscriptions per {namespace &\| channel name &\| channel ready &\| subscriber &\| ready}   |The number of knative Subscriptions per {namespace &\| channel name &\| channel ready &\| subscriber &\| ready}  | Comparing this metric to the number of Kyma Subscriptions facilitates troubleshooting and solving system integrity issues.|
|knative channels per {namespace &\| subscriber name &\| subscriber URI &\| source ID &\| event type &\| event type version} |The number of knative channels per {namespace &\| subscriber name &\| subscriber URI &\| source ID &\| event type &\| event type version} | Facilitates troubleshooting unsuccessful Event deliveries and system integrity issues by filtering created channels by different criteria and comparing to the corresponding knative Subscriptions.|
|consumers | The number of consumers | Facilitates troubleshooting unsuccessful Event deliveries and system integrity issues.|
|errors per {namespace &\| app &\| tag &\| ...} | The number of errors per {namespace &\| app &\| tag &\| ...}   | Helps in troubleshooting system failures, unsuccessful Event deliveries, and system integrity issues. Helps fixing system issues.|
|middleware availability | The health monitor of middleware like NATS Streaming | Facilitates troubleshooting system failures cases, unsuccessful Event deliveries, and system integrity issues.|

## Publish App Metrics

|Metric Name |Description |Motivation |
|------------|------------|-----------|
|events in total |The number of received Events | Provides data on the system load.|
|events in total per {namespace &\| source ID &\| event type &\| event type version} |The number of Event requests per {namespace &\| source ID &\| event type &\| event type version} | Filtering received Events by different criteria combination provides a better insight into the system load as well as facilitates troubleshooting unsuccessful Event deliveries and system integrity issues.|
|succeeded events per {namespace &\| source ID &\| event type &\| event type version} | The number of successful Events per {namespace &\| source ID &\| event type &\| event type version} | Facilitates troubleshooting unsuccessful Event deliveries and system integrity issues. It also acts as the system health indicator.|
|ignored events per {namespace &\| source ID &\| event type &\| event type version} | The number of ignored events per {namespace &\| source ID &\| event type &\| event type version} | Facilitates troubleshooting unsuccessful Event deliveries and system integrity issues. It also acts as the system health indicator.|
|failed events per {namespace &\| source ID &\| event type &\| event type version} | Number of failed events per {namespace &\| source ID &\| event type &\| event type version} | Facilitates troubleshooting unsuccessful Event deliveries and system integrity issues. It also acts as the system health indicator.|
|latency 99 percentile | Latency 99 percentile of published event request | High latency may be a reason for unsuccessful Event deliveries in some cases so it provides more data on the system health and performance.

## Push App Metrics

|Metric Name |Description |Motivation |
|------------|------------|-----------|
|events in total | The number of Events push requests | Comparing this metric its counterpart from the publish-app metric facilitates troubleshooting unsuccessful Event deliveries and system integrity issues.|
|pushed messages | The number of messages pushed to all consumers | Provides insights into knative eventing health by monitoring the rates as well as ensuring system integrity.|
|latency 99 percentile to all consumers|Latency 99 percentile of pushed events to all consumers | Provides insight into knative/Event delivery system performance and facilitates troubleshooting unsuccessful Event deliveries.|
|latency 99 percentile to a single consumer | Latency 99 percentile of messages pushed to a single consumer | Assesses system delivery performance and contributes to the diagnosis of the general system performance.|
|failed pushed messages | The number of failed pushed messages | Facilitates troubleshooting unsuccessful Event deliveries and system integrity issues.|
| | |
