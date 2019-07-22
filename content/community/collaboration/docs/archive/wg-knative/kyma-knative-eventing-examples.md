# Examples

These examples demonstrate publishing and consuming events using Kyma and Knative.


## Publish events

### Kyma API v1

```bash
   curl -i \
     -H "Content-Type: application/json" \
     -X POST http://core-publish.kyma-system:8080/v1/events \
     -d '{"source-id": "external.solution", "event-type": "test-event-bus", "event-type-version": "v1", "event-time": "2018-11-02T22:08:41+00:00", "data": {"event":{"customer":{"customerID": "1234", "uid": "rick.sanchez@mail.com"}}}}'
```

### Kyma API v2

```bash
  curl -i \
    -H "Content-Type: application/json" \
    -H "ce-source: external.solution"
    -H "ce-event-type: order.created" 
    -X POST http://core-publish.kyma-system:8080/v2/events \
    -d '{"customer":{"customerID": "1234", "uid": "rick.sanchez@mail.com"}}'
```

### Knative

```bash
   curl -i \
     -X POST http://order.created.external.solution-channel.kyma-system \
     -d '{"customer":{"customerID": "1234", "uid": "rick.sanchez@mail.com"}}'
```

## Consume events

### Kyma

```yaml
apiVersion: eventing.kyma-project.io/v1alpha1
kind: Subscription
metadata:
  name: example-subscription
  labels:
    example: event-bus
spec:
  endpoint: http://event-email-service.<environment>:3000/v1/events/register
  push_request_timeout_ms: 2000
  max_inflight: 400
  include_subscription_name_header: true
  event_type: test-event-bus
  event_type_version: v1
  source_id: external.solution
```

### Knative
```yaml
apiVersion: eventing.knative.dev/v1alpha1
kind: Subscription
metadata:
  name: testevents-subscription
  namespace: default
spec:
  channel:
    apiVersion: eventing.knative.dev/v1alpha1
    kind: Channel
    name: order.created.external.solution-channel
  subscriber: #this could a normal k8s service
    ref:
      apiVersion: serving.knative.dev/v1alpha1
      kind: Service
      name: message-dumper
```
